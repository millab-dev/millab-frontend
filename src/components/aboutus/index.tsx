
import BottomSheetSection from "./BottomSheetSection"
import DesktopCardContent from "./DesktopCardContent"
import Navbar from "../core/Navbar"
import { aboutUsTranslations, SectionProps } from "./types"

interface AboutUsProps {
    language?: 'id' | 'en';
}

const AboutUs = ({ language = 'id' }: AboutUsProps) => {
    // Get translations based on language
    const t = aboutUsTranslations[language];
    return (
        <>
            <div className="">
                <Navbar/>
            </div>
            
            <div className="flex flex-col min-h-screen bg-background relative overflow-x-hidden">
                {/* Mobile background */}
                <div className="fixed inset-0 z-0 bg-primary md:hidden"
                    style={{
                        backgroundImage: "url('/batik-bg-4.svg')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "auto auto",
                        backgroundPosition: "top left"
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
                                backgroundPosition: "center"
                            }}
                        />
                    </div>
                </div>
            
                {/* Content layout */}
                <div className="relative z-10 w-full">
                    {/* Top section with heading */}
                    <div className="h-[8rem] w-full">
                        <div className="h-full flex items-center justify-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">{t.pageTitle}</h1>
                        </div>
                    </div>
                    
                    {/* Mobile: Bottom sheet layout */}
                    <div className="md:hidden">
                        <BottomSheetSection language={language} />
                    </div>
                    
                    {/* Desktop: Card layout using DesktopCardContent component */}
                    <div className="hidden md:block max-w-7xl mx-auto px-4 pb-16">
                        <DesktopCardContent language={language} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs