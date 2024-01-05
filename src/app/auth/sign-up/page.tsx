import SignUpForm from "@/components/forms/auth/sign-up-form";
import { Strong, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export default function SignUpPage() {
  return (
    <div className="flex flex-1">
      <div className="flex flex-col mx-auto mt-4 border-2 rounded-md shadow-md p-8 space-y-4 w-fit">
        <SignUpForm />
        <Text>
          Already have an account?{" "}
          <Text className="hover:cursor-pointer hover:opacity-75">
            <Link href={"/auth/sign-in"}>
              <Text color="purple">
                <Strong>Sign in</Strong>
              </Text>
            </Link>
          </Text>
        </Text>
      </div>
    </div>
  );
}
