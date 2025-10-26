import { identityServerUrl } from "@/utils/api-links";
import NextAuth, {
  Awaitable,
  NextAuthOptions,
  TokenSet,
  User,
} from "next-auth";
import { OAuthConfig } from "next-auth/providers/oauth";

const IdentityServerProvider = {
  id: "identity",
  name: "IdentityServer",
  type: "oauth",
  version: "2.0",
  wellKnown: `${identityServerUrl}/.well-known/openid-configuration`,
  clientId: "spa-client",
  clientSecret: "",
  authorization: {
    params: { scope: "openid profile email offline_access meidox_api" },
  },
  profile: function (profile: any, tokens: TokenSet): Awaitable<User> {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    };
  },
} satisfies OAuthConfig<any>;

// --- Refresh token helper ---
async function refreshAccessToken(token: any) {
  try {
    const url = `${identityServerUrl}/connect/token`;
    const body = new URLSearchParams({
      client_id: "spa-client",
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const refreshedTokens = await res.json();

    console.log("refreshedTokens: ", refreshedTokens);

    if (!res.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      expiresAt:
        Date.now() + (refreshedTokens.expires_in) * 1000,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return { ...token, error: error };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [IdentityServerProvider],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        console.log("account jwt: ", account);
        console.log("profile jwt: ", profile);
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
          sub: profile.sub,
          username: profile.username,
          name: profile.name,
        };
      }
      console.log("Date.now(): ", Date.now());
      console.log("token.expiresAt: ", token.expiresAt);
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.user!.id = token.sub;
      session.user!.username = token.username;
      session.user!.name = token.name;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
