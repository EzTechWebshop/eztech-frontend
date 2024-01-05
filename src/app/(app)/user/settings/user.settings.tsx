import DeleteUserButton from "@/components/actions/delete-user-button";
import ResetPasswordForm from "@/components/forms/reset-password-form";
import UserSettingsForm from "@/components/forms/user-settings-form";
import { Button } from "@/components/ui/button";
import api from "@/utils/api";
import { Text } from "@radix-ui/themes";

export default async function UserSettings() {
  const res = await api.user.getUserDetails();
  const userDetails = res.data;

  return (
    <>
      <div className="flex flex-1 space-x-14 m-4 justify-between">
        <div className="flex flex-col">
          <div className="w-fit h-fit border-2 p-4 rounded-lg shadow-lg">
            <UserSettingsForm details={userDetails} />
          </div>
          <div className="float-right">
            <DeleteUserButton />
          </div>
        </div>
        <div className="w-fit h-fit border-2 p-4 rounded-lg shadow-lg">
          <ResetPasswordForm />
        </div>
      </div>
    </>
  );
}
