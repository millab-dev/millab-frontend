// Define module category type
export type ModuleCategory = 'beginner' | 'intermediate' | 'advanced';

// Define translations dictionary structure
export type TranslationsType = {
  [key: string]: {
    title: string;
    seeAll: string;
    searchPlaceholder?: string; // Optional - only used in DiscoverSection
    notFound?: string; // For displaying when no modules match the search
    tryAnotherKeyword?: string; // Message shown when search returns no results
    resetButton?: string; // Text for the reset button
    categories: {
      [key in ModuleCategory]: string;
    };
  };
};

// Define Guidelines translations structure
export type GuidelinesTranslationsType = {
  [key: string]: {
    title: string;
    items: {
      website: string;
      offlineProduct: string;
    };
  };
};

// Define FinalTest translations structure
export type FinalTestTranslationsType = {
  [key: string]: {
    title: string;
    readyText: string;
    seeMoreText: string;
  };
};

// Define FeaturedImage translations structure
export type FeaturedImageTranslationsType = {
  [key: string]: {
    title: string;
    descriptionMobile: string[];
    descriptionDesktop: string[];
  };
};

// Define Onboarding translations structure
export type OnboardingTranslationsType = {
  [key: string]: {
    tour: {
      title: string;
      content: string;
      skip: string;
      next: string;
      prev: string;
      skipTour: string;
      of: string;
    };
    steps: {
      streakProgress: {
        title: string;
        content: string;
      };
      fyi: {
        title: string;
        content: string;
      };
      discover: {
        title: string;
        content: string;
      };
      moduleList: {
        title: string;
        content: string;
      };
      continueReading: {
        title: string;
        content: string;
      };
      finalQuiz: {
        title: string;
        content: string;
      };
      guideWebsite: {
        title: string;
        content: string;
      };
      guideOffline: {
        title: string;
        content: string;
      };
    };
  };
};

// Define onboarding translations
export const onboardingTranslations: OnboardingTranslationsType = {
  id: {
    tour: {
      title: "Tour MILBoard",
      content: "Mari kita jelajahi fitur-fitur MILBoard bersama!",
      skip: "Lewati",
      next: "Lanjut",
      prev: "Kembali",
      skipTour: "Lewati Tour",
      of: "dari"
    },
    steps: {
      streakProgress: {
        title: "Semakin aktif, semakin tinggi levelmu!",
        content: "Kumpulkan XP dari membaca modul dan menjawab kuis untuk naik level"
      },
      fyi: {
        title: "Belajar sambil seru-seruan!",
        content: "Temukan fakta menarik dan inspiratif seputar literasi media & digital setiap kali kamu membuka aplikasi."
      },
      discover: {
        title: "Mulai belajar dari dasar",
        content: "Temukan berbagai modul belajar berdasarkan level (Beginner, Intermediate, Advance) yang dirancang untuk membantumu belajar secara bertahap."
      },
      moduleList: {
        title: "Lihat semua modul",
        content: "Akses daftar lengkap modul yang tersedia dan pilih topik yang paling kamu minati."
      },
      continueReading: {
        title: "Lanjutkan belajarmu",
        content: "Temukan modul-modul yang sudah kamu mulai dan lanjutkan belajarmu dari sini."
      },
      finalQuiz: {
        title: "Siap uji kemampuanmu?",
        content: "Setelah menyelesaikan modul, ikuti kuis akhir untuk mengukur pemahamanmu dan kumpulkan poin tambahan."
      },
      guideWebsite: {
        title: "Panduan penggunaan versi web",
        content: "Pelajari cara menggunakan MilBoard dari situs web dengan mudah dan efektif."
      },
      guideOffline: {
        title: "Gunakan MilBoard secara offline",
        content: "Ikuti petunjuk penggunaan untuk produk offline seperti board game atau modul cetak agar pengalaman belajarmu tetap maksimal meski tanpa internet."
      }
    }
  },
  en: {
    tour: {
      title: "MILBoard Tour",
      content: "Let's explore MILBoard features together!",
      skip: "Skip",
      next: "Next",
      prev: "Previous",
      skipTour: "Skip Tour",
      of: "of"
    },
    steps: {
      streakProgress: {
        title: "The more active, the higher your level!",
        content: "Collect XP from reading modules and answering quizzes to level up"
      },
      fyi: {
        title: "Learn while having fun!",
        content: "Discover interesting and inspiring facts about media & digital literacy every time you open the app."
      },
      discover: {
        title: "Start learning from the basics",
        content: "Find various learning modules based on levels (Beginner, Intermediate, Advanced) designed to help you learn gradually."
      },
      moduleList: {
        title: "View all modules",
        content: "Access the complete list of available modules and choose your favorite topics."
      },
      continueReading: {
        title: "Continue your learning",
        content: "Find the modules you've started and continue your learning from here."
      },
      finalQuiz: {
        title: "Ready to test your skills?",
        content: "After completing a module, take the final quiz to measure your understanding and collect bonus points."
      },
      guideWebsite: {
        title: "Web version user guide",
        content: "Learn how to use MilBoard from the website easily and effectively."
      },
      guideOffline: {
        title: "Use MilBoard offline",
        content: "Follow the usage instructions for offline products like board games or printed modules to ensure your learning experience remains optimal even without internet."
      }
    }
  }
};

// Define InformationSection translations structure
export type InformationTranslationsType = {
  [key: string]: {
    welcomeBack: string;
    dayStreak: string;
  };
};

// Define Carousel translations structure
export type CarouselTranslationsType = {
  [key: string]: {
    title: string;
    slides: {
      title: string;
      description: string;
    }[];
  };
};

// Define base module type
export interface BaseModule {
  id: string | number;
  title: string;
  progress: number;
  category: ModuleCategory;
}

// Define section props with language
export interface SectionProps {
  language?: 'id' | 'en';
}

// Define i18n translations for both sections
export const discoverTranslations: TranslationsType = {
  id: {
    title: "Temukan Modul Pilihanmu",
    seeAll: "Lihat Semua",
    searchPlaceholder: "Cari modul...",
    notFound: "Tidak ada modul yang ditemukan",
    tryAnotherKeyword: "Coba kata kunci lain atau reset pencarian",
    resetButton: "Reset",
    categories: {
      beginner: "Pemula",
      intermediate: "Menengah",
      advanced: "Sulit"
    }
  },
  en: {
    title: "Discover Modules",
    seeAll: "See All",
    searchPlaceholder: "Search modules...",
    notFound: "No modules found",
    tryAnotherKeyword: "Try another keyword or reset search",
    resetButton: "Reset",
    categories: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced"
    }
  }
};

// Define ContinueReading translations structure
export type ContinueReadingTranslationsType = {
  [key: string]: {
    title: string;
    seeAll: string;
    emptyStateTitle: string;
    emptyStateSubtitle: string;
    tryAnotherKeyword: string;
    resetButton: string;
    categories: {
      [key in ModuleCategory]: string;
    };
    difficulty: {
      Easy: string;
      Intermediate: string;
      Advanced: string;
    };
  };
};

export const continueReadingTranslations: ContinueReadingTranslationsType = {
  id: {
    title: "Lanjutkan Membaca",
    seeAll: "Lihat Semua",
    tryAnotherKeyword: "Coba kata kunci lain atau reset pencarian",
    resetButton: "Reset",
    emptyStateTitle: "Kamu belum mulai baca modul kami",
    emptyStateSubtitle: "Mulai belajar dengan mengeksplorasi modul-modul yang tersedia",
    categories: {
      beginner: "Pemula",
      intermediate: "Menengah",
      advanced: "Sulit"
    },
    difficulty: {
      Easy: "Mudah",
      Intermediate: "Menengah",
      Advanced: "Sulit"
    }
  },
  en: {
    title: "Continue Reading",
    seeAll: "See All",
    tryAnotherKeyword: "Try another keyword or reset search",
    resetButton: "Reset",
    emptyStateTitle: "You haven't started reading our modules yet",
    emptyStateSubtitle: "Start learning by exploring the available modules",
    categories: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced"
    },
    difficulty: {
      Easy: "Easy",
      Intermediate: "Intermediate",
      Advanced: "Advanced"
    }
  }
};

// Guidelines section translations
export const guidelinesTranslations: GuidelinesTranslationsType = {
  id: {
    title: "Panduan MILBoard",
    items: {
      website: "Website",
      offlineProduct: "Produk Offline"
    }
  },
  en: {
    title: "MILBoard Guidelines",
    items: {
      website: "Website",
      offlineProduct: "Offline Product"
    }
  }
};

// Final Test section translations
export const finalTestTranslations: FinalTestTranslationsType = {
  id: {
    title: "Kuis Akhir",
    readyText: "Siap menguji kemampuanmu?",
    seeMoreText: "Lihat selengkapnya →"
  },
  en: {
    title: "Final Quiz",
    readyText: "Ready to test your skills?",
    seeMoreText: "See more →"
  }
};

// InformationSection translations
export const informationTranslations: InformationTranslationsType = {
  id: {
    welcomeBack: "Selamat datang kembali,",
    dayStreak: "Streak Harian"
  },
  en: {
    welcomeBack: "Welcome back,",
    dayStreak: "Day Streak"
  }
};

// FeaturedImage section translations
export const featuredImageTranslations: FeaturedImageTranslationsType = {
  id: {
    title: "Tahukah Kamu?",
    descriptionMobile: ["Konsep LMI", "diadopsi UNESCO", "sejak tahun 2008"],
    descriptionDesktop: ["Konsep LMI diadopsi UNESCO", "sejak tahun 2008"]
  },
  en: {
    title: "Did You Know?",
    descriptionMobile: ["LMI was adopted by UNESCO", "since 2008"],
    descriptionDesktop: ["LMI was adopted by UNESCO", "since 2008"]
  }
};

// Carousel section translations with sample slides
export const carouselTranslations: CarouselTranslationsType = {
  id: {
    title: "Testimoni",
    slides: [
      {
        title: "Anisa - Guru SMA",
        description: "MILBoard sangat membantu saya dalam mengajarkan literasi media kepada siswa dengan cara yang interaktif dan menarik."
      },
      {
        title: "Budi - Mahasiswa",
        description: "Saya belajar banyak tentang cara memverifikasi informasi dan mengenali berita palsu. Materinya sangat relevan dengan kondisi saat ini."
      },
      {
        title: "Citra - Aktivis Media",
        description: "Platform yang luar biasa untuk meningkatkan kesadaran literasi media. Modulnya komprehensif dan mudah dipahami."
      }
    ]
  },
  en: {
    title: "Testimonials",
    slides: [
      {
        title: "Anisa - High School Teacher",
        description: "MILBoard has been incredibly helpful in teaching media literacy to my students in an interactive and engaging way."
      },
      {
        title: "Budi - College Student",
        description: "I learned a lot about how to verify information and recognize fake news. The material is very relevant to current conditions."
      },
      {
        title: "Citra - Media Activist",
        description: "An amazing platform for raising media literacy awareness. The modules are comprehensive and easy to understand."
      }
    ]
  }
};

export type Module = BaseModule & {
  description?: string;
  sections?: any[];
  quiz?: any;
};

export interface BackendModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  order: number;
  sections: any[];
  quiz: any;
  isActive: boolean;
  progress?: {
    completionPercentage: number;
  };
}

export interface HomepageModulesData {
  success: boolean;
  data: BackendModule[];
  error?: string;
}

export interface ReadingStateData {
  success: boolean;
  data: {
    module: BackendModule;
  }[];
  error?: string;
}

export interface UserProgression {
  currentPoints: number;
  level: number;
  levelTitle: string;
  pointsForNextLevel: number;
  totalPointsForNextLevel: number;
  dayStreak: number;
  progressPercentage: number;
  rank: number;
}

export interface User {
  name: string;
  username: string;
  // other user fields that might be present
}

export interface UserData {
  user: User | null;
  progression: UserProgression | null;
}