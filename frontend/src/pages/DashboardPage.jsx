import { useEffect, useState } from 'react';
import { listIdeas, deleteIdea } from '../services/firestore';
import { useSessionStore } from '../store/useSessionStore';
import LoadingOverlay from '../components/LoadingOverlay';

const DashboardPage = () => {
  const { user, setLoading, loading } = useSessionStore();
  const [ideas, setIdeas] = useState([]);
  const grouped = ideas.reduce((acc, idea) => {
    const skill = idea.inputs?.skills?.[0] || idea.generatedIdeas?.[0]?.category || 'Other';
    const budget = idea.inputs?.budget || 'Any budget';
    const key = `${skill} | ${budget}`;
    acc[key] = acc[key] || [];
    acc[key].push(idea);
    return acc;
  }, {});

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      setLoading(true);
      const data = await listIdeas(user.uid);
      setIdeas(data);
      setLoading(false);
    };
    load();
  }, [user, setLoading]);

  const handleDelete = async (id) => {
    await deleteIdea(id);
    setIdeas((prev) => prev.filter((i) => i.id !== id));
  };

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-3xl shadow-card text-center">
        <p className="text-lg text-muted">Login to view and manage saved ideas.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div>
        <p className="text-sm text-muted">Saved ideas for {user.displayName || user.email}</p>
        <h2 className="text-2xl font-bold text-ink">Dashboard</h2>
      </div>
      {ideas.length === 0 ? (
        <p className="text-muted text-sm">No saved ideas yet.</p>
      ) : (
        <div className="space-y-5">
          {Object.entries(grouped).map(([groupKey, list]) => (
            <div key={groupKey} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-ink">{groupKey}</h3>
                <span className="text-xs text-muted">{list.length} saved</span>
              </div>
              <div className="grid gap-3">
                {list.map((idea) => (
                  <div key={idea.id} className="bg-white p-5 rounded-2xl shadow-card border border-ink/5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-muted">{idea.inputs?.location}</p>
                        <h3 className="text-xl font-semibold">{idea.generatedIdeas?.[0]?.title || 'Saved idea'}</h3>
                        <p className="text-muted text-sm mt-1">{idea.generatedIdeas?.[0]?.summary}</p>
                        <p className="text-xs text-muted mt-1">Budget: {idea.inputs?.budget || 'Any'}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(idea.id)}
                        className="text-sm text-red-600 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                    {idea.businessPlan && idea.businessPlan.localization && (
                      <p className="text-sm text-muted mt-2">Plan: {idea.businessPlan.localization}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {loading && <LoadingOverlay message="Loading your saved ideas…" />}
    </div>
  );
};

export default DashboardPage;
