import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function useLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }

    // Update document direction for RTL support
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('preferred-language', lang);
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = lang;
  };

  return { currentLanguage: i18n.language, changeLanguage };
}