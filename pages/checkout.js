import { useState, useEffect } from "react";
import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import Script from "next/script";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";
import { CheckoutForms } from "../components/Checkout/CheckoutForms";

export default function Checkout() {
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [error, setError] = useState(null);
    const { cart, getCartTotal, clearCart } = useCart();
    const router = useRouter();

    const subtotal = getCartTotal();
    const [formState, setFormState] = useState(null);

    useEffect(() => {
        if (cart.length === 0) {
            router.push("/cart");
        }
    }, [cart, router]);

    useEffect(() => {
        const loadRazorpay = () => {
            if (window.Razorpay) {
                console.log("Razorpay already loaded");
                setRazorpayLoaded(true);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => {
                console.log("Razorpay script loaded");
                setRazorpayLoaded(true);
            };
            script.onerror = () => {
                console.error("Failed to load Razorpay script");
                setError("Failed to load payment system");
            };
            document.body.appendChild(script);
        };

        loadRazorpay();
    }, []);

    if (cart.length === 0) {
        return null;
    }

    const handleFormSubmit = async (formData) => {
        console.log("Form submitted:", formData);
        setFormState(formData);
        setError(null);

        if (!window.Razorpay) {
            setError(
                "Payment system is not initialized. Please refresh the page."
            );
            return;
        }

        setLoading(true);

        try {
            const shippingCost = formData.shippingMethod === "express" ? 10 : 0;
            const totalAmount = subtotal + shippingCost;
            const amountInPaise = Math.round(totalAmount * 100);

            console.log("Creating order with amount:", amountInPaise);

            const response = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: amountInPaise
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create order");
            }

            console.log("Order created:", data);

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "Ecogenie Biotech",
                description: "Purchase from Ecogenie Biotech",
                order_id: data.id,
                handler: function (response) {
                    console.log("Payment successful:", response);
                    clearCart();
                    router.push({
                        pathname: "/success",
                        query: {
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature
                        }
                    });
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone
                },
                notes: {
                    address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`,
                    shipping_method: formData.shippingMethod
                },
                theme: {
                    color: "#16a34a"
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        console.log("Payment modal closed");
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.on("payment.failed", function (response) {
                console.error("Payment failed:", response.error);
                setError(
                    response.error.description ||
                        "Payment failed. Please try again."
                );
                setLoading(false);
            });

            razorpay.open();
        } catch (error) {
            console.error("Payment initialization error:", error);
            setError(
                error.message || "Error initializing payment. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <SectionContainer className="footer--container wrap wrap-px relative z-10">
                <div className="max-w-4xl mx-auto pb-20 pt-40">
                    <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-8">
                            <CheckoutForms
                                onSubmit={handleFormSubmit}
                                isLoading={loading}
                            />
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-xl font-semibold mb-4">
                                    Order Summary
                                </h2>
                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {item.title}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="font-semibold">
                                                ₹
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}

                                    <div className="border-t pt-4 mt-4">
                                        <div className="flex justify-between text-sm">
                                            <span>Subtotal</span>
                                            <span>₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        {formState && (
                                            <div className="flex justify-between text-sm mt-2">
                                                <span>Shipping</span>
                                                <span>
                                                    {formState.shippingMethod ===
                                                    "express"
                                                        ? "₹10.00"
                                                        : "Free"}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                                            <span>Total</span>
                                            <span>
                                                ₹
                                                {(
                                                    subtotal +
                                                    (formState?.shippingMethod ===
                                                    "express"
                                                        ? 10
                                                        : 0)
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </Layout>
    );
}
