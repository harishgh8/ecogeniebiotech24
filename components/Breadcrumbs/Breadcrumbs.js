import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';

const Breadcrumbs = ({ productTitle = '' }) => {
    const router = useRouter();
    const { pathname } = router;

    // Define breadcrumb paths and their corresponding labels
    const getBreadcrumbs = () => {
        const basePath = [
            { label: 'Home', path: '/' }
        ];

        if (pathname === '/Products') {
            return [...basePath, { label: 'Products', path: '/Products' }];
        }

        if (pathname === '/products/[id]') {
            return [
                ...basePath,
                { label: 'Products', path: '/Products' },
                { label: productTitle, path: router.asPath }
            ];
        }

        if (pathname === '/cart') {
            return [...basePath, { label: 'Shopping Cart', path: '/cart' }];
        }

        if (pathname === '/checkout') {
            return [
                ...basePath,
                { label: 'Shopping Cart', path: '/cart' },
                { label: 'Checkout', path: '/checkout' }
            ];
        }

        return basePath;
    };

    const breadcrumbs = getBreadcrumbs();

    if (breadcrumbs.length <= 1) return null;

    return (
        <nav aria-label="Breadcrumb" className="w-full bg-gray-50 py-3 px-4 md:px-6">
            <ol className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                {breadcrumbs.map((crumb, index) => (
                    <li key={crumb.path} className="flex items-center">
                        {index > 0 && (
                            <Icon
                                icon="material-symbols:chevron-right"
                                className="mx-2 h-5 w-5 text-gray-400"
                            />
                        )}
                        {index === breadcrumbs.length - 1 ? (
                            <span className="text-green-600 font-semibold">
                                {crumb.label}
                            </span>
                        ) : (
                            <Link
                                href={crumb.path}
                                className="hover:text-green-600 transition-colors duration-200"
                            >
                                {crumb.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
