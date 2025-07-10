import { getLanguage } from "@/actions/core.get-lang";
import LoginForm from "@/components/auth/loginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - MILBoard",
  description: "Sign in to your MILBoard account",
};

// Server Component that handles search params
export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Extract error param from searchParams
  const errorParam = searchParams.error ? String(searchParams.error) : null;
  // Provide default language as Indonesian
  const language = await getLanguage();
  return (
    <div>
      <LoginForm errorParam={errorParam} language={language} />
    </div>
  );
}