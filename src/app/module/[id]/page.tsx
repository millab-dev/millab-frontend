import Navbar from "@/components/core/Navbar";
import DetailModule from "@/components/module/detailModule";
import { getLanguage } from "@/actions/core.get-lang";

export default async function page() {
  const language = await getLanguage();
  return (
    <>
      <Navbar />
      <DetailModule language={language} />
    </>
  )
}