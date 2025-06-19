import SignupForm from "@/components/auth/signupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - MILBoard",
  description: "Create a new MILBoard account",
};

export default function SignupPage() {
  return <SignupForm language="id" />;
}