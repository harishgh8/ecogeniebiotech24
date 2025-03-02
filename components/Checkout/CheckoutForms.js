import { useState } from "react";
import { FaUser, FaTruck, FaCreditCard, FaCheck } from "react-icons/fa";
import { ProgressIndicator } from "./CheckoutSteps";

const shippingMethods = [
    {
        id: "standard",
        name: "Standard Shipping",
        time: "3-5 business days",
        price: 0
    },
    {
        id: "express",
        name: "Express Shipping",
        time: "1-2 business days",
        price: 10
    }
];

export const CheckoutForms = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        shippingMethod: "standard",
        discount: 0
    });

    const [errors, setErrors] = useState({});
    const [currentSection, setCurrentSection] = useState("userDetails");

    const validateForm = () => {
        const newErrors = {};

        // Personal Details validation
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Invalid email format";
        if (!formData.phone) newErrors.phone = "Phone is required";
        else if (!/^\d{10}$/.test(formData.phone))
            newErrors.phone = "Phone must be 10 digits";

        // Shipping validation
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.pincode) newErrors.pincode = "PIN code is required";
        else if (!/^\d{6}$/.test(formData.pincode))
            newErrors.pincode = "PIN code must be 6 digits";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);

        if (validateForm()) {
            console.log("Form validation passed, submitting...");
            try {
                await onSubmit(formData);
            } catch (error) {
                console.error("Error submitting form:", error);
                setErrors((prev) => ({
                    ...prev,
                    submit: "Failed to process payment. Please try again."
                }));
            }
        } else {
            console.log("Form validation failed", errors);
            const errorKeys = Object.keys(errors);
            if (errorKeys.length > 0) {
                const firstError = errorKeys[0];
                if (firstError.match(/address|city|state|pincode|shipping/i)) {
                    setCurrentSection("shipping");
                } else {
                    setCurrentSection("userDetails");
                }
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field if it exists
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: null
            }));
        }

        // Update current section based on field name
        if (name.match(/firstName|lastName|email|phone/i)) {
            setCurrentSection("userDetails");
        } else if (name.match(/address|city|state|pincode|shipping/i)) {
            setCurrentSection("shipping");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <ProgressIndicator currentSection={currentSection} />
            </div>
            <div className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {errors.submit && (
                        <div
                            className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline">
                                {" "}
                                {errors.submit}
                            </span>
                        </div>
                    )}

                    {/* Personal Details Section */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-6">
                            Personal Details
                        </h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`mt-1 block w-full rounded-md shadow-sm
                                            ${
                                                errors.firstName
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }
                                            focus:border-green-500 focus:ring-green-500`}
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`mt-1 block w-full rounded-md shadow-sm
                                            ${
                                                errors.lastName
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }
                                            focus:border-green-500 focus:ring-green-500`}
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm
                                        ${
                                            errors.email
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }
                                        focus:border-green-500 focus:ring-green-500`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm
                                        ${
                                            errors.phone
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }
                                        focus:border-green-500 focus:ring-green-500`}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Shipping Section */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-6">
                            Shipping Details
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm
                                        ${
                                            errors.address
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }
                                        focus:border-green-500 focus:ring-green-500`}
                                />
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.address}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`mt-1 block w-full rounded-md shadow-sm
                                            ${
                                                errors.city
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }
                                            focus:border-green-500 focus:ring-green-500`}
                                    />
                                    {errors.city && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.city}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className={`mt-1 block w-full rounded-md shadow-sm
                                            ${
                                                errors.state
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }
                                            focus:border-green-500 focus:ring-green-500`}
                                    />
                                    {errors.state && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.state}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        PIN Code
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className={`mt-1 block w-full rounded-md shadow-sm
                                            ${
                                                errors.pincode
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }
                                            focus:border-green-500 focus:ring-green-500`}
                                    />
                                    {errors.pincode && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.pincode}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Shipping Method
                                </h3>
                                <div className="space-y-4">
                                    {shippingMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className="flex items-center"
                                        >
                                            <input
                                                type="radio"
                                                id={method.id}
                                                name="shippingMethod"
                                                value={method.id}
                                                checked={
                                                    formData.shippingMethod ===
                                                    method.id
                                                }
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                            />
                                            <label
                                                htmlFor={method.id}
                                                className="ml-3 flex justify-between w-full"
                                            >
                                                <div>
                                                    <span className="block text-sm font-medium text-gray-900">
                                                        {method.name}
                                                    </span>
                                                    <span className="block text-sm text-gray-500">
                                                        {method.time}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {method.price === 0
                                                        ? "Free"
                                                        : `$${method.price}`}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                                px-6 py-3 bg-green-600 text-white font-semibold rounded-md
                                hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                disabled:opacity-50 disabled:cursor-not-allowed
                            `}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                "Proceed to Pay"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
