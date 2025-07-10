"use client";

import { NextStep, NextStepProvider, Tour } from "nextstepjs";
import { ReadingStateData, UserData, HomepageModulesData, onboardingTranslations } from "./types";

import HomepageContent from "./OnboardingOverlay";

interface HomepageProps {
  readingStateData: ReadingStateData;
  homepageModulesData: HomepageModulesData;
  userData: UserData;
  lang?: 'id' | 'en';
}

const Homepage = ({ readingStateData, homepageModulesData, userData, lang }: HomepageProps) => {

    const steps: Tour[] = [
        {
            tour: "mainTour",
            steps: [
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.streakProgress.title,
                    content: onboardingTranslations[lang || 'id'].steps.streakProgress.content,
                    selector: "#streak-progress",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.fyi.title,
                    content: onboardingTranslations[lang || 'id'].steps.fyi.content,
                    selector: "#fyi",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.discover.title,
                    content: onboardingTranslations[lang || 'id'].steps.discover.content,
                    selector: "#discover-section",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.moduleList.title,
                    content: onboardingTranslations[lang || 'id'].steps.moduleList.content,
                    selector: "#module-list",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: onboardingTranslations[lang || 'id'].steps.continueReading.title,
                    content: onboardingTranslations[lang || 'id'].steps.continueReading.content,
                    selector: "#continue-reading",
                    side: "bottom",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: "Siap uji kemampuanmu?",
                    content:
                        "Setelah menyelesaikan modul, ikuti kuis akhir untuk mengukur pemahamanmu dan kumpulkan poin tambahan.",
                    selector: "#final-quiz",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: "Panduan penggunaan versi web",
                    content:
                        "Pelajari cara menggunakan MilBoard dari situs web dengan mudah dan efektif.",
                    selector: "#guide-website",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
                {
                    icon: "👋",
                    title: "Gunakan MilBoard secara offline",
                    content:
                        "Ikuti petunjuk penggunaan untuk produk offline seperti board game atau modul cetak agar pengalaman belajarmu tetap maksimal meski tanpa internet.",
                    selector: "#guide-offlineProduct",
                    side: "top",
                    showControls: true,
                    showSkip: true,
                },
            ],
        },
    ];

    return (
        <>
            <NextStepProvider>
                <NextStep steps={steps} onComplete={() => {
                    localStorage.setItem("completedTour", "true");
                }}
                onSkip={() => {
                    localStorage.setItem("completedTour", "true");
                }}>
                
                    <HomepageContent 
                        lang={lang}
                        readingStateData={readingStateData}
                        homepageModulesData={homepageModulesData}
                        userData={userData}
                    />
                </NextStep>
            </NextStepProvider>
        </>
    );
};

export default Homepage;
