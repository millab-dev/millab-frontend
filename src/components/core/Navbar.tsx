import { checkAuthStatus } from "@/actions/auth.check-auth-status";
import { getLanguage } from "@/actions/core.get-lang";
import NavbarClient from "./NavbarClient";

async function Navbar() {
  const isLoggedIn = await checkAuthStatus();
  const lang = await getLanguage();
  
  return <NavbarClient isLoggedIn={isLoggedIn} lang={lang} />;
}

export default Navbar;