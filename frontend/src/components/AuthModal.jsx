import { useState } from 'react';

const AuthModal = ({ open, onClose, mode = 'login', onLoginGoogle, onLoginEmail, onRegisterEmail }) => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      await onLoginEmail(form);
    } else {
      await onRegisterEmail(form);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-40 px-4">
      <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-6 relative">
        <button className="absolute top-3 right-3 text-muted" onClick={onClose} aria-label="Close auth modal">
          ×
        </button>
        <h3 className="text-xl font-semibold mb-2">{mode === 'login' ? 'Welcome back' : 'Create account'}</h3>
        <p className="text-sm text-muted mb-4">Login is only needed if you want to save and revisit ideas.</p>
        <div className="space-y-2">
          <button
            onClick={onLoginGoogle}
            className="w-full py-3 rounded-xl border border-ink/10 bg-white hover:border-primary/40 font-semibold"
          >
            Continue with Google
          </button>
          <div className="flex items-center gap-2 text-muted text-sm">
            <span className="flex-1 h-px bg-slate-200" />
            <span>or email</span>
            <span className="flex-1 h-px bg-slate-200" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <label className="block text-sm">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none"
                  placeholder="Your name"
                />
              </label>
            )}
            <label className="block text-sm">
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none"
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-sm">
              Password
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-primary focus:outline-none"
                placeholder="Minimum 6 characters"
              />
            </label>
            <button type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-card hover:bg-primary/90">
              {mode === 'login' ? 'Login' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
