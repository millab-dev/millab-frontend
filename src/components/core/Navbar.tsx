import { SectionProps } from "./types";
import NavbarClient from "./NavbarClient";
import { checkAuthStatus } from "@/actions/auth.check-auth-status";


async function Navbar({ language = 'id' }: SectionProps) {
  
  // Check if user is logged in
  const isLoggedIn = await checkAuthStatus();

  // Render the client-side component with isLoggedIn status and language
  // Let the client component handle which nav items to display based on login status
  return <NavbarClient isLoggedIn={isLoggedIn} language={language} />;
}

export default Navbar;