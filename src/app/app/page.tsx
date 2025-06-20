import Navbar from "@/components/core/Navbar";
import Homepage from "@/components/homepage";
import { getLastAccessedReading } from "@/actions/homepage/get-reading-state";
import { getHomepageModules } from "@/actions/homepage/get-homepage-modules";
import { getUserData } from "@/actions/homepage/get-user-data";

export default async function Page() {
    // Call all server actions in parallel for better performance
    const [readingStateData, homepageModulesData, userData] = await Promise.all([
        getLastAccessedReading(),
        getHomepageModules(),
        getUserData()
    ]);
    
    return (
        <>
            <div className="hidden md:block">
                <Navbar />
            </div>
            <Homepage 
                readingStateData={readingStateData}
                homepageModulesData={homepageModulesData}
                userData={userData}
            />
        </>
    );
}
