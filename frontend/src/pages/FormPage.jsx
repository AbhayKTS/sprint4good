import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateIdeas } from '../services/api';
import { useSessionStore } from '../store/useSessionStore';
import LoadingOverlay from '../components/LoadingOverlay';

const steps = [
  { key: 'skills', label: 'Skills you have' },
  { key: 'location', label: 'Where you are' },
  { key: 'interests', label: 'What you enjoy' },
  { key: 'budget', label: 'Budget comfort' },
];

const exampleInputs = {
  skills: 'Tailoring, Driving, Cooking, Mobile repair',
  location: 'Varanasi, Uttar Pradesh',
  interests: 'Gardening, Teaching kids, Crafts',
  budget: '₹5,000 – ₹50,000',
};

const FormPage = () => {
  const navigate = useNavigate();
  const { answers, updateAnswers, setGeneratedIdeas, setLoading, loading, setError, language, setLanguage, error } =
    useSessionStore();
  const [activeStep, setActiveStep] = useState(0);
  const [local, setLocal] = useState(answers);

  useEffect(() => {
    setLocal((prev) => ({ ...prev, language }));
  }, [language]);

  const setField = (key, value) => setLocal((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
  setLoading(true);
  setError('Generating ideas…');
    try {
      const payload = {
        ...local,
        skills: local.skills.split(',').map((s) => s.trim()).filter(Boolean),
        interests: local.interests.split(',').map((s) => s.trim()).filter(Boolean),
        language,
      };
      updateAnswers(payload);
      setError('Crafting low-capital ideas for your location…');
      const data = await generateIdeas(payload);
      setGeneratedIdeas(data.ideas || data.generatedIdeas || []);
      navigate('/results');
    } catch (err) {
      console.error(err);
      setError('Could not generate ideas right now. Please try again.');
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  const next = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setActiveStep((s) => Math.max(s - 1, 0));

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-card rounded-3xl border border-ink/5 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-muted">Answer a few prompts</p>
          <h2 className="text-2xl font-bold text-ink">We keep it simple</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted">
          {steps.map((step, idx) => (
            <span
              key={step.key}
              className={`w-8 h-2 rounded-full ${idx <= activeStep ? 'bg-primary' : 'bg-slate-200'}`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeStep === 0 && (
          <div>
            <label className="block text-sm font-semibold text-ink">What skills do you have?</label>
            <p className="text-xs text-muted mb-2">Example: {exampleInputs.skills}</p>
            <input
              required
              value={local.skills}
              onChange={(e) => setField('skills', e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:outline-none"
              placeholder="tailoring, cooking"
            />
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <label className="block text-sm font-semibold text-ink">Where are you based?</label>
            <p className="text-xs text-muted mb-2">Example: {exampleInputs.location}</p>
            <input
              required
              value={local.location}
              onChange={(e) => setField('location', e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:outline-none"
              placeholder="Ajmer, Rajasthan"
            />
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <label className="block text-sm font-semibold text-ink">What do you enjoy doing?</label>
            <p className="text-xs text-muted mb-2">Example: {exampleInputs.interests}</p>
            <input
              value={local.interests}
              onChange={(e) => setField('interests', e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:outline-none"
              placeholder="gardening, teaching kids"
            />
          </div>
        )}

        {activeStep === 3 && (
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-sm font-semibold text-ink">
              Budget comfort (₹)
              <p className="text-xs text-muted">Example: {exampleInputs.budget}</p>
              <input
                value={local.budget}
                onChange={(e) => setField('budget', e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:outline-none"
                placeholder="Low / upto 10k / 25k"
              />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Preferred language
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-primary focus:outline-none bg-white"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </label>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={activeStep === 0}
            className="px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold disabled:opacity-50"
          >
            Back
          </button>
          {activeStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="px-5 py-3 rounded-full bg-primary text-white font-semibold shadow-card"
            >
              Next
            </button>
          ) : (
            <button type="submit" className="px-5 py-3 rounded-full bg-primary text-white font-semibold shadow-card">
              Generate ideas
            </button>
          )}
        </div>
        <p className="text-xs text-muted">AI-generated suggestions. Please verify before execution.</p>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
      {loading && <LoadingOverlay message="Crafting ideas for you…" />}
    </div>
  );
};

export default FormPage;
