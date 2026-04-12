import { getLanguage } from "@/actions/core.get-lang";
import LoginForm from "@/components/auth/loginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Gemar Board",
  description: "Sign in to your Gemar Board account",
};

// Server Component that handles search params
export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Extract error param from searchParams
  const errorParam = searchParams.error ? String(searchParams.error) : null;
  const redirectTo = searchParams.redirect? String(searchParams.redirect) : null
  // Provide default language as Indonesian
  const language = await getLanguage();
  return (
    <div>
      <LoginForm errorParam={errorParam} redirectTo={redirectTo} language={language} />
    </div>
  );
}