"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { identityServerUrl } from "@/utils/api-links";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    try {
      const res = await fetch(`${identityServerUrl}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.error === "two_factor_required") {
          return router.push("/enable-2fa");
        }
        throw new Error(data?.error || "Login failed");
      }
      router.push("/");
    } catch (err: any) {
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow"
        >
          <h1 className="text-xl font-semibold text-gray-800 text-center">
            {t("login")}
          </h1>

          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            rules={{ required: "Please enter your username." }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            rules={{ required: "Please enter your password." }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <p className="mt-2 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/identity/register")}
              className="text-blue-600 hover:underline"
            >
              Register here
            </button>
          </p>
        </form>
      </Form>
    </div>
  );
}
