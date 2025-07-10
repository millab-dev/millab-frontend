import ListModule from "@/components/module/listModule";
import Navbar from "@/components/core/Navbar";
import { getLanguage } from "@/actions/core.get-lang";

export default async function page() {
  const language = await getLanguage();
  return (<>
    <Navbar />
    <ListModule language={language} />
  </>)
}