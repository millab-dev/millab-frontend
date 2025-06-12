// Define module category type
export type ModuleCategory = 'beginner' | 'intermediate' | 'advanced';

// Define translations dictionary structure
export type TranslationsType = {
  [key: string]: {
    title: string;
    seeAll: string;
    searchPlaceholder?: string; // Optional - only used in DiscoverSection
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

// Define InformationSection translations structure
export type InformationTranslationsType = {
  [key: string]: {
    welcomeBack: string;
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
  id: number;
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
    categories: {
      beginner: "Pemula",
      intermediate: "Menengah",
      advanced: "Lanjutan"
    }
  },
  en: {
    title: "Discover Modules",
    seeAll: "See All",
    searchPlaceholder: "Search modules...",
    categories: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced"
    }
  }
};

export const continueReadingTranslations: TranslationsType = {
  id: {
    title: "Lanjutkan Membaca",
    seeAll: "Lihat Semua",
    categories: {
      beginner: "Pemula",
      intermediate: "Menengah",
      advanced: "Lanjutan"
    }
  },
  en: {
    title: "Continue Reading",
    seeAll: "See All",
    categories: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced"
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
    welcomeBack: "Selamat datang kembali,"
  },
  en: {
    welcomeBack: "Welcome back,"
  }
};

// FeaturedImage section translations
export const featuredImageTranslations: FeaturedImageTranslationsType = {
  id: {
    title: "Tahukah Kamu?",
    descriptionMobile: ["MIL ditemukan", "pada tahun 1990"],
    descriptionDesktop: ["MIL ditemukan pada 1990", "oleh John Doe"]
  },
  en: {
    title: "Did You Know?",
    descriptionMobile: ["MIL was founded", "in 1990"],
    descriptionDesktop: ["MIL was founded in 1990", "by John Doe"]
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
