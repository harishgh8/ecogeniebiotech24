import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@components/Layout';
import { SectionContainer } from '@components/Section';
import { Icon } from '@iconify/react';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';

export default function OrderConfirmation() {
    const router = useRouter();
    const { id } = router.query;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;

        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders/${id}`);
                const data = await response.json();

                if (!data.success) {
                    throw new Error(data.error || 'Failed to fetch order');
                }

                setOrder(data.order);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <SectionContainer className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
                </SectionContainer>
            </Layout>
        );
    }

    if (error || !order) {
        return (
            <Layout>
                <SectionContainer className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <Icon
                            icon="material-symbols:error"
                            className="w-16 h-16 text-red-500 mx-auto mb-4"
                        />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Error Loading Order
                        </h1>
                        <p className="text-gray-600">{error || 'Order not found'}</p>
                        <button
                            onClick={() => router.push('/Products')}
                            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </SectionContainer>
            </Layout>
        );
    }

    return (
        <Layout>
            <SectionContainer className="footer--container wrap wrap-px relative z-10">
                <div className="max-w-4xl mx-auto py-16">
                    <Breadcrumbs />
                    
                    <div className="text-center mb-12">
                        <Icon
                            icon="material-symbols:check-circle"
                            className="w-20 h-20 text-green-500 mx-auto mb-4"
                        />
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Order Confirmed!
                        </h1>
                        <p className="text-gray-600">
                            Thank you for your purchase. Your order has been confirmed.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">
                                Order #{order.orderId}
                            </h2>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </div>

                        <div className="border-t border-gray-200 py-6">
                            <h3 className="text-lg font-semibold mb-4">Items</h3>
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-medium">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 py-6">
                            <h3 className="text-lg font-semibold mb-4">
                                Shipping Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Name</p>
                                    <p className="font-medium">{order.user.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium">{order.user.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-medium">{order.user.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        Shipping Method
                                    </p>
                                    <p className="font-medium capitalize">
                                        {order.shippingMethod}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">Address</p>
                                <p className="font-medium">
                                    {order.shippingAddress.street}
                                    <br />
                                    {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.state}{' '}
                                    {order.shippingAddress.postalCode}
                                    <br />
                                    {order.shippingAddress.country}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 py-6">
                            <h3 className="text-lg font-semibold mb-4">
                                Order Summary
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Subtotal</p>
                                    <p className="font-medium">
                                        ₹{order.subtotal.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Shipping</p>
                                    <p className="font-medium">
                                        ₹{order.shippingCost.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-600">Tax (18% GST)</p>
                                    <p className="font-medium">
                                        ₹{order.tax.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-200">
                                    <p className="font-semibold">Total</p>
                                    <p className="font-semibold">
                                        ₹{order.total.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => router.push('/Products')}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </SectionContainer>
        </Layout>
    );
}
