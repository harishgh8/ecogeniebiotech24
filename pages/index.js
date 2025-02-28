import { HomeBanner } from "@components/Banner";
import { Card, CardGroup, CardImage } from "@components/Card";
import { Content } from "@components/Content";
import { ContentImage } from "@components/ContentImage";
import { Layout } from "@components/Layout";
import { MotionBTTContainer } from "@components/Motion";
import { SectionContainer } from "@components/Section";
import SEO from "@components/SEO/SEO";
import { PageTitle } from "@components/Title";

export default function Home() {
    return (
        <Layout>
            <SEO
                title="ecogenie biotech"
                description="Innovating greener tomorrow."
            />
            <div className="main-wrapper bg-[#F3F5F8] relative z-10 pb-20 pt-20 ">
                {/* { Page Banner } */}
                <HomeBanner />
                {/* Components Container */}
                <SectionContainer className="components--container wrap wrap-px grid gap-8 sm:gap-24">
                    {/* Why choose us */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer
                            id="features"
                            className="features pt-20 "
                        >
                            <div className="text-center">
                                <PageTitle
                                    className="mx-auto bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% .. inline-block text-transparent bg-clip-text"
                                    type="default"
                                >
                                    Why Chitosan?
                                </PageTitle>
                            </div>

                            <Content className="text-center" alignment="center">
                                <p>
                                    Chitosan, a natural biopolymer derived from
                                    chitin, has emerged as a promising material
                                    for sustainable agriculture and healthcare
                                    applications.
                                </p>
                            </Content>
                            <ContentImage />
                        </SectionContainer>
                    </MotionBTTContainer>

                    {/* Awards and recognitions */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer className="feature-tabs pt-20">
                            <div className="text-center">
                                <PageTitle
                                    className="text-center mx-auto !text-4xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% .. inline-block text-transparent bg-clip-text"
                                    type="heavy"
                                >
                                    Awards and Recognitions
                                </PageTitle>
                            </div>
                            <CardGroup className="grid  gap-8 grid-cols-1 max-w-6xl mx-auto mt-12 md:grid-cols-4">
                                <Card className="col-span-1 text-primary-900">
                                    <CardImage
                                        src="/startupindia.svg"
                                        alt="Customizable Layouts image used."
                                    />
                                </Card>
                                <Card className="col-span-1 text-primary-900">
                                    <CardImage
                                        src="/startupkar.svg"
                                        alt="Customizable Layouts image used."
                                    />
                                </Card>
                                <Card className="col-span-1 text-primary-900 ">
                                    <CardImage
                                        src="/wadwani.svg"
                                        alt="Customizable Layouts image used."
                                    />
                                </Card>
                                <Card className="col-span-1 text-primary-900">
                                    <CardImage
                                        src="/elevate.svg"
                                        alt="Customizable Layouts image used."
                                    />
                                </Card>
                            </CardGroup>
                        </SectionContainer>
                    </MotionBTTContainer>
                    {/* Associations and Collaborations */}
                    <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer className="feature-tabs pt-20">
                            <div className="text-center">
                                <PageTitle className="text-center mx-auto !text-4xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% .. inline-block text-transparent bg-clip-text">
                                    Association and Collaborations
                                </PageTitle>
                            </div>
                            <CardGroup className="grid  gap-8 grid-cols-1 max-w-6xl mx-auto mt-12 md:grid-cols-4 ">
                                <Card className="col-span-1 text-primary-900 bg-white">
                                    <CardImage
                                        src="/1-asso.svg"
                                        alt="Customizable Layouts image used."
                                    />
                                </Card>
                                <Card className="col-span-1 text-primary-900 bg-white">
                                    <CardImage
                                        src="/2-asso.svg"
                                        alt="Customizable Layouts image used."
                                    />
                                </Card>
                                <Card className="col-span-1 text-primary-900 bg-white">
                                    <CardImage
                                        src="/3-asso.svg"
                                        alt="Customizable Layouts image used."
                                    />
                                </Card>
                              
                            </CardGroup>
                        </SectionContainer>
                    </MotionBTTContainer>
                    {/* <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer
                            id="testimonials"
                            className="benefits"
                        >
                            <BadgeGroup alignment="left">
                                <BadgeMessage>Testimonials</BadgeMessage>
                                <BadgeIcon icon="twemoji:waving-hand" />
                            </BadgeGroup>
                            <PageTitle className="" type="default">
                                This is what our successful achievers say about
                                us
                            </PageTitle>
                            <Columns />
                        </SectionContainer>
                    </MotionBTTContainer> */}
                    {/* Accordions */}
                    {/* <MotionBTTContainer
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <SectionContainer id="faq" className="faq">
                            <BadgeGroup alignment="center">
                                <BadgeMessage>FAQ</BadgeMessage>
                            </BadgeGroup>
                            <PageTitle
                                className="text-center mx-auto"
                                type="default"
                            >
                                Got some burning questions about Next Gen NCLEX?{" "}
                                <br></br>
                                <br></br>No worries! We&apos;ve got the answers
                                you need:
                            </PageTitle>
                            <Accordion data={faqData} />
                        </SectionContainer>
                    </MotionBTTContainer> */}
                </SectionContainer>
                {/* <ScrollToTopBtn /> */}
            </div>
        </Layout>
    );
}
