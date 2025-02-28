import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import Script from "next/script";
import { useCart } from "../context/CartContext";

export default function Checkout() {
    const [loading, setLoading] = useState(false);
    const { cart, getCartTotal, clearCart } = useCart();
    const router = useRouter();
    const totalAmount = getCartTotal();

    useEffect(() => {
        if (cart.length === 0) {
            router.push("/cart");
        }
    }, [cart, router]);

    const handlePayment = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        setLoading(true);
        try {
            // Convert amount to paise (Razorpay expects amount in smallest currency unit)
            const amountInPaise = Math.round(totalAmount * 100);

            // Create an order from the backend
            const response = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: amountInPaise,
                    currency: "INR"
                })
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const order = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "EcoGenie Biotech",
                description: "Purchase of Bio Products",
                order_id: order.id,
                handler: function (response) {
                    // Handle successful payment
                    alert("Payment successful! Thank you for your purchase.");
                    clearCart(); // Clear the cart after successful payment
                    router.push("/"); // Redirect to home page
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: ""
                },
                theme: {
                    color: "#10B981"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment failed. Please try again.");
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return null; // Will redirect in useEffect
    }

    return (
        <Layout>
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="beforeInteractive"
            />
            <SectionContainer className="footer--container wrap wrap-px relative z-10 pt-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                        <div className="bg-white rounded-lg shadow p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-4">
                                Order Summary
                            </h2>
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center py-2 border-b"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {item.title}
                                        </p>
                                        <p className="text-gray-600">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-semibold">
                                        $
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </p>
                                </div>
                            ))}
                            <div className="mt-4 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">
                                        Total Amount:
                                    </span>
                                    <span className="text-lg font-bold">
                                        ${totalAmount.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className={`w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold
                                ${
                                    loading
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-green-700"
                                }
                            `}
                        >
                            {loading ? "Processing..." : "Pay Now"}
                        </button>
                    </div>
                </div>
            </SectionContainer>
        </Layout>
    );
}
