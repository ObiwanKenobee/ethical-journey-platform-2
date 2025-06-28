
import { useState, useEffect } from 'react';
import { CookieConsentSettings } from '@/components/CookieConsent';

export const useCookieConsent = () => {
  const [consentSettings, setConsentSettings] = useState<CookieConsentSettings | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadConsent = () => {
      try {
        const savedConsent = localStorage.getItem('cookieConsent');
        if (savedConsent) {
          setConsentSettings(JSON.parse(savedConsent));
        }
      } catch (error) {
        console.error('Error loading cookie consent settings:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadConsent();
  }, []);

  const hasConsent = (categoryId: string): boolean => {
    if (!consentSettings) return false;
    return !!consentSettings[categoryId];
  };

  const updateConsent = (newSettings: CookieConsentSettings) => {
    localStorage.setItem('cookieConsent', JSON.stringify(newSettings));
    setConsentSettings(newSettings);
  };

  const resetConsent = () => {
    localStorage.removeItem('cookieConsent');
    setConsentSettings(null);
  };

  return {
    consentSettings,
    isLoaded,
    hasConsent,
    updateConsent,
    resetConsent
  };
};
