'use server'

import { ReadingStateData } from '@/components/homepage/types';
import axiosServer from '@/lib/axios.server'


export async function getLastAccessedReading(): Promise<ReadingStateData> {
  try {
    const response = await axiosServer.get('/api/v1/reading-state/last-accessed');
    return response.data;
  } catch (error) {
    console.error('Error fetching last accessed reading state:', error);
    return {
      success: false,
      data: [],
      error: 'Failed to fetch reading state'
    };
  }
}
