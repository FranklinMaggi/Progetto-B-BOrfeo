import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // Assicurati di avere stripe@11.x o superiore
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { amount, adminStripeId, description } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: description || "Prenotazione Orfeo" },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_intent_data: {
        application_fee_amount: 350, // €3.50 in centesimi
        transfer_data: {
          destination: adminStripeId,
        },
      },
      success_url: "https://beborfeo.vercel.app/success",
      cancel_url: "https://beborfeo.vercel.app/cancel",
    });

    return res.status(200).json({ url: session.url });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
