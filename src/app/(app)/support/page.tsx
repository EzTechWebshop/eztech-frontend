import React from "react";

export default async function Support() {
  await new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
    return "page";
  });
  return <div>Support</div>;
}
