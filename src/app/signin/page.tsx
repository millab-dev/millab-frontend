import LoginForm from "@/components/auth/loginForm";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}