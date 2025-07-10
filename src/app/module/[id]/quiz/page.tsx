import Quiz from "@/components/quiz/Quiz";
import Navbar from "@/components/core/Navbar";
import { getLanguage } from "@/actions/core.get-lang";

export default async function page() {
  const language = await getLanguage();
  return (<>
    <Navbar />
    <Quiz language={language} />
    </>
    );
}
