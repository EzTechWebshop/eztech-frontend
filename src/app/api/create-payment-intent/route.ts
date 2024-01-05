/**
 * SOURCE: https://sultanoveli.medium.com/how-to-add-stripe-payments-to-your-next-js-app-d1cfced7c8a5
 * PURPOSE: Create a payment intent
 */
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

// process.env.STRIPE_SECRET_KEY!
// temporary key, see if the process.env works or not
const stripe = new Stripe("sk_test_51O76ICDHvFZqPnkqtIDylAezcfJMUXzqA3VBNJm4MrxCcsexzHQ7kFDgX8403tn4v6o0WF3mDxSZCGKxLlBlcsDi002i0C2wZ3", {
    typescript: true,
    apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
    const { data } = await req.json();
    const { amount, email, name } = data;

    const customer = await stripe.customers.create({
        name: name,
        email: email,
    });

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: "DKK",
            customer: customer.id,
        });
        return new NextResponse(paymentIntent.client_secret, { status: 200 });
    } catch (error: any) {
        return new NextResponse(error, {
            status: 400,
        });
    }
}
