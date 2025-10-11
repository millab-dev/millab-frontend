import { useState, useEffect } from 'react';

interface GuidelinesUrls {
  website: string;
  offlineProduct: string;
  videoTutorial: string;
}

export const useGuidelinesUrls = (language: 'id' | 'en' = 'id') => {
  const [urls, setUrls] = useState<GuidelinesUrls | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuidelinesUrls = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `/api/v1/settings/guidelines-urls?lang=${language}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success && data.data) {
          setUrls(data.data);
        } else {
          // If API fails, use default values
          const defaultUrls = {
            id: {
              website: "https://drive.google.com/file/d/17pMw11sbHFbNbcTq0r62T8UHFWIyv39R/view?usp=drive_link",
              offlineProduct: "https://drive.google.com/file/d/1A0aDpKVLRZu6GnwtEaMJLSq3rs_Y5_ty/view?usp=drive_link",
              videoTutorial: "https://youtu.be/YahkSAMCGdk?si=CjpLMBRQ_E1fYf3P"
            },
            en: {
              website: "https://drive.google.com/file/d/18_DiyKxtolJS9LQ8ZyWMta6xQNrReuwY/view?usp=sharing",
              offlineProduct: "https://drive.google.com/file/d/1OYL-dCW1yrOLgwZNtFy6o2L5LjhldLlx/view?usp=sharing",
              videoTutorial: "https://youtu.be/YahkSAMCGdk?si=CjpLMBRQ_E1fYf3P"
            }
          };
          
          setUrls(language === 'en' ? defaultUrls.en : defaultUrls.id);
        }
      } catch (err) {
        console.error('Error fetching guidelines URLs:', err);
        setError('Failed to fetch guidelines URLs');
        
        // Use default values on error
        const defaultUrls = {
          id: {
            website: "https://drive.google.com/file/d/17pMw11sbHFbNbcTq0r62T8UHFWIyv39R/view?usp=drive_link",
            offlineProduct: "https://drive.google.com/file/d/1A0aDpKVLRZu6GnwtEaMJLSq3rs_Y5_ty/view?usp=drive_link",
            videoTutorial: "https://youtu.be/YahkSAMCGdk?si=CjpLMBRQ_E1fYf3P"
          },
          en: {
            website: "https://drive.google.com/file/d/18_DiyKxtolJS9LQ8ZyWMta6xQNrReuwY/view?usp=sharing",
            offlineProduct: "https://drive.google.com/file/d/1OYL-dCW1yrOLgwZNtFy6o2L5LjhldLlx/view?usp=sharing",
            videoTutorial: "https://youtu.be/YahkSAMCGdk?si=CjpLMBRQ_E1fYf3P"
          }
        };
        
        setUrls(language === 'en' ? defaultUrls.en : defaultUrls.id);
      } finally {
        setLoading(false);
      }
    };

    fetchGuidelinesUrls();
  }, [language]);

  return { urls, loading, error };
};