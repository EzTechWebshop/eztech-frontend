import { Button } from "@/components/ui/button";
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";

type AuthLayoutProps = {
  children: React.ReactNode;
};
export default function AuthLayout({ ...props }: AuthLayoutProps) {
  const { children } = props;
  return (
    <>
      <header id="header" className="flex border-b-2 h-12">
        <div className=" flex flex-1 items-center space-x-4 mx-4">
          <Link href={"/"}>
            <Button variant={"iconCircle"} size={"icon"}>
              <IoReturnUpBackOutline size={20} />
            </Button>
          </Link>
          <Text>Return</Text>
        </div>
      </header>
      <main
        id="main"
        className="flex flex-1 overflow-y-auto overflow-x-hidden mb-4"
      >
        {children}
      </main>
    </>
  );
}
