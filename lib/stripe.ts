import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY || "", {
    apiVersion: "2025-01-27.acacia" as any,
    appInfo: {
        name: "Dugsi Hub",
        version: "0.1.0",
    },
    typescript: true,
});
