/**
 * Utility functions for calling progression API endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface ProgressionResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

/**
 * Award points for reading a section
 */
export async function awardSectionPoints(
  sectionId: string,
  moduleDifficulty: 'Easy' | 'Intermediate' | 'Advanced'
): Promise<ProgressionResponse> {
  try {
    console.log('Calling points award API:', { sectionId, moduleDifficulty });
    const response = await fetch(`/api/v1/progression/award-points/section`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sectionId,
        moduleDifficulty
      })
    });

    console.log('Points API response status:', response.status);
    
    if (!response.ok) {
      console.error('Points API failed with status:', response.status);
      const errorText = await response.text();
      console.error('Points API error response:', errorText);
      return {
        success: false,
        error: `Failed to award points (${response.status})`
      };
    }

    const result = await response.json();
    console.log('Points API success result:', result);
    return result;
  } catch (error) {
    console.error('Error awarding section points:', error);
    return {
      success: false,
      error: 'Failed to award section points'
    };
  }
}

/**
 * Award points for quiz attempt
 */
export async function awardQuizPoints(
  quizId: string,
  moduleDifficulty: 'Easy' | 'Intermediate' | 'Advanced',
  score: number,
  maxScore: number,
  attemptNumber: number,
  isFirstAttempt: boolean
): Promise<ProgressionResponse> {
  try {
    const response = await fetch(`/api/v1/progression/award-points/quiz`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizId,
        moduleDifficulty,
        score,
        maxScore,
        attemptNumber,
        isFirstAttempt
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error awarding quiz points:', error);
    return {
      success: false,
      error: 'Failed to award quiz points'
    };
  }
}

/**
 * Award points for final quiz attempt
 */
export async function awardFinalQuizPoints(
  finalQuizId: string,
  score: number,
  maxScore: number,
  isFirstAttempt: boolean,
  difficulty: 'easy' | 'intermediate' | 'advanced' = 'intermediate'
): Promise<ProgressionResponse> {
  try {
    const response = await fetch(`/api/v1/progression/award-points/final-quiz`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        finalQuizId,
        score,
        maxScore,
        isFirstAttempt,
        difficulty
      })
    });

    const result = await response.json();    return result;
  } catch (error) {
    console.error('Error awarding final quiz points:', error);
    return {
      success: false,
      error: 'Failed to award final quiz points'
    };
  }
}

/**
 * Check quiz attempt status (for warnings)
 */
export async function checkQuizAttemptStatus(
  source: 'module_quiz' | 'final_quiz' | 'section_read',
  sourceId: string
): Promise<ProgressionResponse> {
  try {
    const response = await fetch(`/api/v1/progression/quiz-attempt-status/${source}/${sourceId}`, {
      credentials: 'include'
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error checking quiz attempt status:', error);
    return {
      success: false,
      error: 'Failed to check quiz attempt status'
    };
  }
}

// Legacy XP functions for backward compatibility (they now award points)
export const awardSectionXP = awardSectionPoints;
export const awardQuizRewards = awardQuizPoints;
export const awardFinalQuizRewards = awardFinalQuizPoints;

/**
 * Get user progression data
 */
export async function getUserProgression(): Promise<ProgressionResponse> {
  try {
    const response = await fetch(`/api/v1/progression/me`, {
      credentials: 'include'
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching user progression:', error);
    return {
      success: false,
      error: 'Failed to fetch user progression'
    };
  }
}
