/**
 * Utility functions for calling progression API endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface ProgressionResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

/**
 * Award XP for reading a section
 */
export async function awardSectionXP(
  sectionId: string,
  moduleDifficulty: 'Easy' | 'Intermediate' | 'Advanced'
): Promise<ProgressionResponse> {
  try {
    console.log('Calling XP award API:', { sectionId, moduleDifficulty });
    const response = await fetch(`${API_BASE_URL}/api/v1/progression/award-exp/section`, {
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

    console.log('XP API response status:', response.status);
    
    if (!response.ok) {
      console.error('XP API failed with status:', response.status);
      const errorText = await response.text();
      console.error('XP API error response:', errorText);
      return {
        success: false,
        error: `Failed to award XP (${response.status})`
      };
    }

    const result = await response.json();
    console.log('XP API success result:', result);
    return result;
  } catch (error) {
    console.error('Error awarding section XP:', error);
    return {
      success: false,
      error: 'Failed to award section XP'
    };
  }
}

/**
 * Award XP and points for quiz attempt
 */
export async function awardQuizRewards(
  quizId: string,
  moduleDifficulty: 'Easy' | 'Intermediate' | 'Advanced',
  score: number,
  maxScore: number,
  attemptNumber: number,
  isFirstAttempt: boolean
): Promise<ProgressionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/progression/award-exp/quiz`, {
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
    console.error('Error awarding quiz rewards:', error);
    return {
      success: false,
      error: 'Failed to award quiz rewards'
    };
  }
}

/**
 * Award XP and points for final quiz attempt
 */
export async function awardFinalQuizRewards(
  finalQuizId: string,
  score: number,
  maxScore: number,
  isFirstAttempt: boolean
): Promise<ProgressionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/progression/award-exp/final-quiz`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        finalQuizId,
        score,
        maxScore,
        isFirstAttempt
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error awarding final quiz rewards:', error);
    return {
      success: false,
      error: 'Failed to award final quiz rewards'
    };
  }
}

/**
 * Get user progression data
 */
export async function getUserProgression(): Promise<ProgressionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/progression/me`, {
      method: 'GET',
      credentials: 'include',
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

/**
 * Get leaderboard data
 */
export async function getLeaderboard(limit: number = 10): Promise<ProgressionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/progression/leaderboard?limit=${limit}`, {
      method: 'GET',
      credentials: 'include',
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return {
      success: false,
      error: 'Failed to fetch leaderboard'
    };
  }
}

/**
 * Show reward notification to user
 */
export function showRewardNotification(message: string) {
  // You can implement a toast notification system here
  // For now, we'll just console.log
  console.log('🎉 Reward:', message);
  
  // You could integrate with a toast library like react-hot-toast
  // or create a custom notification system
}
