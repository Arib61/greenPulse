import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: t('languages.english') },
    { code: 'fr', name: t('languages.french') },
    { code: 'ar', name: t('languages.arabic') },
  ];

  return (
    <div className="flex items-center space-x-2" dir="ltr">
      <Globe className="w-5 h-5 text-gray-600" />
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-gray-600 hover:text-gray-800 focus:outline-none rtl:text-right"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}