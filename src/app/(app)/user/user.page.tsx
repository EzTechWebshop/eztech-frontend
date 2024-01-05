import { auth } from "@/app/api/auth/[...nextauth]/options";
import { Text } from "@radix-ui/themes";

export default async function UserPage() {
  const user = await auth();
  return (
    <div className="flex flex-col">
      <div className="flex flex-1">
        <Text size={"8"} weight={"bold"}>
          Welcome {user?.user.firstName}
        </Text>
      </div>
    </div>
  );
}
