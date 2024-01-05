import api from "@/utils/api";
import CheckOut from "./checkout.page";

export default async function CheckoutPage() {
  const userDetailsRes = await api.user.getUserDetails();
  const userDetails = userDetailsRes.data;

  // TODO: Add error handling
  if (!userDetails) {
    return <div>Something went wrong fix this later</div>;
  }
  return <CheckOut userDetails={userDetails} />;
}
