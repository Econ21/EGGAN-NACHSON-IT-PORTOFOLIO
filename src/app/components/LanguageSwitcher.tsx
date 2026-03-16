import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-[#F5F1E8] rounded-full p-1">
      <button
        onClick={() => setLanguage('id')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          language === 'id'
            ? 'bg-[#C6A75E] text-white shadow-sm'
            : 'text-[#0F3D2E] hover:bg-white/50'
        }`}
      >
        <span className="text-base">🇮🇩</span>
        <span>ID</span>
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-[#C6A75E] text-white shadow-sm'
            : 'text-[#0F3D2E] hover:bg-white/50'
        }`}
      >
        <span className="text-base">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
