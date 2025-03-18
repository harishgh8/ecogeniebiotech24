import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/About" },
    { name: "Products", href: "/Products" },
    { name: "Gallery", href: "/Gallery" },
    { name: "Contact", href: "/Contact" }
];

export const Header = () => {
    const router = useRouter();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { getCartItemsCount } = useCart();
    const cartItemCount = getCartItemsCount();

    return (
        <header className="fixed top-0 left-0 w-full z-30 bg-white bg-opacity-80 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/ecogenie-logo.svg"
                        alt="Ecogenie Logo"
                        width={100}
                        height={24}
                        priority
                        className="h-16 w-auto"
                    />
                </Link>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-gray-700 hover:text-green-600 transition ${
                                router.pathname === item.href
                                    ? "border-b-2 border-green-600"
                                    : ""
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Cart & Mobile Menu */}
                <div className="flex items-center gap-4">
                    {/* <Link href="/cart" className="relative text-gray-700">
                        <Icon icon="mdi:cart-outline" className="h-6 w-6" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {cartItemCount}
                            </span>
                        )}
                    </Link> */}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        className="lg:hidden text-gray-700 focus:outline-none"
                        aria-label="Toggle navigation"
                    >
                        <Icon
                            icon="material-symbols:menu-rounded"
                            className="h-6 w-6"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isNavOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md z-20">
                    <ul className="flex flex-col space-y-4 py-4 px-6">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="block text-gray-700 hover:text-green-600 transition"
                                    onClick={() => setIsNavOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};
