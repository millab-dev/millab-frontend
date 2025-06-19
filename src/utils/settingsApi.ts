/**
 * Utility functions for app settings API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface AppSettingsResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Get download all PDF URL
 */
export async function getDownloadAllPdfUrl(): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/settings/download-all-pdf-url`, {
      credentials: 'include',
    });

    const result: AppSettingsResponse = await response.json();
    
    if (result.success && result.data?.downloadAllPdfUrl) {
      return result.data.downloadAllPdfUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching download all PDF URL:', error);
    return null;
  }
}

/**
 * Download all PDF if URL is available
 */
export async function downloadAllPdf(): Promise<boolean> {
  try {
    const pdfUrl = await getDownloadAllPdfUrl();
    
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error downloading all PDF:', error);
    return false;
  }
}
