import { Layout } from "@components/Layout";
import { SectionContainer } from "@components/Section";
import { BadgeMessage, BadgeGroup, BadgeIcon } from "@components/Badge";

import Link from "next/link";
import Image from "next/image";
import { MotionBTTContainer } from "@components/Motion";
import { PageTitle } from "@components/Title";
import { Content } from "@components/Content";
import {
    CardBody,
    CardGroup,
    CardHeader,
    CardImage,
    Card
} from "@components/Card";
export default function About() {
    // Example blog posts data

    return (
        <Layout className="">
            <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-20 ">
                <SectionContainer className="page-banner--container py-16">
                    <SectionContainer className="page-banner--inner-container wrap wrap-px z-10">
                        <MotionBTTContainer
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="text-center">
                                <PageTitle
                                    className="text-center mx-auto bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% .. inline-block text-transparent bg-clip-text"
                                    type="heavy"
                                >
                                    About us
                                </PageTitle>
                            </div>
                        </MotionBTTContainer>
                        {/* Appear Third */}
                        <MotionBTTContainer
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                           <Content className="text-left !text-lg" alignment="center">
    <p>
        <strong>Company Profile: Ecogenie Biotech</strong>
    </p>

    <p>
        Ecogenie Biotech is a Bengaluru-based biotechnology pioneer dedicated
        to transforming silkworm pupae—a nutrient-dense byproduct of the silk
        industry—into high-value, sustainable biomaterials. By applying
        advanced extraction and hydrolysis technologies, we harness the power
        of the circular economy to deliver eco-friendly solutions for the
        global market.
    </p>

    <p>
        <strong>Our Core Innovation: The “Super-Protein”</strong>
    </p>

    <p>
        While Soy Protein has long been the global standard for nutrition,
        Ecogenie Biotech is introducing a superior alternative: Silkworm
        Pupae Protein.
    </p>

    <p>
        Our pupae protein delivers a complete animal-derived amino acid
        profile, naturally rich in Lysine and Methionine—the two most critical
        limiting amino acids in poultry and aquaculture feeds. Unlike soy,
        silkworm protein is a novel, hypoallergenic ingredient, making it an
        ideal solution for premium pet food markets in Canada and the
        European Union.
    </p>

    <p>
        <strong>Our Diverse Product Ecosystem</strong>
    </p>

    <p>
        We utilize every component of the silkworm pupa to ensure zero-waste
        production:
    </p>

    <p>
        <strong>Pupal Protein Hydrolysates &amp; Defatted Meal:</strong>
        High-performance proteins for specialized animal nutrition,
        aquaculture, and poultry starter feeds.
    </p>

    <p>
        <strong>Chitosan &amp; Derivatives:</strong>
        Bio-active polymers for healthcare (including wound care dressings),
        food preservation, agriculture, and high-end cosmetics.
    </p>

    <p>
        <strong>Pupal Oil:</strong>
        A rich source of Alpha-Linolenic Acid (Omega-3) supporting skin and
        coat health in pets, as well as select industrial applications.
    </p>

    <p>
        <strong>Sustainability &amp; Global Impact</strong>
    </p>

    <p>
        Sustainability is a shared responsibility. By upcycling silkworm
        waste, Ecogenie Biotech provides a viable alternative to soy-driven
        deforestation and overexploited marine resources.
    </p>

    <p>
        We are committed to empowering farmers through innovative circular
        technologies while supplying standardized, technical-grade
        ingredients to global manufacturers. From Canadian pet food
        co-packers seeking sustainable novel proteins to medical device
        companies requiring high-purity chitosan, Ecogenie Biotech delivers
        cutting-edge quality with a positive environmental footprint.
    </p>
</Content>

                        </MotionBTTContainer>
                    </SectionContainer>
                </SectionContainer>
            </div>
        </Layout>
    );
}
