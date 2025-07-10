import { headers } from "next/headers";

export const getLanguage = async () => {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const cookies = headersList.get('cookie') || '';
    
    const protocol = (host.includes('localhost') || host.includes('127.0.0.1')) 
      ? 'http' 
      : 'https';
    
    const response = await fetch(`${protocol}://${host}/api/language/get`, {
      headers: {
        'Cookie': cookies,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch language');
    }
    
    const data = await response.json();
    return data.language;
  } catch (error) {
    console.error('Error fetching language:', error);
    return 'en'; // fallback to default
  }
};