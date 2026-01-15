import { useState } from 'react';

const IdeaCard = ({ idea, onSave, canSave, onFeedback }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-ink/5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted">{idea.category || 'Idea'}</p>
          <h3 className="text-xl font-semibold text-ink">{idea.title}</h3>
          <p className="text-sm text-muted mt-1">{idea.summary}</p>
        </div>
        {canSave && (
          <button
            onClick={() => onSave(idea)}
            className="px-3 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90"
          >
            Save
          </button>
        )}
      </div>
      <div className="mt-3 space-y-2 text-sm text-ink">
        <p><strong>Why it works:</strong> {idea.reasoning}</p>
        <p><strong>Steps:</strong> {idea.steps?.join(' • ')}</p>
      </div>
      {idea.plan && (
        <div className="mt-3">
          <button
            className="text-primary text-sm font-semibold"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? 'Hide plan' : 'View lightweight plan'}
          </button>
          {expanded && (
            <div className="mt-2 text-sm text-muted space-y-1">
              <p><strong>Budget:</strong> {idea.plan.budget}</p>
              <p><strong>Revenue:</strong> {idea.plan.revenueStreams?.join(' / ')}</p>
              <p><strong>Local fit:</strong> {idea.plan.localization}</p>
            </div>
          )}
        </div>
      )}
      {onFeedback && (
        <div className="mt-4 flex gap-2 text-sm text-muted">
          <span>Helpful?</span>
          <button
            onClick={() => onFeedback({ rating: 'up', id: idea.id })}
            className="px-3 py-1 rounded-full border border-slate-200 hover:border-primary/50"
          >
            👍🏽 Upvote
          </button>
          <button
            onClick={() => onFeedback({ rating: 'down', id: idea.id })}
            className="px-3 py-1 rounded-full border border-slate-200 hover:border-primary/50"
          >
            👎🏽 Needs work
          </button>
        </div>
      )}
    </div>
  );
};

export default IdeaCard;
