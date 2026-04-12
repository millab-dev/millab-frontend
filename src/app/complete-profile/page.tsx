import CompleteProfileForm from "@/components/auth/completeProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lengkapi Profil | Gemar Board",
  description: "Lengkapi profil pengguna untuk akses penuh ke Gemar Board"
};

export default function CompleteProfilePage() {
  return (
    <main>
      <CompleteProfileForm language="id" />
    </main>
  );
}
