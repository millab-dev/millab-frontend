import Image from "next/image";
import Link from "next/link";
import { SectionProps, footerTranslations } from "./types";

export default function Footer({ language = 'en' }: SectionProps) {
    const t = footerTranslations[language];

    return (
        <footer className="bg-[#0077D4] text-white py-12 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                <div className="border-t border-white/40 mt-3 pt-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo Section */}
                    <div className="flex flex-col items-start">
                        <div className="mb-6">
                            <Image
                                src="/footerLogo/millabfooterlogo.svg"
                                alt={t.altTexts.logo}
                                width={120}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4">
                            <Link
                                href="https://www.instagram.com/millabindonesia/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <Image
                                    src="/footerLogo/logoinstagram.svg"
                                    alt={t.altTexts.instagram}
                                    width={24}
                                    height={24}
                                />
                            </Link>
                            <Link
                                href="https://youtube.com/@millabindonesia?si=RWu4g6hKEB1zU4ec"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <Image
                                    src="/footerLogo/logoyouTube.svg"
                                    alt={t.altTexts.youtube}
                                    width={24}
                                    height={24}
                                />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/company/mil-lab-indonesia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <Image
                                    src="/footerLogo/linkedin.svg"
                                    alt={t.altTexts.linkedin}
                                    width={24}
                                    height={24}
                                />
                            </Link>
                        </div>
                    </div>

                    {/* MilBoard Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t.sections.milboard.title}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/module"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    {t.sections.milboard.links.modules}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/final-quiz"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    {t.sections.milboard.links.finalQuiz}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/scan"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    {t.sections.milboard.links.scanAndRead}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect with Us Section */}
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">
                            {t.sections.connectWithUs.title}
                        </h3>
                        <ul className="grid grid-cols-1 gap-2">
                            <li>
                                <Link
                                    href="mailto:contact@millabindonesia@gmail.com"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    {t.sections.connectWithUs.links.email}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.linkedin.com/company/mil-lab-indonesia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    {t.sections.connectWithUs.links.instagram}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://youtu.be/prUruw1eHbQ?si=Vda7IwvMio8lqf8m"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    {t.sections.connectWithUs.links.youtube}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://linkedin.com/company/millabindonesia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    {t.sections.connectWithUs.links.linkedin}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
