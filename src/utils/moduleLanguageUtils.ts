/**
 * Utility functions for handling module language versions and fallbacks
 */

export interface ModuleLanguageContent {
  title?: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
}

export interface ModuleSectionLanguageContent {
  title?: string;
  titleEn?: string;
  content?: string;
  contentEn?: string;
}

export interface QuizLanguageContent {
  title?: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  question?: string;
  questionEn?: string;
  options?: string[];
  optionsEn?: string[];
  explanation?: string;
  explanationEn?: string;
}

/**
 * Check if English version is available for a module
 */
export const hasEnglishVersion = (module: ModuleLanguageContent): boolean => {
  return !!(module.titleEn && module.descriptionEn);
};

/**
 * Check if English version is available for a module section
 */
export const hasSectionEnglishVersion = (section: ModuleSectionLanguageContent): boolean => {
  return !!(section.titleEn && section.contentEn);
};

/**
 * Check if English version is available for a quiz
 */
export const hasQuizEnglishVersion = (quiz: QuizLanguageContent): boolean => {
  return !!(quiz.titleEn && quiz.descriptionEn);
};

/**
 * Check if English version is available for a quiz question
 */
export const hasQuestionEnglishVersion = (question: QuizLanguageContent): boolean => {
  return !!(question.questionEn && question.optionsEn && question.optionsEn.length > 0);
};

/**
 * Get the appropriate title based on language preference with fallback
 */
export const getModuleTitle = (
  module: ModuleLanguageContent, 
  language: 'id' | 'en' = 'id',
  modulePrefix: string = 'Modul',
  order?: number
): string => {
  const title = language === 'en' && module.titleEn ? module.titleEn : module.title;
  return order ? `${modulePrefix} ${order}: ${title}` : title || '';
};

/**
 * Get the appropriate description based on language preference with fallback
 */
export const getModuleDescription = (
  module: ModuleLanguageContent, 
  language: 'id' | 'en' = 'id'
): string => {
  return language === 'en' && module.descriptionEn ? module.descriptionEn : module.description || '';
};

/**
 * Get the appropriate section title based on language preference with fallback
 */
export const getSectionTitle = (
  section: ModuleSectionLanguageContent, 
  language: 'id' | 'en' = 'id'
): string => {
  return language === 'en' && section.titleEn ? section.titleEn : section.title || '';
};

/**
 * Get the appropriate section content based on language preference with fallback
 */
export const getSectionContent = (
  section: ModuleSectionLanguageContent, 
  language: 'id' | 'en' = 'id'
): string => {
  return language === 'en' && section.contentEn ? section.contentEn : section.content || '';
};

/**
 * Get the appropriate quiz title based on language preference with fallback
 */
export const getQuizTitle = (
  quiz: QuizLanguageContent, 
  language: 'id' | 'en' = 'id'
): string => {
  return language === 'en' && quiz.titleEn ? quiz.titleEn : quiz.title || '';
};

/**
 * Get the appropriate quiz description based on language preference with fallback
 */
export const getQuizDescription = (
  quiz: QuizLanguageContent, 
  language: 'id' | 'en' = 'id'
): string => {
  return language === 'en' && quiz.descriptionEn ? quiz.descriptionEn : quiz.description || '';
};

/**
 * Get the appropriate question text based on language preference with fallback
 */
export const getQuestionText = (
  question: QuizLanguageContent, 
  language: 'id' | 'en' = 'id'
): string => {
  return language === 'en' && question.questionEn ? question.questionEn : question.question || '';
};

/**
 * Get the appropriate question options based on language preference with fallback
 */
export const getQuestionOptions = (
  question: QuizLanguageContent, 
  language: 'id' | 'en' = 'id'
): string[] => {
  return language === 'en' && question.optionsEn && question.optionsEn.length > 0 
    ? question.optionsEn 
    : question.options || [];
};

/**
 * Get the appropriate explanation text based on language preference with fallback
 */
export const getExplanationText = (
  question: QuizLanguageContent, 
  language: 'id' | 'en' = 'id'
): string => {
  return language === 'en' && question.explanationEn ? question.explanationEn : question.explanation || '';
};

/**
 * Get language availability info for a module
 */
export const getModuleLanguageInfo = (module: ModuleLanguageContent) => {
  return {
    hasIndonesian: !!(module.title && module.description),
    hasEnglish: hasEnglishVersion(module),
    isComplete: !!(module.title && module.description && module.titleEn && module.descriptionEn)
  };
};

/**
 * Add language version indicator to module card
 */
export const getLanguageVersionBadge = (
  module: ModuleLanguageContent, 
  currentLanguage: 'id' | 'en' = 'id'
): { available: boolean; fallback: boolean; badge?: string } => {
  const languageInfo = getModuleLanguageInfo(module);
  
  if (currentLanguage === 'en') {
    if (languageInfo.hasEnglish) {
      return { available: true, fallback: false, badge: 'EN' };
    } else if (languageInfo.hasIndonesian) {
      return { available: true, fallback: true, badge: 'ID (Fallback)' };
    } else {
      return { available: false, fallback: false };
    }
  } else {
    if (languageInfo.hasIndonesian) {
      return { available: true, fallback: false, badge: 'ID' };
    } else if (languageInfo.hasEnglish) {
      return { available: true, fallback: true, badge: 'EN (Fallback)' };
    } else {
      return { available: false, fallback: false };
    }
  }
};
