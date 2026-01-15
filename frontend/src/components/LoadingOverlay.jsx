const LoadingOverlay = ({ message = 'Thinking of ideas…' }) => (
  <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center z-40">
    <div className="bg-white rounded-2xl px-6 py-4 shadow-card flex items-center gap-3">
      <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
      <span className="w-3 h-3 bg-primary/70 rounded-full animate-pulse [animation-delay:150ms]" />
      <span className="w-3 h-3 bg-primary/50 rounded-full animate-pulse [animation-delay:300ms]" />
      <p className="text-sm font-semibold text-ink ml-2">{message}</p>
    </div>
  </div>
);

export default LoadingOverlay;
