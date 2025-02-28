import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/router";
import { useSelector } from "react-redux"; // Import Redux hook
import { Icon } from "@iconify/react";

const navigation = [
    { name: "Home", to: "#index", href: "/" },
    { name: "About", to: "#About", href: "/About" },
    { name: "Products", to: "Products", href: "/Products" },
    { name: "Gallery", to: "Gallery", href: "/Gallery" },
    { name: "Contact", to: "Contact", href: "/Contact" }
];

export const Nav = () => {
    const router = useRouter();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { getCartItemsCount } = useCart();
    const cartItemCount = getCartItemsCount();

    const closeNav = () => {
        setIsNavOpen(false);
    };

    const greenColorUnderline = (e) => {
        e.currentTarget.style.textDecoration = "underline";
        e.currentTarget.style.textDecorationColor = "green";
    };

    const removeUnderline = (e) => {
        e.currentTarget.style.textDecoration = "none";
    };

    return (
        <nav className="header-nav">
            <div className="header-nav--container flex justify-between items-center">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="mobile-menu"
                    aria-controls="navbar-dropdown"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <Icon
                        icon="material-symbols:menu-rounded"
                        className="h-6 w-auto text-black"
                    />
                </button>

                {/* Navigation Menu */}
                <div
                    className={`header-nav--menu-container z-20 ${
                        isNavOpen ? "show" : "hide"
                    }`}
                    id="navbar-default"
                >
                    <ul className="header-nav--menu">
                        {navigation.map((item) => (
                            <li
                                key={item.name}
                                className="header-nav--menu-item text-lg"
                            >
                                <a
                                    key={item.name}
                                    to={item.to}
                                    href={item.href}
                                    className={`menu-item--link flex items-center ${
                                        router.pathname === item.href
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={closeNav}
                                    onMouseEnter={greenColorUnderline}
                                    onMouseLeave={removeUnderline}
                                    target={item.target ? item.target : "_self"}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Cart Icon with Count */}
                <Link href="/cart" className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                    </svg>
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {cartItemCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
};
