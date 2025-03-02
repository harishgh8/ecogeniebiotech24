import { useState, useEffect } from "react";
import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import { ProductCard } from "@components/Product/ProductCard";
import { ProductFilters } from "@components/Product/ProductFilters";
import { useDebounce } from "../hooks/useDebounce";
import { productsData } from "./products/[id]";
// const productsData = [
//     {
//         id: "chitin",
//         title: "Chitin",
//         description:
//             "Derived from sustainable silkworm pupae, chitin is a natural biopolymer that stimulates plant growth hormones like auxins and cytokinins, boosting productivity and resilience.",
//         price: 299.99,
//         image: "/productsData/1.png",
//         category: "Biopolymers",
//         rating: 4.5,
//         reviews: [
//             { id: 1, rating: 5, comment: "Excellent product!" },
//             { id: 2, rating: 4, comment: "Works great" }
//         ]
//     },
//     {
//         id: "chitosan",
//         title: "Chitosan",
//         description:
//             "Extracted from eco-friendly silkworm pupae, chitosan improves plant tolerance to environmental stresses, reduces fungal diseases, and enhances drought resistance, promoting sustainable agriculture.",
//         price: 199.99,
//         image: "/productsData/4.png",
//         category: "Biopolymers",
//         rating: 4.5,
//         reviews: [
//             { id: 1, rating: 5, comment: "Excellent product!" },
//             { id: 2, rating: 4, comment: "Works great" }
//         ]
//     },
//     {
//         id: "pupaeOil",
//         title: "Pupae Oil",
//         description:
//             "Sustainably sourced from silkworm pupae, this nutrient-rich oil enhances soil fertility, supports plant growth, and serves as a natural bio-enhancer for eco-conscious farming.",
//         price: 149.99,
//         image: "/productsData/7.png",
//         category: "Oils",
//         rating: 4.5,
//         reviews: [
//             { id: 1, rating: 5, comment: "Excellent product!" },
//             { id: 2, rating: 4, comment: "Works great" }
//         ]
//     },
//     {
//         id: "lakadongTurmeric",
//         title: "Lakadong Turmeric",
//         description:
//             "Sourced from the pristine hills of Meghalaya, Lakadong Turmeric is known for its high curcumin content, offering powerful antioxidant and anti-inflammatory benefits for health and wellness.",
//         price: 249.99,
//         image: "/productsData/lakadong_turmeric.png",
//         category: "Spices",
//         rating: 4.8,
//         reviews: [
//             {
//                 id: 1,
//                 rating: 5,
//                 comment: "Highly potent turmeric, great quality!"
//             },
//             {
//                 id: 2,
//                 rating: 5,
//                 comment: "Perfect for golden milk and cooking!"
//             }
//         ]
//     }
// ];

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const debouncedSearch = useDebounce(searchQuery, 300);

    useEffect(() => {
        // In a real app, this would be an API call
        setProducts(productsData);
        setFilteredProducts(productsData);
        setIsLoading(false);
    }, []);

    const handleFilterChange = ({
        priceRange,
        categories,
        minRating,
        sortBy
    }) => {
        let filtered = [...products];

        // Apply price filter
        filtered = filtered.filter(
            (product) =>
                product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Apply category filter
        if (categories.length > 0) {
            filtered = filtered.filter((product) =>
                categories.includes(product.category)
            );
        }

        // Apply rating filter
        if (minRating > 0) {
            filtered = filtered.filter(
                (product) => product.rating >= minRating
            );
        }

        // Apply search filter
        if (debouncedSearch) {
            const searchLower = debouncedSearch.toLowerCase();
            filtered = filtered.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchLower) ||
                    product.description.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        switch (sortBy) {
            case "price_asc":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case "reviews":
                filtered.sort((a, b) => b.reviews.length - a.reviews.length);
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    };

    return (
        <Layout>
            <SectionContainer className="footer--container wrap wrap-px relative z-10 pt-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <svg
                                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters */}
                        <div className="lg:w-1/4">
                            <ProductFilters
                                onFilterChange={handleFilterChange}
                            />
                        </div>

                        {/* Product Grid */}
                        <div className="lg:w-3/4">
                            {isLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[...Array(6)].map((_, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-100 h-80 rounded-lg animate-pulse"
                                        />
                                    ))}
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        No products found
                                    </h3>
                                    <p className="mt-2 text-gray-500">
                                        Try adjusting your search or filter
                                        criteria
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </Layout>
    );
}
