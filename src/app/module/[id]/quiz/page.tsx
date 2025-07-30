import Quiz from "@/components/quiz/Quiz";
import Navbar from "@/components/core/Navbar";
import { getLanguage } from "@/actions/core.get-lang";
import { getProfileData } from "@/actions/profile.get-profile-data";

export default async function page() {
  const language = await getLanguage();
  const profileData = await getProfileData()
  return (<>
    <Navbar />
    <Quiz language={language} isLoggedIn={profileData.success}/>
    </>
    );
}
