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
        images: ["/productsData/1.png"],
        reviews: [],
        description:
            "Chitin is a natural biopolymer extracted from insect exoskeletons with high-grade purity exceeding 95%. This sustainable and eco-friendly material is ideal for biomedical and pharmaceutical applications. Our chitin is available in various particle sizes and offers excellent biocompatibility and biodegradability, making it perfect for innovative applications in medical and industrial fields.",
        sizes: ["100g", "500g", "1kg"],
        specifications: {
            "Particle Size": "100-200 mesh",
            Purity: "95%",
            Appearance: "White powder"
        }
    },
    {
        id: "chitosan",
        title: "Chitosan",
        price: 30,
        images: ["/productsData/4.png"],
        reviews: [],
        description:
            "Our premium chitosan is derived from deacetylated chitin with a deacetylation degree exceeding 90%. This water-soluble and highly versatile biomaterial is perfect for wound healing and drug delivery systems. It features natural anti-bacterial and anti-fungal properties, and is available in different molecular weights. Our chitosan is certified for medical and cosmetic applications, ensuring the highest quality standards for your needs.",
        sizes: ["100g", "500g", "1kg"],
        specifications: {
            "Molecular Weight": "100-200 kDa",
            "Deacetylation Degree": "90%",
            Appearance: "White powder"
        }
    },
    {
        id: "pupaeOil",
        title: "Pupae Oil",
        price: 15,
        images: ["/productsData/7.png"],
        reviews: [],
        description:
            "Our pupae oil is cold-pressed from black soldier fly pupae, ensuring the highest quality and nutrient retention. Rich in essential fatty acids and nutrients, it features a high lauric acid content exceeding 40%. The oil possesses natural antimicrobial properties and is suitable for both cosmetic and pharmaceutical applications. Our sustainable production process ensures minimal environmental impact while delivering a premium quality product.",
        sizes: ["100ml", "500ml", "1L"],
        specifications: {
            "Lauric Acid Content": "40%",
            "Fatty Acid Profile": "C12:0, C14:0, C16:0",
            Appearance: "Clear liquid"
        }
    }
];

const ImageGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                    src={images[selectedImage]}
                    alt="Product"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square overflow-hidden rounded-lg ${
                            selectedImage === index
                                ? "ring-2 ring-green-500"
                                : "hover:opacity-75"
                        }`}
                    >
                        <Image
                            src={image}
                            alt={`Product ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

const ReviewSection = ({ reviews, onAddReview }) => {
    const [newReview, setNewReview] = useState({
        rating: 0,
        comment: "",
        image: null
    });
    const [sortBy, setSortBy] = useState("recent");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewReview({ ...newReview, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddReview(newReview);
        setNewReview({ rating: 0, comment: "", image: null });
    };

    const sortedReviews = [...reviews].sort((a, b) => {
        switch (sortBy) {
            case "highest":
                return b.rating - a.rating;
            case "lowest":
                return a.rating - b.rating;
            default:
                return new Date(b.date) - new Date(a.date);
        }
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-md p-2"
                >
                    <option value="recent">Most Recent</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                </select>
            </div>

            <div className="space-y-6">
                {sortedReviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                        <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${
                                            i < review.rating
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                                {new Date(review.date).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-800">{review.comment}</p>
                        {review.image && (
                            <div className="mt-4">
                                <Image
                                    src={review.image}
                                    alt="Review"
                                    width={200}
                                    height={200}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-medium">Write a Review</h4>
                <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                            key={rating}
                            type="button"
                            onClick={() =>
                                setNewReview({ ...newReview, rating })
                            }
                            className={`p-2 ${
                                newReview.rating >= rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }`}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                    }
                    placeholder="Share your thoughts..."
                    className="w-full p-2 border rounded-md"
                    rows="4"
                />
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="review-image"
                    />
                    <label
                        htmlFor="review-image"
                        className="inline-block bg-gray-200 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                    >
                        Add Image
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default function ProductDetails() {
    const router = useRouter();
    const { id } = router.query;
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");
    const [product, setProduct] = useState(
        productsData.find((p) => p.id === id)
    );

    const handleBuyNow = () => {
        addToCart(product, quantity);
        router.push("/cart");
    };

    if (!product) return <div>Product not found</div>;

    return (
        <Layout>
            <SectionContainer className="footer--container wrap wrap-px relative z-10 pt-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Images */}
                        <ImageGallery images={product.images} />

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {product.title}
                                </h1>
                                <div className="mt-2 flex items-center">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i < product.rating
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-600">
                                        ({product.reviews.length} reviews)
                                    </span>
                                </div>
                            </div>

                            <div className="text-2xl font-bold text-gray-900">
                                ${product.price.toFixed(2)}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">
                                        Package Size
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4 mt-2">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() =>
                                                    setSelectedSize(size)
                                                }
                                                className={`border rounded-md py-2 text-sm font-medium ${
                                                    selectedSize === size
                                                        ? "border-green-500 text-green-600"
                                                        : "border-gray-300 text-gray-900 hover:bg-gray-50"
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-900">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(
                                                parseInt(e.target.value)
                                            )
                                        }
                                        className="mt-1 w-20 border rounded-md p-2"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => addToCart(product, quantity)}
                                    className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
                                >
                                    Buy Now
                                </button>
                            </div>

                            <div className="prose prose-sm mt-4">
                                <h3>Product Description</h3>
                                <p>{product.description}</p>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="text-sm font-medium text-gray-900">
                                    Specifications
                                </h3>
                                <dl className="mt-2 divide-y divide-gray-200">
                                    {Object.entries(product.specifications).map(
                                        ([key, value]) => (
                                            <div
                                                key={key}
                                                className="flex justify-between py-2"
                                            >
                                                <dt className="text-sm text-gray-600">
                                                    {key}
                                                </dt>
                                                <dd className="text-sm font-medium text-gray-900">
                                                    {value}
                                                </dd>
                                            </div>
                                        )
                                    )}
                                </dl>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-16">
                        <ReviewSection
                            reviews={product.reviews}
                            onAddReview={(review) => {
                                const newReview = {
                                    ...review,
                                    id: Date.now(),
                                    date: new Date().toISOString()
                                };
                                setProduct({
                                    ...product,
                                    reviews: [...product.reviews, newReview]
                                });
                            }}
                        />
                    </div>
                </div>
            </SectionContainer>
        </Layout>
    );
}
