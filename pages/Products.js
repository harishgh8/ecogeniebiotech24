import Link from "next/link";
import Image from "next/image";
import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import { PageTitle } from "@components/Title";
import { MotionBTTContainer } from "@components/Motion";

const productsData = [
    {
        id: "chitin",
        title: "Chitin",
        description:
            "Derived from sustainable silkworm pupae, chitin is a natural biopolymer that stimulates plant growth hormones like auxins and cytokinins, boosting productivity and resilience.",
        image: "/productsData/1.png"
    },
    {
        id: "chitosan",
        title: "Chitosan",
        description:
            "Extracted from eco-friendly silkworm pupae, chitosan improves plant tolerance to environmental stresses, reduces fungal diseases, and enhances drought resistance, promoting sustainable agriculture.",
        image: "/productsData/4.png"
    },
    {
        id: "pupaeOil",
        title: "Pupae Oil",
        description:
            "Sustainably sourced from silkworm pupae, this nutrient-rich oil enhances soil fertility, supports plant growth, and serves as a natural bio-enhancer for eco-conscious farming.",
        image: "/productsData/7.png"
    }
];

export const Products = () => {
    return (
        <Layout>
            <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-20">
                <SectionContainer className="page-banner--container py-16">
                    <SectionContainer className="page-banner--inner-container wrap wrap-px z-10">
                        <MotionBTTContainer
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="text-center">
                                <PageTitle className="text-center mx-auto bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% inline-block text-transparent bg-clip-text">
                                    Products
                                </PageTitle>
                            </div>
                        </MotionBTTContainer>

                        <SectionContainer className="mt-6">
                            {/* Product Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {productsData.map((product) => (
                                    <MotionBTTContainer
                                        key={product.id}
                                        transition={{
                                            delay: 0.5,
                                            duration: 0.5
                                        }}
                                    >
                                        <Link
                                            href={`/products/${product.id}`}
                                            passHref
                                        >
                                            <div className="bg-white rounded-xl shadow-lg p-2 hover:shadow-2xl cursor-pointer">
                                                <div className="overflow-hidden rounded-t-xl group pt-4">
                                                    <Image
                                                        src={product.image}
                                                        width={400}
                                                        height={400}
                                                        objectFit="cover"
                                                        alt={product.title}
                                                        className="transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="text-xl font-semibold text-gray-800 m-1">
                                                        {product.title}
                                                    </h3>
                                                    <p className="text-gray-600 m-0 text-sm p-2">
                                                        {product.description}
                                                    </p>
                                                    <div className="inline-block mt-2 mb-2 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg">
                                                        View Details
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </MotionBTTContainer>
                                ))}
                            </div>
                        </SectionContainer>
                    </SectionContainer>
                </SectionContainer>
            </div>
        </Layout>
    );
};

export default Products;
