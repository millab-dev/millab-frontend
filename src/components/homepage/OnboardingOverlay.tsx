import { useEffect } from "react";
import BottomNavbar from "../core/BottomNavbar";
import BottomSheetSection from "./BottomSheetSection";
import InformationSection from "./InformationSection";
import { useNextStep } from "nextstepjs";
import { HomepageModulesData } from "./types";
import { UserData } from "./types";
import { ReadingStateData } from "./types";
import { TTSContextType } from "./index";
import cloud from "@/assets/cloudPattern.svg";

interface HomepageContentProps {
    readingStateData: ReadingStateData;
    homepageModulesData: HomepageModulesData;
    userData: UserData;
    lang?: 'id' | 'en';
    ttsContext: TTSContextType;
}

const HomepageContent = ({ readingStateData, homepageModulesData, userData, lang, ttsContext }: HomepageContentProps) => {

    const { startNextStep } = useNextStep();

    useEffect(() => {
        const completedTour = localStorage.getItem("completedTour");
        const testOnboarding = localStorage.getItem("testOnboarding");

        if (completedTour && testOnboarding) {
            startNextStep("mainTour");
        } else if (!completedTour) {
            startNextStep("mainTour");
        }
    }, [startNextStep]);

    return (
        <>
            <div className="flex flex-col min-h-screen bg-background relative overflow-x-hidden">
                {/* Mobile background */}
                <div
                    className="fixed inset-0 z-0 bg-primary md:hidden bg-repeat bg-[length:600px] lg:bg-[length:1536px]"
                    style={{
                        backgroundImage: `url(${cloud.src})`,
                    }}
                />

                {/* Desktop background with scaling options */}
                <div className="fixed inset-0 z-0 bg-primary hidden md:block">
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <div
                            className="w-[1536px] h-full mx-auto bg-repeat bg-[length:600px] lg:bg-[length:1536px]"
                            style={{
                                backgroundImage: `url(${cloud.src})`,
                            }}
                        />
                    </div>
                </div>

                {/* Content layout */}
                <div className="relative z-10 w-full">
                    {/* Top section with information */}
                    <div className="h-[14.43rem] md:h-[16.43rem] w-full">
                        <div className="h-full flex items-center">
                            <InformationSection language={lang} userData={userData} ttsContext={ttsContext} />
                        </div>
                    </div>

                    {/* Bottom sheet with rounded top corners and animations */}
                    <BottomSheetSection 
                        language={lang}
                        readingStateData={readingStateData}
                        homepageModulesData={homepageModulesData}
                        ttsContext={ttsContext}
                    />
                </div>
            </div>
            <div className="md:hidden">
                <BottomNavbar language={lang} />
            </div>
        </>
    );
};

export default HomepageContent;
