import { FaUser, FaTruck, FaCreditCard } from 'react-icons/fa';

export const ProgressIndicator = ({ currentSection }) => {
    const sections = [
        { id: "userDetails", icon: FaUser, title: "Personal Details" },
        { id: "shipping", icon: FaTruck, title: "Shipping" },
        { id: "payment", icon: FaCreditCard, title: "Payment" }
    ];

    return (
        <div className="flex justify-between items-center mb-8">
            {sections.map((section, index) => {
                const Icon = section.icon;
                const isActive = currentSection === section.id;
                const isPassed = sections.findIndex(s => s.id === currentSection) > index;

                return (
                    <div key={section.id} className="flex items-center">
                        <div className="flex flex-col items-center">
                            <div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center
                                    ${isActive || isPassed ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}
                                `}
                            >
                                <Icon className="w-5 h-5" />
                            </div>
                            <span
                                className={`
                                    mt-2 text-sm font-medium
                                    ${isActive || isPassed ? 'text-gray-900' : 'text-gray-500'}
                                `}
                            >
                                {section.title}
                            </span>
                        </div>
                        {index < sections.length - 1 && (
                            <div
                                className={`
                                    h-0.5 w-24 mx-4
                                    ${isPassed ? 'bg-green-600' : 'bg-gray-200'}
                                `}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
