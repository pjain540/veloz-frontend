"use client"
import { useEffect } from "react";
import { useCart } from "@/providers/CartProvider";

export default function PaymentSuccess() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div style={{ padding: 40 }}>
            <h2>🎉 Payment Successful!</h2>
            <p>Your order has been placed successfully.</p>
        </div>
    );
}