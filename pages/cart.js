import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import { useCart } from "../context/CartContext";

const Cart = () => {
    const { 
        cart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        getCartTotal 
    } = useCart();
    const router = useRouter();
    const totalAmount = getCartTotal();

    return (
        <Layout>
            <SectionContainer className="footer--container wrap wrap-px relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-16 sm:pt-20">
                    <SectionContainer className="page-banner--container py-8 sm:py-16">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                            Shopping Cart
                        </h1>
                        {cart.length === 0 ? (
                            <p className="text-lg">
                                Your cart is empty.{" "}
                                <Link href="/products" className="text-blue-600 hover:text-blue-800">Go shopping!</Link>
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col sm:flex-row items-start sm:items-center border-b py-4 space-y-3 sm:space-y-0"
                                    >
                                        <div className="relative w-full sm:w-20 h-20">
                                            <Image
                                                src={item.image}
                                                fill
                                                style={{ objectFit: 'contain' }}
                                                alt={item.title}
                                            />
                                        </div>
                                        <div className="flex-grow sm:ml-4 space-y-2">
                                            <h2 className="text-lg sm:text-xl">
                                                {item.title}
                                            </h2>
                                            <p className="text-base sm:text-lg font-semibold">
                                                ${item.price}
                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateQuantity(
                                                            item.id,
                                                            parseInt(e.target.value)
                                                        )
                                                    }
                                                    className="w-20 p-1 border rounded"
                                                />
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-auto text-right">
                                            <p className="text-lg font-bold">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="mt-8 space-y-4">
                                    <div className="flex justify-between items-center border-t pt-4">
                                        <span className="text-xl font-semibold">Total:</span>
                                        <span className="text-xl font-bold">${totalAmount.toFixed(2)}</span>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={clearCart}
                                            className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
                                        >
                                            Clear Cart
                                        </button>
                                        <Link
                                            href="/checkout"
                                            className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 font-semibold text-center"
                                        >
                                            Proceed to Checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SectionContainer>
                </div>
            </SectionContainer>
        </Layout>
    );
};

export default Cart;
