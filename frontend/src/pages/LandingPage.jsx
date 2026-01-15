import { Link } from 'react-router-dom';
import { Lightbulb, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

const LandingPage = () => {
  return (
    <section className="grid lg:grid-cols-2 gap-10 items-center mt-10">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">IdeaForge</p>
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-ink">
          Convert your skills into local-ready business ideas
        </h1>
        <p className="text-lg text-muted max-w-xl">
          Built for friends in both cities and villages. Simple questions, ethical AI, practical steps, and the
          option to save ideas when you login. No jargon, no pressure.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/form"
            className="px-6 py-3 rounded-full bg-primary text-white font-semibold shadow-card hover:bg-primary/90"
          >
            Start without login
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-full border border-ink/10 bg-white font-semibold hover:border-primary/40"
          >
            Login to save ideas
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 text-sm text-muted">
          {[{ icon: Lightbulb, text: 'Low-capital ideas' }, { icon: ShieldCheck, text: 'Ethical & safe' }, { icon: BookOpen, text: 'Hindi & English' }].map((item) => (
            <div key={item.text} className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm border border-ink/5">
              <item.icon className="w-5 h-5 text-primary" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted">AI-generated suggestions. Please verify before execution.</p>
      </div>
      <div className="bg-white shadow-card rounded-3xl p-6 border border-ink/5 space-y-4">
        <div className="bg-background rounded-2xl p-4 border border-primary/10 flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-accent mt-1" />
          <div>
            <p className="font-semibold text-ink">“I know tailoring and live in a small town.”</p>
            <p className="text-muted text-sm">IdeaForge suggests 3-5 ideas with steps and local twists.</p>
          </div>
        </div>
        <ul className="space-y-2 text-sm text-ink">
          <li className="flex gap-2"><span className="text-primary">•</span> Simple form with skills, location, budget</li>
          <li className="flex gap-2"><span className="text-primary">•</span> Hindi/English toggle for comfort</li>
          <li className="flex gap-2"><span className="text-primary">•</span> Save and revisit when logged in</li>
          <li className="flex gap-2"><span className="text-primary">•</span> Lightweight business plan on demand</li>
        </ul>
      </div>
    </section>
  );
};

export default LandingPage;
