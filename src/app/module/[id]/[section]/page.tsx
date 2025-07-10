import Navbar from "@/components/core/Navbar";
import SectionModule from "@/components/module/sectionModule";
import { getLanguage } from "@/actions/core.get-lang";

export default async function page() {
  const language = await getLanguage();
  return (
    <>
      <Navbar />
      <SectionModule language={language} />
    </>
  )
}