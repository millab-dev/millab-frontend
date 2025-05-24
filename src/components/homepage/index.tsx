import Navbar from "../core/Navbar"
import InformationSection from "./InformationSection"
import BottomSheetSection from "./BottomSheetSection"
import BottomNavbar from "../core/BottomNavbar"

const Homepage = () => {
    return (
        <>
            
            <div className="hidden md:block">
                <Navbar/>
            </div>
            
            <div className="flex flex-col min-h-screen bg-background relative">
                {/* Mobile background */}
                <div className="absolute inset-0 bg-primary md:hidden z-0">
                    <img src="/cloud-group.svg" 
                         className="w-full object-contain h-auto max-h-[16rem] mt-8 scale-[120%]" 
                         alt="Cloud background"/>
                </div>
                
                {/* Desktop background */}
                <div className="fixed inset-0 bg-primary hidden md:block z-0"
                    style={{
                        backgroundImage: "url('/cloud-background.svg')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "auto auto",
                        backgroundPosition: "top center"
                    }}
                />
            
                {/* Content layout */}
                <div className="relative z-10 w-full">
                    {/* Top section with information */}
                    <div className="h-[14.43rem] md:h-[16.43rem] w-full">
                        <div className="h-full flex items-center">
                            <InformationSection/>
                        </div>
                    </div>
                    
                    {/* Bottom sheet with rounded top corners and animations */}
                    <BottomSheetSection />
                </div>
            </div>
            <div className="md:hidden">
            <BottomNavbar/>
            </div>
        </>
    )
}

export default Homepage