"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@radix-ui/themes";

export default function DeleteUserButton() {
  const handleDeleteUser = () => {
    alert("Delete user, not implemented yet, contact support for help");
  };
  return (
    <Button variant={"ghost"} size={"xs"} onClick={handleDeleteUser}>
      <Text color="red">Delete User</Text>
    </Button>
  );
}
