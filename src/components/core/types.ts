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

// Define Footer translations structure
export type FooterTranslationsType = {
  [key: string]: {
    sections: {
      milboard: {
        title: string;
        links: {
          modules: string;
          finalQuiz: string;
          scanAndRead: string;
        };
      };
      connectWithUs: {
        title: string;
        links: {
          email: string;
          instagram: string;
          youtube: string;
          linkedin: string;
        };
      };
    };
    altTexts: {
      logo: string;
      instagram: string;
      youtube: string;
      linkedin: string;
    };
  };
};

// Navbar translations
export const navbarTranslations: NavbarTranslationsType = {
  id: {
    navItems: [
      { name: "Beranda", path: "/" },
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
      { name: "Home", path: "/" },
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
      { name: "Beranda", path: "/" },
      { name: "Pindai", path: "/scan" },
      { name: "Profil", path: "/profile" },
    ]
  },
  en: {
    navItems: [
      { name: "Home", path: "/" },
      { name: "Scan", path: "/scan" },
      { name: "Profile", path: "/profile" },
    ]
  }
};

// Footer translations
export const footerTranslations: FooterTranslationsType = {
  id: {
    sections: {
      milboard: {
        title: "MilBoard",
        links: {
          modules: "Modul",
          finalQuiz: "Kuis Akhir",
          scanAndRead: "Pindai dan Baca"
        }
      },
      connectWithUs: {
        title: "Hubungi Kami",
        links: {
          email: "Email",
          instagram: "Instagram", 
          youtube: "Youtube",
          linkedin: "LinkedIn"
        }
      }
    },
    altTexts: {
      logo: "Logo MilLab",
      instagram: "Instagram",
      youtube: "YouTube", 
      linkedin: "LinkedIn"
    }
  },
  en: {
    sections: {
      milboard: {
        title: "MilBoard",
        links: {
          modules: "Modules",
          finalQuiz: "Final Quiz",
          scanAndRead: "Scan and Read"
        }
      },
      connectWithUs: {
        title: "Connect with Us",
        links: {
          email: "Email",
          instagram: "Instagram",
          youtube: "Youtube", 
          linkedin: "LinkedIn"
        }
      }
    },
    altTexts: {
      logo: "MilLab Logo",
      instagram: "Instagram",
      youtube: "YouTube",
      linkedin: "LinkedIn"
    }
  }
};
