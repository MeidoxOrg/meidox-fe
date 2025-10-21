"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { identityServerUrl } from "@/utils/api-links";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
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

export default function RegisterPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      enableTwoFactor: false,
    },
  });

  useEffect(() => {
    const subscription = form.watch(() => {
      form.trigger("confirmPassword");
      form.trigger("password");
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (values: any) => {
    setMessage(null);

    if (values.password !== values.confirmPassword) {
      setMessage("❌ " + t("passwords_do_not_match"));
      return;
    }

    try {
      const res = await fetch(`${identityServerUrl}/Auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          enableTwoFactor: values.enableTwoFactor,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Register failed");

      setMessage("✅ " + t("register_success"));
      console.log("Register response:", data);
      setTimeout(() => router.push("/identity/login"), 1500);
    } catch (err: any) {
      setMessage("❌ " + (err.message || t("register_failed")));
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
            {t("register")}
          </h1>

          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            rules={{ required: t("please_enter_your_username") }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t("username")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            rules={{ required: t("please_enter_your_email") }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder={t("email")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: t("please_enter_your_password"),
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: t("password_format_invalid"),
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("password")}
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

                {/* 👉 Hint UX */}
                {/* <p className="text-xs text-gray-500 mt-1">
                  {t("password_hint")}
                </p> */}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            rules={{
              required: t("please_confirm_your_password"),
              validate: (value) =>
                value === form.getValues("password") ||
                t("passwords_do_not_match"),
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("confirm_password")}
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? (
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

          {/* Enable 2FA */}
          <FormField
            control={form.control}
            name="enableTwoFactor"
            render={({ field }) => (
              <FormItem>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  {t("enable_two_factor")}
                </label>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {form.formState.isSubmitting
              ? `${t("registering")}...`
              : `${t("register")}`}
          </Button>

          {message && (
            <p className="text-center text-sm text-gray-700">{message}</p>
          )}

          <p className="mt-2 text-center text-sm text-gray-500">
            {t("already_have_an_account")}{" "}
            <button
              type="button"
              onClick={() => router.push("/identity/login")}
              className="text-blue-600 hover:underline"
            >
              {t("login_here")}
            </button>
          </p>
        </form>
      </Form>
    </div>
  );
}
