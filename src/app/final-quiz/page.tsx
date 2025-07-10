import { getUserScore, UserScore } from "@/actions/userScore.get-score";
import { getProfileData } from "@/actions/profile.get-profile-data";
import Navbar from "@/components/core/Navbar";
import FinalQuiz from "@/components/finalquiz/FinalQuiz";
import { Metadata } from "next";
import { User } from "@/types/user";
import { getLanguage } from "@/actions/core.get-lang";

export const metadata: Metadata = {
  title: "Final Quiz - Millab",
  description: "Final Quiz - Millab",
};

export const dynamic = "force-dynamic";

export default async function page() {
  let userScore: UserScore | null = null;
  // Default language to 'id' for now
  const language = await getLanguage();

  try {
    const user: Partial<User> = (await getProfileData()).data as Partial<User>;
    if (user.id) {
      userScore = await getUserScore(user.id as string);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <Navbar />
      <FinalQuiz userScore={userScore as UserScore} language={language} />
    </div>
  )
}