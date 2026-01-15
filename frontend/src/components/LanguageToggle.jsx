import { useSessionStore } from '../store/useSessionStore';

const LanguageToggle = () => {
  const { language, setLanguage } = useSessionStore();
  return (
    <div className="flex items-center rounded-full bg-white border border-slate-200 overflow-hidden shadow-sm">
      {['en', 'hi'].map((lng) => (
        <button
          key={lng}
          onClick={() => setLanguage(lng)}
          className={`px-3 py-1 text-sm font-semibold ${language === lng ? 'bg-primary text-white' : 'text-muted'}`}
        >
          {lng === 'en' ? 'English' : 'हिंदी'}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
