import { auth } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";
import {
  IoAccessibilityOutline,
  IoBuildOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPersonAddOutline,
  IoPersonOutline,
  IoReaderOutline,
} from "react-icons/io5";

import UserCart from "@/components/user-cart";
import UserWishlist from "@/components/user-wishlist";

export default async function NavbarUser() {
  const session = await auth();
  if (!session)
    return (
      <div className="flex gap-2 items-center">
        <UserButton session={session} />
      </div>
    );
  return (
    <div className="flex gap-2 items-center">
      <UserWishlist />
      <UserCart />
      <UserButton session={session} />
    </div>
  );
}

type NavbarUserProps = {
  session: Session | undefined | null;
};
function UserButton({ ...props }: NavbarUserProps) {
  const { session } = props;
  if (!session) {
    return (
      <>
        <Text>Sign In</Text>
        <Link href="/auth/sign-in">
          <Button size={"icon"} variant={"iconCircle"}>
            <IoLogInOutline size={18} />
          </Button>
        </Link>
      </>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"iconCircle"}>
            <IoAccessibilityOutline size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {session.user?.role === "Admin" && (
            <>
              <Link href="/admin">
                <DropdownMenuItem className="hover:cursor-pointer">
                  Admin
                  <DropdownMenuShortcut>
                    <IoPersonAddOutline size={18} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </>
          )}
          <Link href="/user">
            <DropdownMenuItem className="hover:cursor-pointer">
              Profile
              <DropdownMenuShortcut>
                <IoPersonOutline size={18} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/user/orders">
            <DropdownMenuItem className="hover:cursor-pointer">
              Orders
              <DropdownMenuShortcut>
                <IoReaderOutline size={18} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/user/settings">
            <DropdownMenuItem className="hover:cursor-pointer">
              Settings
              <DropdownMenuShortcut>
                <IoBuildOutline size={18} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link href="/auth/sign-out">
            <DropdownMenuItem className="hover:cursor-pointer">
              Sign Out
              <DropdownMenuShortcut>
                <IoLogOutOutline size={18} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
