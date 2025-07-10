import { getLanguage } from "@/actions/core.get-lang";
import SignupForm from "@/components/auth/signupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - MILBoard",
  description: "Create a new MILBoard account",
};

export default async function SignupPage() {
  const language = await getLanguage();
  return <SignupForm language={language} />;
}