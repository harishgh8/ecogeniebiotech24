import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/About" },
    { name: "Products", href: "/Products" },
    { name: "Gallery", href: "/Gallery" },
    { name: "Contact", href: "/contact" }
];

// export const Nav = () => {
//     const router = useRouter();
//     const [isNavOpen, setIsNavOpen] = useState(false);
//     const { getCartItemsCount } = useCart();
//     const cartItemCount = getCartItemsCount();

//     const toggleNav = () => setIsNavOpen((prev) => !prev);
//     const closeNav = () => setIsNavOpen(false);

//     return (
//         <nav className="bg-white shadow-md">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center py-4">
//                     {/* Mobile Menu Button */}
//                     <button
//                         onClick={toggleNav}
//                         className="lg:hidden text-gray-700 focus:outline-none"
//                         aria-label="Toggle navigation"
//                     >
//                         <Icon
//                             icon="material-symbols:menu-rounded"
//                             className="h-6 w-6"
//                         />
//                     </button>

//                     {/* Navigation Links */}
//                     <div
//                         className={`lg:flex items-center ${
//                             isNavOpen ? "block" : "hidden"
//                         }`}
//                     >
//                         <ul className="flex flex-col lg:flex-row gap-6">
//                             {navigation.map((item) => (
//                                 <li key={item.name}>
//                                     <Link
//                                         href={item.href}
//                                         className={`block text-gray-700 hover:text-green-600 transition ${
//                                             router.pathname === item.href
//                                                 ? "border-b-2 border-green-600"
//                                                 : ""
//                                         }`}
//                                         onClick={closeNav}
//                                     >
//                                         {item.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Cart Icon with Badge */}
//                     <Link href="/cart" className="relative text-gray-700">
//                         <Icon icon="mdi:cart-outline" className="h-6 w-6" />
//                         {cartItemCount > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                                 {cartItemCount}
//                             </span>
//                         )}
//                     </Link>
//                 </div>
//             </div>
//         </nav>
//     );
// };
