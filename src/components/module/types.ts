// Define module difficulty type
export type ModuleDifficulty = 'Easy' | 'Intermediate' | 'Advanced';

// Define language type
export type Language = 'id' | 'en';

// Define section props with language
export interface SectionProps {
  language?: Language;
}

// Define ListModule translations structure
export type ListModuleTranslationsType = {
  [key in Language]: {
    pageTitle: string;
    moduleCount: string;
    downloadAll: string;
    moduleList: string;
    noModules: string;
    sections: string;
    quiz: string;
    questions: string;
    score: string;
    completed: string;
    noPdfAvailable: string;
    downloadError: string;
    downloadNotConfigured: string;
    fetchError: string;
    difficulty: {
      [key in ModuleDifficulty]: string;
    };
  };
};

// Define SectionModule translations structure
export type SectionModuleTranslationsType = {
  [key in Language]: {
    sectionNotFound: string;
    backToModule: string;
    markAsDone: string;
    nextSection: string;
    loading: string;
    sectionCompleted: string;
    completionError: string;
    pointsAwarded: string;
    pointsError: string;
    fetchModuleError: string;
    fetchModuleErrorGeneric: string;
  };
};

// Define DetailModule translations structure
export type DetailModuleTranslationsType = {
  [key in Language]: {
    moduleNotFound: string;
    startReading: string;
    continueReading: string;
    takeQuiz: string;
    retakeQuiz: string;
    sections: string;
    quiz: string;
    questions: string;
    duration: string;
    completed: string;
    score: string;
    noPdfAvailable: string;
    moduleDescription: string;
    materials: string;
    fetchModuleError: string;
    difficulty: {
      [key in ModuleDifficulty]: string;
    };
  };
};

// ListModule translations
export const listModuleTranslations: ListModuleTranslationsType = {
  id: {
    pageTitle: "Modul Pembelajaran",
    moduleCount: "Modul",
    downloadAll: "Unduh Semua",
    moduleList: "Daftar Modul",
    noModules: "Tidak ada modul yang tersedia saat ini.",
    sections: "bagian",
    quiz: "Kuis",
    questions: "pertanyaan",
    score: "Skor",
    completed: "selesai",
    noPdfAvailable: "Tidak ada PDF yang tersedia untuk modul ini",
    downloadError: "Gagal mengunduh semua modul",
    downloadNotConfigured: "Fitur unduh semua belum dikonfigurasi",
    fetchError: "Failed to fetch modules",
    difficulty: {
      Easy: "Mudah",
      Intermediate: "Menengah",
      Advanced: "Sulit"
    }
  },
  en: {
    pageTitle: "Learning Modules",
    moduleCount: "Modules",
    downloadAll: "Download All",
    moduleList: "Module List",
    noModules: "No modules are currently available.",
    sections: "sections",
    quiz: "Quiz",
    questions: "questions",
    score: "Score",
    completed: "completed",
    noPdfAvailable: "No PDF available for this module",
    downloadError: "Failed to download all modules",
    downloadNotConfigured: "Download all feature is not yet configured",
    fetchError: "Failed to fetch modules",
    difficulty: {
      Easy: "Easy",
      Intermediate: "Intermediate",
      Advanced: "Advanced"
    }
  }
};

// SectionModule translations
export const sectionModuleTranslations: SectionModuleTranslationsType = {
  id: {
    sectionNotFound: "Bagian tidak ditemukan",
    backToModule: "Kembali ke Modul",
    markAsDone: "Tandai Selesai",
    nextSection: "Lanjut",
    loading: "Memuat...",
    sectionCompleted: "Bagian berhasil diselesaikan!",
    completionError: "Gagal menandai bagian sebagai selesai",
    pointsAwarded: "Kamu mendapatkan poin!",
    pointsError: "Bagian selesai, tetapi pemberian poin gagal",
    fetchModuleError: "Gagal memuat modul",
    fetchModuleErrorGeneric: "Gagal memuat modul"
  },
  en: {
    sectionNotFound: "Section not found",
    backToModule: "Back to Module",
    markAsDone: "Mark as Done",
    nextSection: "Next",
    loading: "Loading...",
    sectionCompleted: "Section completed successfully!",
    completionError: "Failed to mark section as completed",
    pointsAwarded: "You earned points!",
    pointsError: "Section completed, but points award failed",
    fetchModuleError: "Failed to fetch module",
    fetchModuleErrorGeneric: "Failed to fetch module"
  }
};

// DetailModule translations
export const detailModuleTranslations: DetailModuleTranslationsType = {
  id: {
    moduleNotFound: "Modul tidak ditemukan",
    startReading: "Mulai Membaca",
    continueReading: "Lanjutkan Membaca",
    takeQuiz: "Ikuti Kuis",
    retakeQuiz: "Ulangi Kuis",
    sections: "bagian",
    quiz: "Kuis",
    questions: "pertanyaan",
    duration: "durasi",
    completed: "selesai",
    score: "Skor",
    noPdfAvailable: "Tidak ada PDF yang tersedia untuk modul ini",
    moduleDescription: "Deskripsi Modul",
    materials: "Materi",
    fetchModuleError: "Gagal memuat modul",
    difficulty: {
      Easy: "Mudah",
      Intermediate: "Menengah",
      Advanced: "Sulit"
    }
  },
  en: {
    moduleNotFound: "Module not found",
    startReading: "Start Reading",
    continueReading: "Continue Reading",
    takeQuiz: "Take Quiz",
    retakeQuiz: "Retake Quiz",
    sections: "sections",
    quiz: "Quiz",
    questions: "questions",
    duration: "duration",
    completed: "completed",
    score: "Score",
    noPdfAvailable: "No PDF available for this module",
    moduleDescription: "Module Description",
    materials: "Materials",
    fetchModuleError: "Failed to fetch module",
    difficulty: {
      Easy: "Easy",
      Intermediate: "Intermediate",
      Advanced: "Advanced"
    }
  }
};

// Common module interfaces
export interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: ModuleDifficulty;
  order: number;
  pdfUrl?: string;
  sections: ModuleSection[];
  quiz: ModuleQuiz;
  isActive: boolean;
  progress?: UserProgress;
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  duration: string;
  order: number;
  isActive: boolean;
}

export interface ModuleQuiz {
  id: string;
  title: string;
  description: string;
  duration: string;
  totalQuestions: number;
  isActive: boolean;
}

export interface UserProgress {
  id: string;
  userId: string;
  moduleId: string;
  completedSections: string[];
  quizCompleted: boolean;
  quizScore?: number;
  quizAttempts: number;
  completionPercentage: number;
  lastAccessedAt: string;
}
