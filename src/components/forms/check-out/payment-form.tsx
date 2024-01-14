"use client";

/**
 * Source: https://sultanoveli.medium.com/how-to-add-stripe-payments-to-your-next-js-app-d1cfced7c8a5
 * Modified based on the needs of the project.
*/

import SpinnerLoad from "@/components/loading-fields/spinner-load";
import { CreateOrder } from "@/server/order-actions";
import { CreateOrderItem, CreateOrderRequest } from "@/types/checkout-types";

import { Cart, CartItem, Product } from "@/types/domain-types";
import { AlertWindow, ConfirmationWindow } from "@/utils/alerts";
import { Text } from "@radix-ui/themes";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from "@stripe/stripe-js";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export type PaymentFormProps = {
  cart: Cart;
  details: any;
};

// Payment form for stripe

export default function PaymentForm({ ...props }: PaymentFormProps) {
  const { details, cart } = props;
  const queryClient = useQueryClient();
  // Loading state for the payment button
  const [loadingPayment, setLoadingPayment] = React.useState(false);
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const paymentElementOptions: StripeElementsOptions = {};
  // If cartItems or details is undefined, return null.
  // Prevents the user from accessing the payment form without having any items in the cart.
  if (!cart || !details) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if(!ConfirmationWindow("Are you sure you want to pay?")) {
      return;
    }
    setLoadingPayment(true);
    // Finds the product in the TestProducts array that matches the id of the cartItem.
    // Prevents the user from changing the price of the product in the cart.

    const products: Product[] = await Promise.all(
      cart.cartItems.map((item: CartItem) => item.product),
    );

    const OrderItems: CreateOrderItem[] = cart.cartItems.map(
      (item: CartItem) => {
        const product = products.find((p) => p.id === item.product.id);
        const result: CreateOrderItem = {
          productId: product?.id ?? 0,
          productName: product?.name ?? "N/A",
          productDescription: product?.description ?? "N/A",
          price: product?.price ?? 1,
          quantity: item.quantity,
        };
        return result;
      },
    );
    if (!OrderItems) {
      AlertWindow("Something went wrong, please try again later.");
      setLoadingPayment(false);
      return;
    }

    e.preventDefault();

    // Pass the appearance object to the Elements instance

    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) {
        // Stripe.js has not yet loaded.
        AlertWindow("Something went wrong, please try again later.");
        setLoadingPayment(false);
        return null;
      }
    } catch (error) {
      AlertWindow("Something went wrong, please try again later.");
      setLoadingPayment(false);
    }

    // Gets the total price for found products
    const total = OrderItems.reduce((sum, product) => {
      return sum + product.price! * product.quantity;
    }, 0);

    // Creates a payment intent with the total price and the users email. This is recommended by stripe.
    const res = await axios.post("/api/create-payment-intent", {
      data: {
        amount: total,
        currency: "dkk",
        email: details.email,
        name: details.fullName,
      },
    });

    // Gets the client secret from the payment intent.
    const clientSecret = res.data;
    const result = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement! },
    });

    // Checks if payment succeeded or not.
    if (result?.paymentIntent?.status == "succeeded") {
      // TODO: Add some form of return message to the user and the program if the payment was successful or not.
      // 1. Create a new order in the database.
      const order: CreateOrderRequest = {
        paymentId: result.paymentIntent.id,
        total: total,
        products: OrderItems,
        date: new Date().toDateString(),
      };

      const response = await CreateOrder(order);
      router.push(`/order/${response.orderNumber}`);
      router.refresh();
      // 2. Clear the cart.
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      setLoadingPayment(false);
    } else {
      router.push(`/checkout/error`);
      setLoadingPayment(false);
      AlertWindow("Payment failed");
    }
  };

  const option: StripeCardElementOptions = {
    iconStyle: "solid",
    value: {
      postalCode: details.postalCode,
    },
    style: {
      base: {
        fontSize: "48px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <CardElement options={option} />
          {loadingPayment ? (
            <SpinnerLoad />
          ) : (
            <button disabled={loadingPayment} type="submit">
              Pay Now
            </button>
          )}
        </form>
        <div className="flex flex-col">
          <Text>Card Number: 4242 4242 4242 4242</Text>
          <Text>Exp Date: 05/26</Text>
          <Text>CVC: 123</Text>
          <Text>Zip: 12345</Text>
        </div>
      </div>
    </>
  );
}

const paymentElementOptions: StripeElementsOptions = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css2?family=Roboto",
    },
  ],
};
