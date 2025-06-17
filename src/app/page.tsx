import Navbar from "@/components/core/Navbar";
import Homepage from "@/components/homepage";

export default function page() {
    return (
        <>
            <div className="hidden md:block">
                <Navbar />
            </div>
            <Homepage />
        </>
    );
}
