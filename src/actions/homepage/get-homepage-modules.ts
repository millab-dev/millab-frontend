'use server'

import { HomepageModulesData } from '@/components/homepage/types';
import axiosServer from '@/lib/axios.server'



export async function getHomepageModules(): Promise<HomepageModulesData> {
  try {
    const response = await axiosServer.get('/api/v1/modules/homepage');
    return response.data;
  } catch (error) {
    console.error('Error fetching homepage modules:', error);
    return {
      success: false,
      data: [],
      error: 'Failed to fetch homepage modules'
    };
  }
}
