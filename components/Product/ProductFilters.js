import { useState } from "react";

export const ProductFilters = ({ onFilterChange }) => {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState("");

    const categories = [
        "Enzymes",
        "Chemicals",
        "Lab Equipment",
        "Culture Media",
        "Reagents"
    ];

    const handlePriceChange = (e, index) => {
        const newRange = [...priceRange];
        newRange[index] = parseInt(e.target.value);
        setPriceRange(newRange);
        onFilterChange({
            priceRange: newRange,
            categories: selectedCategories,
            minRating,
            sortBy
        });
    };

    const handleCategoryChange = (category) => {
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];
        setSelectedCategories(newCategories);
        onFilterChange({
            priceRange,
            categories: newCategories,
            minRating,
            sortBy
        });
    };

    const handleRatingChange = (rating) => {
        setMinRating(rating);
        onFilterChange({
            priceRange,
            categories: selectedCategories,
            minRating: rating,
            sortBy
        });
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        onFilterChange({
            priceRange,
            categories: selectedCategories,
            minRating,
            sortBy: value
        });
    };

    return (
        <div className="space-y-6 bg-green-50 rounded-lg p-4">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Filters
                </h3>

                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                            Price Range
                        </h4>
                        <div className="flex items-center space-x-4">
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceChange(e, 0)}
                                className="w-24 px-2 py-1 border rounded"
                                min="0"
                            />
                            <span>to</span>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(e, 1)}
                                className="w-24 px-2 py-1 border rounded"
                                min="0"
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                            Categories
                        </h4>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <label
                                    key={category}
                                    className="flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(
                                            category
                                        )}
                                        onChange={() =>
                                            handleCategoryChange(category)
                                        }
                                        className="rounded text-green-600 focus:ring-green-500"
                                    />
                                    <span className="ml-2">{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-small text-gray-700 mb-2">
                            Minimum Rating
                        </h4>
                        <div className="flex items-center space-x-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => handleRatingChange(rating)}
                                    className={`p-2 rounded ${
                                        minRating === rating
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                >
                                    {rating}★
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">
                            Sort By
                        </h4>
                        <select
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Default</option>
                            <option value="price_asc">
                                Price: Low to High
                            </option>
                            <option value="price_desc">
                                Price: High to Low
                            </option>
                            <option value="rating">Best Rated</option>
                            <option value="reviews">Most Reviewed</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};
