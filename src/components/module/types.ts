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
    aria: {
      moduleMain: string;
      skipToContent: string;
      moduleCard: string;
      downloadModule: string;
      moduleProgress: string;
      moduleListSection: string;
      moduleItem: string;
      moduleTitle: string;
      difficultyBadge: string;
      progressBar: string;
      playTTS: string;
      pauseTTS: string;
      resumeTTS: string;
      stopTTS: string;
      keyboardInstructions: string;
      audioPlaybackError: string;
      browserNotSupported: string;
      navigationInstructions: string;
      downloadAllButton: string;
      noModulesMessage: string;
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
    aria: {
      moduleMain: string;
      skipToContent: string;
      sectionNumber: string;
      playTTS: string;
      pauseTTS: string;
      resumeTTS: string;
      stopTTS: string;
      keyboardInstructions: string;
      contentInstructions: string;
      decorativeIllustration: string;
      navigationMain: string;
      nextSectionButton: string;
      markAsDoneButton: string;
      backToModuleButton: string;
      primaryButtonDesc: string;
      primaryButtonDescNext: string;
      audioPlaybackError: string;
      browserNotSupported: string;
      navigationInstructions: string;
    };
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
    aria: {
      moduleMain: string;
      skipToContent: string;
      moduleCard: string;
      downloadModule: string;
      moduleProgress: string;
      completedSection: string;
      availableSection: string;
      completedQuiz: string;
      availableQuiz: string;
      progressBar: string;
      sectionList: string;
      quizSection: string;
      difficultyBadge: string;
      navigationInstructions: string;
      sectionButton: string;
      quizButton: string;
      moduleInfo: string;
      playTTS: string;
      pauseTTS: string;
      resumeTTS: string;
      stopTTS: string;
      keyboardInstructions: string;
      audioPlaybackError: string;
      browserNotSupported: string;
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
    },
    aria: {
      moduleMain: "Modul pembelajaran",
      skipToContent: "Langsung ke konten",
      moduleCard: "Kartu modul",
      downloadModule: "Unduh modul",
      moduleProgress: "Progress modul",
      moduleListSection: "Daftar bagian modul",
      moduleItem: "Item modul",
      moduleTitle: "Judul modul",
      difficultyBadge: "Lencana kesulitan",
      progressBar: "Bar progress",
      playTTS: "Mulai membaca konten",
      pauseTTS: "Jeda membaca",
      resumeTTS: "Lanjutkan membaca",
      stopTTS: "Berhenti membaca",
      keyboardInstructions: "Gunakan Alt+P untuk toggle audio, Alt+S untuk stop audio, Alt+M untuk tandai selesai, Alt+N untuk bagian selanjutnya",
      audioPlaybackError: "Gagal memutar audio",
      browserNotSupported: "Browser tidak mendukung text-to-speech",
      navigationInstructions: "Gunakan tombol navigasi untuk berpindah antar bagian",
      downloadAllButton: "Tombol unduh semua",
      noModulesMessage: "Pesan tidak ada modul"
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
    },
    aria: {
      moduleMain: "Learning module",
      skipToContent: "Skip to content",
      moduleCard: "Module card",
      downloadModule: "Download module",
      moduleProgress: "Module progress",
      moduleListSection: "Module list section",
      moduleItem: "Module item",
      moduleTitle: "Module title",
      difficultyBadge: "Difficulty badge",
      progressBar: "Progress bar",
      playTTS: "Start reading content",
      pauseTTS: "Pause reading",
      resumeTTS: "Resume reading",
      stopTTS: "Stop reading",
      keyboardInstructions: "Use Alt+P to toggle audio, Alt+S to stop audio, Alt+M to mark as done, Alt+N for next section",
      audioPlaybackError: "Failed to play audio",
      browserNotSupported: "Browser does not support text-to-speech",
      navigationInstructions: "Use navigation buttons to move between sections",
      downloadAllButton: "Download all button",
      noModulesMessage: "No modules message"
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
    fetchModuleErrorGeneric: "Gagal memuat modul",
    aria: {
      moduleMain: "Modul pembelajaran",
      skipToContent: "Langsung ke konten",
      sectionNumber: "Bagian nomor",
      playTTS: "Mulai membaca konten",
      pauseTTS: "Jeda membaca",
      resumeTTS: "Lanjutkan membaca",
      stopTTS: "Berhenti membaca",
      keyboardInstructions: "Gunakan Alt+P untuk toggle audio, Alt+S untuk stop audio, Alt+M untuk tandai selesai, Alt+N untuk bagian selanjutnya",
      contentInstructions: "Konten pembelajaran dapat dibaca menggunakan tombol baca di atas atau dengan menekan Alt+P",
      decorativeIllustration: "Ilustrasi dekoratif dengan karakter burung hantu dalam berbagai pose",
      navigationMain: "Navigasi pembelajaran",
      nextSectionButton: "Lanjut ke bagian selanjutnya (Alt+N)",
      markAsDoneButton: "Tandai bagian ini sebagai selesai (Alt+M)",
      backToModuleButton: "Kembali ke halaman modul",
      primaryButtonDesc: "Tombol untuk menandai bagian pembelajaran ini sebagai telah diselesaikan",
      primaryButtonDescNext: "Tombol untuk melanjutkan ke bagian pembelajaran selanjutnya",
      audioPlaybackError: "Gagal memutar audio",
      browserNotSupported: "Browser tidak mendukung text-to-speech",
      navigationInstructions: "Gunakan tombol navigasi untuk berpindah antar bagian"
    }
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
    fetchModuleErrorGeneric: "Failed to fetch module",
    aria: {
      moduleMain: "Learning module",
      skipToContent: "Skip to content",
      sectionNumber: "Section number",
      playTTS: "Start reading content",
      pauseTTS: "Pause reading",
      resumeTTS: "Resume reading",
      stopTTS: "Stop reading",
      keyboardInstructions: "Use Alt+P to toggle audio, Alt+S to stop audio, Alt+M to mark as done, Alt+N for next section",
      contentInstructions: "Learning content can be read using the read button above or by pressing Alt+P",
      decorativeIllustration: "Decorative illustration with owl characters in various poses",
      navigationMain: "Learning navigation",
      nextSectionButton: "Go to next section (Alt+N)",
      markAsDoneButton: "Mark this section as completed (Alt+M)",
      backToModuleButton: "Back to module page",
      primaryButtonDesc: "Button to mark this learning section as completed",
      primaryButtonDescNext: "Button to continue to the next learning section",
      audioPlaybackError: "Failed to play audio",
      browserNotSupported: "Browser does not support text-to-speech",
      navigationInstructions: "Use navigation buttons to move between sections"
    }
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
    },
    aria: {
      moduleMain: "Modul pembelajaran",
      skipToContent: "Langsung ke konten",
      moduleCard: "Kartu modul",
      downloadModule: "Unduh modul",
      moduleProgress: "Progress modul",
      completedSection: "Bagian selesai",
      availableSection: "Bagian tersedia",
      completedQuiz: "Kuis selesai",
      availableQuiz: "Kuis tersedia",
      progressBar: "Bar progress",
      sectionList: "Daftar bagian",
      quizSection: "Bagian kuis",
      difficultyBadge: "Lencana kesulitan",
      navigationInstructions: "Gunakan tombol navigasi untuk berpindah antar bagian",
      sectionButton: "Tombol bagian",
      quizButton: "Tombol kuis",
      moduleInfo: "Informasi modul",
      playTTS: "Mulai membaca konten",
      pauseTTS: "Jeda membaca",
      resumeTTS: "Lanjutkan membaca",
      stopTTS: "Berhenti membaca",
      keyboardInstructions: "Gunakan Alt+P untuk toggle audio, Alt+S untuk stop audio, Alt+M untuk tandai selesai, Alt+N untuk bagian selanjutnya",
      audioPlaybackError: "Gagal memutar audio",
      browserNotSupported: "Browser tidak mendukung text-to-speech"
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
    },
    aria: {
      moduleMain: "Learning module",
      skipToContent: "Skip to content",
      moduleCard: "Module card",
      downloadModule: "Download module",
      moduleProgress: "Module progress",
      completedSection: "Completed section",
      availableSection: "Available section",
      completedQuiz: "Completed quiz",
      availableQuiz: "Available quiz",
      progressBar: "Progress bar",
      sectionList: "Section list",
      quizSection: "Quiz section",
      difficultyBadge: "Difficulty badge",
      navigationInstructions: "Use navigation buttons to move between sections",
      sectionButton: "Section button",
      quizButton: "Quiz button",
      moduleInfo: "Module info",
      playTTS: "Start reading content",
      pauseTTS: "Pause reading",
      resumeTTS: "Resume reading",
      stopTTS: "Stop reading",
      keyboardInstructions: "Use Alt+P to toggle audio, Alt+S to stop audio, Alt+M to mark as done, Alt+N for next section",
      audioPlaybackError: "Failed to play audio",
      browserNotSupported: "Browser does not support text-to-speech"
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
