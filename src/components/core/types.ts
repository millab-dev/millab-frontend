// Define SectionProps for language support
export interface SectionProps {
  language?: 'id' | 'en';
}

// Define Navbar translations structure
export type NavbarTranslationsType = {
  [key: string]: {
    navItems: {
      name: string;
      path: string;
    }[];
  };
};

// Define BottomNavbar translations structure
export type BottomNavbarTranslationsType = {
  [key: string]: {
    navItems: {
      name: string;
      path: string;
    }[];
  };
};

// Navbar translations
export const navbarTranslations: NavbarTranslationsType = {
  id: {
    navItems: [
      { name: "Beranda", path: "/app" },
      { name: "Modul", path: "/module" },
      { name: "Kuis Akhir", path: "/final-quiz" },
      { name: "Profil", path: "/profile" },
      { name: "Tentang Kami", path: "/about-us" },
      { name: "Masuk", path: "/signin" },
      { name: "Daftar", path: "/signup" },
    ]
  },
  en: {
    navItems: [
      { name: "Home", path: "/app" },
      { name: "Module", path: "/module" },
      { name: "Final Quiz", path: "/final-quiz" },
      { name: "Profile", path: "/profile" },
      { name: "About Us", path: "/about-us" },
      { name: "Sign In", path: "/signin" },
      { name: "Sign Up", path: "/signup" },
    ]
  }
};

// Bottom Navbar translations
export const bottomNavbarTranslations: BottomNavbarTranslationsType = {
  id: {
    navItems: [
      { name: "Beranda", path: "/app" },
      { name: "Pindai", path: "/scan" },
      { name: "Profil", path: "/profile" },
    ]
  },
  en: {
    navItems: [
      { name: "Home", path: "/app" },
      { name: "Scan", path: "/scan" },
      { name: "Profile", path: "/profile" },
    ]
  }
};
