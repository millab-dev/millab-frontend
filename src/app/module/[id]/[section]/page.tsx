import Navbar from "@/components/core/Navbar";
import SectionModule from "@/components/module/sectionModule";
import { getLanguage } from "@/actions/core.get-lang";
import { getProfileData } from "@/actions/profile.get-profile-data";

export default async function page() {
  const language = await getLanguage();
  const profileData = await getProfileData()
  return (
    <>
      <Navbar />
      <SectionModule language={language} isLoggedIn={profileData.success}/>
    </>
  )
}