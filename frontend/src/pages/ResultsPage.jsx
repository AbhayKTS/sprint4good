import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IdeaCard from '../components/IdeaCard';
import LoadingOverlay from '../components/LoadingOverlay';
import { useSessionStore } from '../store/useSessionStore';
import { generatePlan } from '../services/api';
import { saveIdeaDocument } from '../services/firestore';
import { sendFeedback } from '../services/api';
import CommunitySuggestions from '../components/sections/CommunitySuggestions';

const ResultsPage = () => {
  const { generatedIdeas, answers, user, loading, setLoading } = useSessionStore();
  const [localIdeas, setLocalIdeas] = useState(generatedIdeas || []);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (generatedIdeas?.length) {
      localStorage.setItem('ideaforge_last_results', JSON.stringify(generatedIdeas));
    } else {
      const cached = localStorage.getItem('ideaforge_last_results');
      if (cached) {
        setLocalIdeas(JSON.parse(cached));
      }
    }
  }, [generatedIdeas]);

  useEffect(() => {
    setLocalIdeas(generatedIdeas || []);
  }, [generatedIdeas]);

  const handlePlan = async (idea) => {
    setStatus('Crafting a lightweight plan…');
    setLoading(true);
    try {
      const data = await generatePlan({ idea, inputs: answers });
      const updated = localIdeas.map((i) => (i.title === idea.title ? { ...i, plan: data.plan || data } : i));
      setLocalIdeas(updated);
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  const handleSave = async (idea) => {
    if (!user) return;
    await saveIdeaDocument({ userId: user.uid, inputs: answers, generatedIdeas: [idea], businessPlan: idea.plan || {} });
  };

  const handleFeedback = async ({ rating, id }) => {
    await sendFeedback({ ideaId: id || 'local', rating });
  };

  if (!generatedIdeas?.length) {
    return (
      <div className="max-w-3xl mx-auto mt-12 bg-white rounded-3xl shadow-card p-6 text-center">
        <p className="text-lg text-muted">No ideas yet. Fill the form to generate practical ideas.</p>
        <Link
          to="/form"
          className="inline-flex mt-4 px-5 py-3 rounded-full bg-primary text-white font-semibold shadow-card"
        >
          Go to questions
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">Based on your inputs</p>
          <h2 className="text-2xl font-bold text-ink">Here are 3-5 ideas tuned for you</h2>
        </div>
        <Link to="/form" className="px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold">
          Edit answers
        </Link>
      </div>
      <div className="grid gap-4">
        {localIdeas.map((idea, idx) => (
          <div key={idx} className="space-y-2">
            <IdeaCard
              idea={idea}
              onSave={handleSave}
              canSave={!!user}
              onFeedback={handleFeedback}
            />
            {!idea.plan && (
              <button
                onClick={() => handlePlan(idea)}
                className="text-primary text-sm font-semibold"
              >
                Generate lightweight plan
              </button>
            )}
          </div>
        ))}
      </div>
      <CommunitySuggestions location={answers.location} />
      <p className="text-xs text-muted">AI-generated suggestions. Please verify before execution.</p>
      {loading && <LoadingOverlay message={status || 'Sketching a local-fit plan…'} />}
    </div>
  );
};

export default ResultsPage;
