'use server'

import { UserData } from '@/components/homepage/types';
import axiosServer from '@/lib/axios.server'



export async function getUserData(): Promise<UserData> {
  const result: UserData = {
    user: null,
    progression: null
  };

  try {
    // Fetch user progression data
    const progressionResponse = await axiosServer.get('/api/v1/progression/me');
    if (progressionResponse.data.success) {
      result.progression = progressionResponse.data.data;
    }
  } catch (error) {
    console.error('Error fetching user progression:', error);
  }

  try {
    // Fetch user profile data
    const userResponse = await axiosServer.get('/api/v1/auth/me');
    if (userResponse.data.success) {
      result.user = userResponse.data.data;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }

  return result;
}
