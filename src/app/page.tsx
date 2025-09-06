import Navbar from "@/components/core/Navbar";
import Homepage from "@/components/homepage";
import { getLastAccessedReading } from "@/actions/homepage/get-reading-state";
import { getHomepageModules } from "@/actions/homepage/get-homepage-modules";
import { getUserData } from "@/actions/homepage/get-user-data";
import { getLanguage } from "@/actions/core.get-lang";
import axiosServer from "@/lib/axios.server";
import { UserData, ReadingStateData, HomepageModulesData } from "@/components/homepage/types";

export default async function Page() {

    let response;

    let userData: UserData = {
        user: {
            name: "Guest",
            username: "Guest"
        },
        progression: {
            currentPoints: 0,
            level: 0,
            levelTitle: "Guest",
            pointsForNextLevel: 0,
            totalPointsForNextLevel: 0,
            dayStreak: 0,
            progressPercentage: 0,
            rank: 0
        }
    };
    let readingStateData: ReadingStateData = {
        success: false,
        data: [],
        error: "No reading state data"
    };
    const homepageModulesData: HomepageModulesData = await getHomepageModules();

    try {
        response = await axiosServer.get("/api/v1/auth/me");
        console.log("Auth check status:", response.status);
        
        // If /me is successful, we're authenticated
        if (response.data && response.data.success) {
            console.log("Authentication successful via /me endpoint");

            [userData, readingStateData] = await Promise.all([
                getUserData(),
                getLastAccessedReading(),
            ]);

        } else {
            console.log("/me endpoint indicated auth failure");
        }
    } catch (error) {
        console.error("Auth check error:", error);
    }

    // Call all server actions in parallel for better performance
    const lang = await getLanguage();
    
    return (
        <>
            <div className="hidden md:block">
                <Navbar />
            </div>
            <Homepage 
                readingStateData={readingStateData}
                homepageModulesData={homepageModulesData}
                userData={userData}
                lang={lang}
            />
        </>
    );
}
