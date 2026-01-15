import { Sparkles, ListChecks, BookmarkPlus } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

const steps = [
  { icon: Sparkles, title: 'Tell us about you', text: 'Share skills, place, and budget. Hindi/English supported.' },
  { icon: ListChecks, title: 'Get local-fit ideas', text: 'AI suggests low-capital ideas tuned for your town or village.' },
  { icon: BookmarkPlus, title: 'Save or print', text: 'Login to save, or share/print plans for offline use.' },
];

const OnboardingModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl shadow-card border border-ink/5 max-w-xl w-full p-6 relative">
        <button className="absolute top-4 right-4 text-muted text-xl" onClick={onClose} aria-label="Close intro">
          ×
        </button>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm uppercase text-primary font-semibold">Welcome</p>
            <h3 className="text-2xl font-bold text-ink">How IdeaForge works in 3 steps</h3>
            <p className="text-sm text-muted">Made for friends in cities and villages. Simple words, clear actions.</p>
          </div>
          <LanguageToggle />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {steps.map((step) => (
            <div key={step.title} className="bg-background rounded-2xl p-4 border border-ink/5 space-y-2">
              <step.icon className="w-6 h-6 text-primary" />
              <p className="font-semibold text-ink">{step.title}</p>
              <p className="text-sm text-muted leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted">
          <span className="px-3 py-2 rounded-full bg-white border border-ink/10">No login needed to start</span>
          <span className="px-3 py-2 rounded-full bg-white border border-ink/10">Ethical, low-capital focus</span>
          <span className="px-3 py-2 rounded-full bg-white border border-ink/10">Hindi / English comfort</span>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-5 py-3 rounded-full bg-primary text-white font-semibold shadow-card">
            Start now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
