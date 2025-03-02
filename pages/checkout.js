import { useState, useEffect } from "react";
import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import Script from "next/script";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";
import { CheckoutForms } from "../components/Checkout/CheckoutForms";
import OrderSummary from "@components/OrderSummary/OrderSummary";

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
        // <Layout>
        //     <SectionContainer className="footer--container wrap wrap-px relative z-10">
        //         <div className="max-w-4xl mx-auto pb-20 pt-40">
        //             <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        //             {error && (
        //                 <div className="mb-6 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        //                     <strong className="font-bold">Error!</strong>
        //                     <span className="block sm:inline"> {error}</span>
        //                 </div>
        //             )}
        //             <div className="grid grid-cols-12 gap-8">
        //                 <div className="col-span-12 lg:col-span-8">
        //                     <CheckoutForms
        //                         onSubmit={handleFormSubmit}
        //                         isLoading={loading}
        //                     />
        //                 </div>
        //                 <div className="lg:col-span-4">
        //                     <OrderSummary
        //                         subtotal={subtotal}
        //                         shippingMethod={formState?.shippingMethod}
        //                         setShippingMethod={() => {}}
        //                         discountCode={null}
        //                         setDiscountCode={() => {}}
        //                         discount={0}
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //     </SectionContainer>
        // </Layout>
        <Layout>
            <SectionContainer className="footer--container wrap wrap-px relative z-10">
                <div className="max-w-4xl mx-auto pb-10 lg:pb-20 pt-20 lg:pt-40">
                    {/* Responsive Heading */}
                    <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">
                        Checkout
                    </h1>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}

                    {/* Responsive Grid Layout */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* Checkout Form (Full width on mobile, 8 columns on desktop) */}
                        <div className="col-span-12 lg:col-span-8">
                            <CheckoutForms
                                onSubmit={handleFormSubmit}
                                isLoading={loading}
                            />
                        </div>

                        {/* Order Summary (Full width on mobile, 4 columns on desktop) */}
                        <div className="col-span-12 lg:col-span-4">
                            <OrderSummary
                                subtotal={subtotal}
                                shippingMethod={formState?.shippingMethod}
                                setShippingMethod={() => {}}
                                discountCode={null}
                                setDiscountCode={() => {}}
                                discount={0}
                            />
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </Layout>
    );
}
