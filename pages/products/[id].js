import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import { useCart } from "../../context/CartContext";

const productsData = [
    {
        id: "chitin",
        title: "Chitin",
        price: 25,
        image: "/productsData/1.png",
        reviews: [],
        description:
            "Chitin is a natural biopolymer extracted from insect exoskeletons with high-grade purity exceeding 95%. This sustainable and eco-friendly material is ideal for biomedical and pharmaceutical applications. Our chitin is available in various particle sizes and offers excellent biocompatibility and biodegradability, making it perfect for innovative applications in medical and industrial fields."
    },
    {
        id: "chitosan",
        title: "Chitosan",
        price: 30,
        image: "/productsData/4.png",
        reviews: [],
        description:
            "Our premium chitosan is derived from deacetylated chitin with a deacetylation degree exceeding 90%. This water-soluble and highly versatile biomaterial is perfect for wound healing and drug delivery systems. It features natural anti-bacterial and anti-fungal properties, and is available in different molecular weights. Our chitosan is certified for medical and cosmetic applications, ensuring the highest quality standards for your needs."
    },
    {
        id: "pupaeOil",
        title: "Pupae Oil",
        price: 15,
        image: "/productsData/7.png",
        reviews: [],
        description:
            "Our pupae oil is cold-pressed from black soldier fly pupae, ensuring the highest quality and nutrient retention. Rich in essential fatty acids and nutrients, it features a high lauric acid content exceeding 40%. The oil possesses natural antimicrobial properties and is suitable for both cosmetic and pharmaceutical applications. Our sustainable production process ensures minimal environmental impact while delivering a premium quality product."
    }
];

const StarRating = ({ rating, onRatingChange, interactive = false }) => {
    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => interactive && onRatingChange(star)}
                    className={`${
                        interactive ? "cursor-pointer" : "cursor-default"
                    }`}
                >
                    <svg
                        className={`w-5 h-5 ${
                            star <= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </button>
            ))}
        </div>
    );
};

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(productsData.find((p) => p.id === id));
    const [quantity, setQuantity] = useState(1);
    const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
    const { addToCart } = useCart();

    if (!product) return <p>Product not found.</p>;

    const averageRating = product.reviews.length
        ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
          product.reviews.length
        : 0;

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (newReview.rating === 0) {
            alert("Please select a rating");
            return;
        }
        const updatedProduct = {
            ...product,
            reviews: [
                ...product.reviews,
                {
                    id: Date.now(),
                    ...newReview,
                    date: new Date().toLocaleDateString()
                }
            ]
        };
        setProduct(updatedProduct);
        setNewReview({ rating: 0, comment: "" });

        // Update the product in productsData array
        const productIndex = productsData.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
            productsData[productIndex] = updatedProduct;
        }
    };

    const handleBuyNow = () => {
        addToCart(product, 1);
        router.push('/cart');
    };

    return (
        <Layout>
            <SectionContainer className="footer--container wrap wrap-px relative z-10">
                <div className="container mx-auto p-6 sm:p-10 py-20 sm:py-40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="relative aspect-square">
                            <Image
                                src={product.image}
                                fill
                                style={{ objectFit: "contain" }}
                                alt={product.title}
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <StarRating rating={averageRating} />
                                <h1 className="text-2xl sm:text-3xl font-bold">
                                    {product.title}
                                </h1>
                                <p className="text-lg sm:text-xl font-semibold">
                                    ${product.price}
                                </p>
                            </div>

                            <div className="flex items-center space-x-4 mt-4">
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    className="w-20 p-2 border rounded"
                                />
                                <button
                                    onClick={() => addToCart(product, quantity)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold"
                                >
                                    Add to Cart
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleBuyNow}
                                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 font-semibold"
                                >
                                    Buy It Now
                                </button>
                            </div>
                            <div className="mt-8 space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">
                                        Product Description
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h2 className="text-xl font-semibold mb-4">
                                    Customer Reviews
                                </h2>
                                <form
                                    onSubmit={handleReviewSubmit}
                                    className="space-y-4 mb-8"
                                >
                                    <div>
                                        <label className="block mb-2">
                                            Your Rating
                                        </label>
                                        <StarRating
                                            rating={newReview.rating}
                                            onRatingChange={(rating) =>
                                                setNewReview((prev) => ({
                                                    ...prev,
                                                    rating
                                                }))
                                            }
                                            interactive={true}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2">
                                            Your Review
                                        </label>
                                        <textarea
                                            value={newReview.comment}
                                            onChange={(e) =>
                                                setNewReview((prev) => ({
                                                    ...prev,
                                                    comment: e.target.value
                                                }))
                                            }
                                            className="w-full p-2 border rounded"
                                            rows="4"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                                    >
                                        Submit Review
                                    </button>
                                </form>

                                <div className="space-y-4">
                                    {product.reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="border-b pb-4"
                                        >
                                            <StarRating
                                                rating={review.rating}
                                            />
                                            <p className="mt-2">
                                                {review.comment}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {review.date}
                                            </p>
                                        </div>
                                    ))}
                                    {product.reviews.length === 0 && (
                                        <p className="text-gray-500">
                                            No reviews yet. Be the first to
                                            review this product!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </Layout>
    );
};

export default ProductDetails;
