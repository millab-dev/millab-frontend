'use client'

import AboutUsNavbar from "./AboutUsNavbar"
import BottomSheetSection from "./BottomSheetSection"
import DesktopCardContent from "./DesktopCardContent"

const AboutUs = () => {
    return (
        <>
            <div className="">
                <AboutUsNavbar/>
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
                            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">About Us</h1>
                        </div>
                    </div>
                    
                    {/* Mobile: Bottom sheet layout */}
                    <div className="md:hidden">
                        <BottomSheetSection />
                    </div>
                    
                    {/* Desktop: Card layout using DesktopCardContent component */}
                    <div className="hidden md:block max-w-7xl mx-auto px-4 pb-16">
                        <DesktopCardContent />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs