import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY || "sk_test_123456789", {
    apiVersion: "2025-01-27.acacia" as any,
    appInfo: {
        name: "Dugsi Hub",
        version: "0.1.0",
    },
    typescript: true,
});
