// Define language type
export type Language = 'id' | 'en';

// Define section props with language
export interface SectionProps {
  language?: Language;
}

// Define Quiz translations structure
export type QuizTranslationsType = {
  [key in Language]: {
    loading: string;
    moduleNotFound: string;
    quizNotAvailable: string;
    quizNotActiveTitle: string;
    quizNotActiveMessage: string;
    backToModule: string;
    quizCompleted: string;
    quizCompletedAlready: string;
    scoredPoints: string;
    submitError: string;
    submitErrorGeneric: string;
    fetchError: string;
    fetchErrorGeneric: string;
    pointsAwarded: string;
    finishQuizConfirm: string;
    finishQuizRetake: string;
    finishQuizFirstAttempt: string;
    finishQuizNoPoints: string;
    cancel: string;
    finishQuiz: string;
  };
};

// Define QuizQuestion translations structure
export type QuizQuestionTranslationsType = {
  [key in Language]: {
    question: string;
    of: string;
    checkAnswer: string;
    nextQuestion: string;
    previousQuestion: string;
    finishQuiz: string;
    backToModule: string;
    showNavigation: string;
  };
};

// Define QuizSummary translations structure
export type QuizSummaryTranslationsType = {
  [key in Language]: {
    quizCompleted: string;
    yourScore: string;
    correctAnswers: string;
    of: string;
    percentage: string;
    backToModule: string;
    retakeQuiz: string;
    congratulations: string;
    wellDone: string;
    keepPracticing: string;
    points: string;
    point: string;
    explanation: string;
    goBack: string;
    excellentMessage: string;
    goodMessage: string;
    okayMessage: string;
    needsPracticeMessage: string;
  };
};

// Define QuizNavigation translations structure
export type QuizNavigationTranslationsType = {
  [key in Language]: {
    questionNavigation: string;
    question: string;
    answered: string;
    unanswered: string;
    backToQuiz: string;
  };
};

// Quiz translations
export const quizTranslations: QuizTranslationsType = {  id: {
    loading: "Memuat kuis...",
    moduleNotFound: "Modul tidak ditemukan",
    quizNotAvailable: "Kuis Tidak Tersedia",
    quizNotActiveTitle: "Kuis Tidak Tersedia",
    quizNotActiveMessage: "Kuis ini sedang tidak aktif.",
    backToModule: "Kembali ke Modul",
    quizCompleted: "Kuis selesai! Skor Anda",
    quizCompletedAlready: "Anda sudah menyelesaikan kuis ini!",
    scoredPoints: "Anda mendapatkan",
    submitError: "Gagal mengirim skor kuis",
    submitErrorGeneric: "Gagal mengirim skor kuis",
    fetchError: "Gagal memuat modul",
    fetchErrorGeneric: "Gagal memuat modul",
    pointsAwarded: "poin!",
    finishQuizConfirm: "Selesaikan Kuis?",
    finishQuizRetake: "Ulangi Kuis?",
    finishQuizFirstAttempt: "n pertama Anda. Anda akan mendapat poin berdasarkan skor Anda.",
    finishQuizNoPoints: "Anda sudah menyelesaikan kuis ini. Tidak ada poin yang akan diperoleh untuk percobaan ini.",
    cancel: "Batal",
    finishQuiz: "Selesaikan Kuis"
  },
  en: {
    loading: "Loading quiz...",
    moduleNotFound: "Module not found",
    quizNotAvailable: "Quiz Not Available",
    quizNotActiveTitle: "Quiz Not Available",
    quizNotActiveMessage: "This quiz is currently not active.",
    backToModule: "Back to Module",
    quizCompleted: "Quiz completed! You scored",
    quizCompletedAlready: "You have already completed this quiz!",
    scoredPoints: "You earned",
    submitError: "Failed to submit quiz score",
    submitErrorGeneric: "Failed to submit quiz score",
    fetchError: "Failed to fetch module",
    fetchErrorGeneric: "Failed to fetch module",
    pointsAwarded: "points!",
    finishQuizConfirm: "Finish Quiz?",
    finishQuizRetake: "Retake Quiz?",
    finishQuizFirstAttempt: "This is your first attempt. You will earn points based on your score.",
    finishQuizNoPoints: "You have already completed this quiz. No points will be earned for this attempt.",
    cancel: "Cancel",
    finishQuiz: "Finish Quiz"
  }
};

// QuizQuestion translations
export const quizQuestionTranslations: QuizQuestionTranslationsType = {
  id: {
    question: "Pertanyaan",
    of: "dari",
    checkAnswer: "Periksa Jawaban",
    nextQuestion: "Pertanyaan Berikutnya",
    previousQuestion: "Pertanyaan Sebelumnya",
    finishQuiz: "Selesaikan Kuis",
    backToModule: "Kembali ke Modul",
    showNavigation: "Tampilkan Navigasi"
  },
  en: {
    question: "Question",
    of: "of",
    checkAnswer: "Check Answer",
    nextQuestion: "Next Question",
    previousQuestion: "Previous Question",
    finishQuiz: "Finish Quiz",
    backToModule: "Back to Module",
    showNavigation: "Show Navigation"
  }
};

// QuizSummary translations
export const quizSummaryTranslations: QuizSummaryTranslationsType = {  id: {
    quizCompleted: "Kuis Selesai!",
    yourScore: "Skor Anda",
    correctAnswers: "Jawaban Benar",
    of: "dari",
    percentage: "",
    backToModule: "Kembali ke Modul",
    retakeQuiz: "Ulangi Kuis",
    congratulations: "Selamat!",
    wellDone: "Kerja Bagus!",
    keepPracticing: "Terus Berlatih!",
    points: "Poin",
    point: "poin",
    explanation: "Penjelasan",
    goBack: "Kembali",
    excellentMessage: "Kinerja luar biasa! Anda menguasai kuis ini dengan sangat baik!",
    goodMessage: "Kerja bagus! Anda memiliki pemahaman yang baik tentang materi.",
    okayMessage: "Usaha yang baik! Terus berlatih untuk meningkatkan kemampuan Anda.",
    needsPracticeMessage: "Jangan khawatir! Tinjau kembali materi dan coba lagi."
  },  en: {
    quizCompleted: "Quiz Completed!",
    yourScore: "Your Score",
    correctAnswers: "Correct Answers",
    of: "of",
    percentage: "",
    backToModule: "Back to Module",
    retakeQuiz: "Retake Quiz",
    congratulations: "Congratulations!",
    wellDone: "Well Done!",
    keepPracticing: "Keep Practicing!",
    points: "Points",
    point: "point",
    explanation: "Explanation",
    goBack: "Go Back",
    excellentMessage: "Outstanding performance! You handled this quiz like a pro!",
    goodMessage: "Great job! You have a good understanding of the material.",
    okayMessage: "Good effort! Keep practicing to improve your skills.",
    needsPracticeMessage: "Don't worry! Review the material and try again."
  }
};

// QuizNavigation translations
export const quizNavigationTranslations: QuizNavigationTranslationsType = {
  id: {
    questionNavigation: "Navigasi Pertanyaan",
    question: "Pertanyaan",
    answered: "Terjawab",
    unanswered: "Belum Terjawab",
    backToQuiz: "Kembali ke Kuis"
  },
  en: {
    questionNavigation: "Question Navigation",
    question: "Question",
    answered: "Answered",
    unanswered: "Unanswered",
    backToQuiz: "Back to Quiz"
  }
};

// Common interfaces for quiz components
export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestionData {
  id: number;
  question: string;
  options: QuizOption[];
  points: number;
  explanation?: string;
}

export interface QuizAnswer {
  questionId: number;
  selectedOptionId: string;
  isCorrect: boolean;
  points: number;
}

export interface DatabaseQuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options: string[];
  correctAnswer: number;
  explanation?: string;
  order: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
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
  pdfUrl?: string;
  isActive: boolean;
}

export interface ModuleQuiz {
  id: string;
  title: string;
  description: string;
  duration: string;
  totalQuestions: number;
  questions: DatabaseQuizQuestion[];
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

export type QuizView = "question" | "results" | "summary" | "navigation";
