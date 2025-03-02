import { SectionContainer } from "@components/Section";
import Link from "next/link";
import Image from "next/image";
import { ButtonGroup, Button } from "@components/Button";
import { Icon } from "@iconify/react";

const DATA = [
    {
        title: "Company",
        items: [
            {
                label: "Facebook",
                href: "https://www.facebook.com/profile.php?id=100091364877101",
                target: "_blank"
            },
            {
                label: "Linkedin",
                href: "https://www.linkedin.com/company/96237286/",
                target: "_blank"
            }
        ]
    }
];

export const Footer = () => {
    const date = new Date();

    return (
        <footer id="footer" className="bg-white">
            {/* Footer Links */}
            <SectionContainer className="footer--container wrap wrap-px relative z-10">
                <div className="footer--content-container py-8 lg:py-12">
                    <div className="footer-links mb-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
                        {/* Logo Section */}
                        <div className="col-span-12 lg:col-span-4">
                            <div className="footer--logo grid gap-4">
                                <Link href="/">
                                    <Image
                                        src="/ecogenie-logo.svg"
                                        alt="logo"
                                        className="h-20 w-auto"
                                        height="25"
                                        width="100"
                                        priority
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Links Section */}
                        <div className="col-span-12 md:col-span-4 lg:col-span-4">
                            <div className="footer-menu grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 text-green-800">
                                {DATA.map((footerLinks) => (
                                    <div
                                        key={footerLinks.title}
                                        className="footer-menu--container col-span-1"
                                    >
                                        <h3 className="font-bold text-base mb-2">
                                            {footerLinks.title}
                                        </h3>
                                        <ul className="footer-menu--list">
                                            {footerLinks.items.map(
                                                (footerItem) => (
                                                    <li
                                                        key={footerItem.label}
                                                        className="footer-menu--list-item gap-2"
                                                    >
                                                        <a
                                                            className="mb-2 block w-auto font-medium transition-colors duration-300 hover:underline"
                                                            href={
                                                                footerItem.href
                                                            }
                                                            target={
                                                                footerItem.target
                                                            }
                                                        >
                                                            {footerItem.label}
                                                        </a>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="col-span-12 md:col-span-4 lg:col-span-4">
                            <div className="flex flex-col">
                                <p className="text-green-800 font-bold px-2 sm:text-left text-lg lg:text-xl">
                                    Contact us
                                </p>
                                <h6 className="sm:text-left text-primary-900 p-2 text-sm lg:text-base">
                                    No. 3, Manjunatha complex,
                                    <br /> 1st floor, SSA Road, 4th Main Road,
                                    Hebbal, Bengaluru - 560024
                                    <br /> Karnataka, India
                                    <br /> info@ecogeniebiotech.com
                                    <br /> +917676733634
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>

            {/* Footer Credits */}
            <SectionContainer className="footer-credits relative z-10">
                <div className="wrap wrap-px py-4">
                    <p className="my-0 text-green-800 text-sm lg:text-base">
                        © 2023 ecogenie biotech. All rights reserved
                    </p>
                </div>
            </SectionContainer>

            <div className="footer--background"></div>
        </footer>
    );
};
