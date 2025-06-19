import LoginForm from "@/components/auth/loginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - MILBoard",
  description: "Sign in to your MILBoard account",
};

// Server Component that handles search params
export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Extract error param from searchParams
  const errorParam = searchParams.error ? String(searchParams.error) : null;
  // Provide default language as Indonesian
  const language = 'id';
  return (
    <div>
      <LoginForm errorParam={errorParam} language={language} />
    </div>
  );
}