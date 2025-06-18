import { useEffect } from "react";
import BottomNavbar from "../core/BottomNavbar";
import BottomSheetSection from "./BottomSheetSection";
import InformationSection from "./InformationSection";
import { useNextStep } from "nextstepjs";


const HomepageContent = () => {

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
                    className="fixed inset-0 z-0 bg-primary md:hidden"
                    style={{
                        backgroundImage: "url('/batik-bg-4.svg')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "auto auto",
                        backgroundPosition: "top left",
                    }}
                />

                {/* Desktop background with scaling options */}
                <div className="fixed inset-0 z-0 bg-primary hidden md:block">
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <div
                            className="w-[1536px] h-full mx-auto"
                            style={{
                                backgroundImage: "url('/batik-bg-4.svg')",
                                backgroundRepeat: "repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    </div>
                </div>

                {/* Content layout */}
                <div className="relative z-10 w-full">
                    {/* Top section with information */}
                    <div className="h-[14.43rem] md:h-[16.43rem] w-full">
                        <div className="h-full flex items-center">
                            <InformationSection />
                        </div>
                    </div>

                    {/* Bottom sheet with rounded top corners and animations */}
                    <BottomSheetSection />
                </div>
            </div>
            <div className="md:hidden">
                <BottomNavbar />
            </div>
        </>
    );
};

export default HomepageContent;
