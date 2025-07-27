import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import { useSignIn } from "../../libs/data-layer/auth/use-sign-in";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";

const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Minimum 6 characters")
    .max(32, "Maximum 32 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Must contain uppercase, lowercase, and number",
    ),
});

type SignInFormData = z.infer<typeof signInSchema>;

function PasswordInput({
  showPassword,
  togglePasswordVisibility,
  ...props
}: React.ComponentProps<typeof Input> & {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}) {
  return (
    <div className="relative">
      <Input type={showPassword ? "text" : "password"} {...props} />
      <button
        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-6"
        type="button"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
        ) : (
          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
        )}
      </button>
    </div>
  );
}

function SignInHeader() {
  return (
    <div className="mb-5 sm:mb-8">
      <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
        Sign In
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Enter your email and password to sign in!
      </p>
    </div>
  );
}

function SignUpLink() {
  return (
    <div className="mt-5">
      <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
        Don&apos;t have an account?{" "}
        <Link
          className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
          to="/signup"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: signIn, isPending } = useSignIn();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInFormData) => {
    signIn({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <SignInHeader />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="email">
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  {...register("email")}
                  hint={errors.email?.message}
                  id="email"
                  max="32"
                  min="4"
                  type="email"
                  error={!!errors.email?.message}
                  placeholder="info@gmail.com"
                />
              </div>
              <div>
                <Label htmlFor="password">
                  Password <span className="text-error-500">*</span>
                </Label>
                <PasswordInput
                  {...register("password")}
                  hint={errors.password?.message}
                  id="password"
                  max="32"
                  min="6"
                  error={!!errors.password?.message}
                  placeholder="Enter your password"
                  showPassword={showPassword}
                  togglePasswordVisibility={() =>
                    setShowPassword(!showPassword)
                  }
                />
              </div>
              <div>
                <Button
                  size="sm"
                  className="w-full"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            </div>
          </form>
          <SignUpLink />
        </div>
      </div>
    </div>
  );
}
