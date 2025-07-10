// Define language types - using the same type as in auth components
export type Language = 'id' | 'en';

// Define FinalQuiz translations
export interface FinalQuizTranslations {
  readyToPlay: string;
  youveScored: string;
  points: string;
  beatRecord: string;
  howToPlay: string;
  understand: string;
  steps: string[];
  levels: {
    beginner: {
      title: string;
      description: string;
    };
    intermediate: {
      title: string;
      description: string;
    };
    advanced: {
      title: string;
      description: string;
    };
  };
}

// Define QuizNavigation translations
export interface QuizNavigationTranslations {
  listOfQuestions: string;
  answered: string;
  notAnswered: string;
}

// QuizNavigation available translations
export const quizNavigationTranslations: Record<Language, QuizNavigationTranslations> = {
  id: {
    listOfQuestions: 'Daftar Pertanyaan',
    answered: 'Terjawab',
    notAnswered: 'Belum Terjawab'
  },
  en: {
    listOfQuestions: 'List of Questions',
    answered: 'Answered',
    notAnswered: 'Not Answered'
  }
};

// Define QuizSummary translations
export interface QuizSummaryTranslations {
  performanceLevels: {
    expert: string;
    intermediate: string;
    beginner: string;
    needsPractice: string;
  };
  performanceMessages: {
    excellent: string;
    good: string;
    fair: string;
    needsImprovement: string;
  };
  stats: {
    correct: string;
    score: string;
    points: string;
  };
  answerLabels: {
    selectedCorrect: string;
    selectedWrong: string;
    unselected: string;
    correctAnswer: string;
  };
  actions: {
    retakeQuiz: string;
    goBack: string;
  };
  questionResults: string;
}

// Define Quiz Messages translations
export interface QuizMessagesTranslations {
  earnedPoints: string;
  noPointsEarned: string;
  firstAttemptWarning: string;
  retakeWarning: string;
  finishQuizConfirm: string;
  finishQuizRetake: string;
  finishQuizFirstAttempt: string;
  finishQuizNoPoints: string;
  cancel: string;
  finishQuiz: string;
  of: string;
}

// QuizSummary available translations
export const quizSummaryTranslations: Record<Language, QuizSummaryTranslations> = {
  id: {
    performanceLevels: {
      expert: 'Level Mahir',
      intermediate: 'Level Menengah',
      beginner: 'Level Pemula',
      needsPractice: 'Perlu Latihan',
    },
    performanceMessages: {
      excellent: 'Performa luar biasa! Kamu menyelesaikan kuis ini seperti seorang profesional!',
      good: 'Kerja bagus! Kamu memiliki pemahaman yang baik tentang materi.',
      fair: 'Usaha yang baik! Terus berlatih untuk meningkatkan keterampilanmu.',
      needsImprovement: 'Jangan khawatir! Tinjau kembali materi dan coba lagi.',
    },
    stats: {
      correct: 'Benar',
      score: 'Skor',
      points: 'Poin',
    },
    answerLabels: {
      selectedCorrect: 'Jawaban Benar Dipilih',
      selectedWrong: 'Jawaban Salah Dipilih',
      unselected: 'Jawaban Tidak Dipilih',
      correctAnswer: 'Jawaban yang Benar',
    },
    actions: {
      retakeQuiz: 'Coba Lagi Kuis',
      goBack: 'Kembali',
    },
    questionResults: 'Hasil Pertanyaan',
  },
  en: {
    performanceLevels: {
      expert: 'Expert Level',
      intermediate: 'Intermediate Level',
      beginner: 'Beginner Level',
      needsPractice: 'Needs Practice',
    },
    performanceMessages: {
      excellent: 'Outstanding performance! You handled this quiz like a pro!',
      good: 'Great job! You have a good understanding of the material.',
      fair: 'Good effort! Keep practicing to improve your skills.',
      needsImprovement: 'Don\'t worry! Review the material and try again.',
    },
    stats: {
      correct: 'Correct',
      score: 'Score',
      points: 'Points',
    },
    answerLabels: {
      selectedCorrect: 'Selected Correct Answer',
      selectedWrong: 'Selected Wrong Answer',
      unselected: 'Unselected Answer',
      correctAnswer: 'Correct Answer',
    },
    actions: {
      retakeQuiz: 'Retake Quiz',
      goBack: 'Go Back',
    },
    questionResults: 'Question Results',  },
};

// QuizMessages available translations
export const quizMessagesTranslations: Record<Language, QuizMessagesTranslations> = {
  id: {
    earnedPoints: 'Kamu mendapatkan {points} poin!',
    noPointsEarned: 'Kamu sudah mengerjakan kuis ini, tidak ada poin yang diperoleh.',
    firstAttemptWarning: 'Peringatan: Hanya percobaan pertama yang mendapat poin!',
    retakeWarning: 'Ini adalah percobaan ulang. Kamu tidak akan mendapat poin.',
    finishQuizConfirm: 'Selesaikan Kuis?',
    finishQuizRetake: 'Ulangi Kuis?',
    finishQuizFirstAttempt: 'Hanya percobaan pertama Anda yang akan mendapat poin berdasarkan skor Anda.',
    finishQuizNoPoints: 'Anda sudah menyelesaikan kuis ini. Tidak ada poin yang akan diperoleh untuk percobaan ini.',
    cancel: 'Batal',
    finishQuiz: 'Selesaikan Kuis',
    of: 'dari'
  },
  en: {
    earnedPoints: 'You earned {points} points!',
    noPointsEarned: 'You have done the quiz, no points earned.',
    firstAttemptWarning: 'Warning: Only first attempt gets points!',
    retakeWarning: 'This is a retake. You will not earn points.',
    finishQuizConfirm: 'Finish Quiz?',
    finishQuizRetake: 'Retake Quiz?',
    finishQuizFirstAttempt: 'This is your first attempt. You will earn points based on your score.',
    finishQuizNoPoints: 'You have already completed this quiz. No points will be earned for this attempt.',
    cancel: 'Cancel',
    finishQuiz: 'Finish Quiz',
    of: 'of'
  }
};

// Define available translations
export const finalQuizTranslations: Record<Language, FinalQuizTranslations> = {
  id: {
    readyToPlay: 'Siap Bermain?',
    youveScored: 'Kamu telah mendapatkan...',
    points: 'poin',
    beatRecord: 'Bisakah kamu mengalahkan rekormu sendiri?',
    howToPlay: 'Cara Bermain?',
    understand: 'Mengerti!',
    steps: [
      'Ambil kuis dan jawab setiap pertanyaan.',
      'Lihat hasilnya langsung setelah selesai.',
      'Hasilmu akan ditambahkan sebagai poin ke profilmu.',
      'Periksa peringkatmu di papan peringkat dan tantang teman!'
    ],
    levels: {
      beginner: {
        title: 'Pemula',
        description: 'Sempurna untuk pendatang baru! Mulai dengan pertanyaan dasar dan bangun kepercayaan dirimu.'
      },
      intermediate: {
        title: 'Menengah',
        description: 'Siap untuk tantangan? Uji pengetahuanmu dengan pertanyaan dan skenario yang lebih kompleks.'
      },
      advanced: {
        title: 'Mahir',
        description: 'Siap untuk ujian terberat? Dorong pengetahuanmu hingga batas dengan pertanyaan yang paling menantang.'
      }
    }
  },
  en: {
    readyToPlay: 'Ready to Play?',
    youveScored: 'You\'ve scored...',
    points: 'points',
    beatRecord: 'Can you beat your own record?',
    howToPlay: 'How to Play?',
    understand: 'Understand!',
    steps: [
      'Take the quiz and answer each question.',
      'See your results instantly after finishing.',
      'Your results will be added as points to your profile.',
      'Check your rank on the leaderboard and challenge friends!'
    ],
    levels: {
      beginner: {
        title: 'Beginner',
        description: 'Perfect for newcomers! Start with basic questions and build your confidence.'
      },
      intermediate: {
        title: 'Intermediate',
        description: 'Ready for a challenge? Test your knowledge with more complex questions and scenarios.'
      },
      advanced: {
        title: 'Advanced',
        description: 'Ready for the ultimate test? Push your knowledge to the limit with the most challenging questions.'
      }
    }
  }
};
