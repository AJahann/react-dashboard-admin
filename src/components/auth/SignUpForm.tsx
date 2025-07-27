import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import { useSignUp } from "../../libs/data-layer/auth/use-sign-up";
import Checkbox from "../form/input/Checkbox";
import Input from "../form/input/InputField";
import Label from "../form/Label";

const signUpSchema = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(8, "Maximum 8 characters"),
  lastName: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(12, "Maximum 12 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .max(32, "Maximum 32 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Must contain uppercase, lowercase, and number",
    ),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

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

function SignUpHeader() {
  return (
    <div className="mb-5 sm:mb-8">
      <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
        Sign Up
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Enter your details to create an admin account
      </p>
    </div>
  );
}

function TermsAndConditions() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox checked className="w-5 h-5" onChange={() => 0} />
      <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
        By creating an account means you agree to the{" "}
        <span className="text-gray-800 dark:text-white/90">
          Terms and Conditions,
        </span>{" "}
        and our{" "}
        <span className="text-gray-800 dark:text-white">Privacy Policy</span>
      </p>
    </div>
  );
}

function SignInLink() {
  return (
    <div className="mt-5">
      <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
        Already have an account?{" "}
        <Link
          className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
          to="/signin"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: signUp, isPending } = useSignUp();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    signUp({
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <SignUpHeader />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <Label htmlFor="name">
                    First Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    {...register("name")}
                    hint={errors.name?.message}
                    id="name"
                    max="8"
                    min="3"
                    type="text"
                    error={!!errors.name?.message}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="sm:col-span-1">
                  <Label htmlFor="lastName">
                    Last Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    {...register("lastName")}
                    hint={errors.lastName?.message}
                    id="lastName"
                    max="12"
                    min="3"
                    type="text"
                    error={!!errors.lastName?.message}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  {...register("email")}
                  hint={errors.email?.message}
                  id="email"
                  max="32"
                  min="3"
                  type="email"
                  error={!!errors.email?.message}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="password">
                  Password<span className="text-error-500">*</span>
                </Label>
                <PasswordInput
                  {...register("password")}
                  hint={errors.password?.message}
                  id="password"
                  max="32"
                  min="8"
                  error={!!errors.password?.message}
                  placeholder="Enter your password"
                  showPassword={showPassword}
                  togglePasswordVisibility={() =>
                    setShowPassword(!showPassword)
                  }
                />
              </div>
              <TermsAndConditions />
              <div>
                <button
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? <>Creating Account...</> : "Sign Up"}
                </button>
              </div>
            </div>
          </form>
          <SignInLink />
        </div>
      </div>
    </div>
  );
}
