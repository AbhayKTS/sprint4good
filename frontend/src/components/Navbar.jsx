import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listenToAuth, signInWithGoogle, loginWithEmail, registerWithEmail, logout } from '../services/firebase';
import { ensureUserDocument } from '../services/firestore';
import { useSessionStore } from '../store/useSessionStore';
import LanguageToggle from './LanguageToggle';
import AuthModal from './AuthModal';
import OnboardingModal from './OnboardingModal';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/form', label: 'Start' },
  { to: '/dashboard', label: 'Saved Ideas' },
];

const Navbar = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('ideaforge_seen_onboarding');
    if (!seen) setShowOnboarding(true);
  }, []);

  const close = () => {
    localStorage.setItem('ideaforge_seen_onboarding', 'true');
    setShowOnboarding(false);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useSessionStore();
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState('login');

  useEffect(() => {
    const unsub = listenToAuth((firebaseUser) => {
      setUser(firebaseUser || null);
      if (firebaseUser) {
        ensureUserDocument(firebaseUser);
      }
    });
    return () => unsub();
  }, [setUser]);

  const handleLoginGoogle = async () => {
    await signInWithGoogle();
    setAuthOpen(false);
  };

  const handleLoginEmail = async ({ email, password }) => {
    await loginWithEmail(email, password);
    setAuthOpen(false);
  };

  const handleRegisterEmail = async ({ email, password, name }) => {
    await registerWithEmail(email, password, name);
    setAuthOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="font-bold text-lg flex items-center gap-2">
          <span className="w-9 h-9 rounded-2xl bg-primary/90 text-white grid place-items-center shadow-card">IF</span>
          <div>
            <p className="leading-5">IdeaForge</p>
            <p className="text-sm text-muted">Skills → Business ideas</p>
          </div>
        </Link>
        <nav className="flex-1 flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-full text-sm font-medium transition border border-transparent hover:border-primary/30 hover:bg-white/80 ${
                location.pathname === link.to ? 'text-primary bg-white shadow-sm border-primary/30' : 'text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <LanguageToggle />
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted truncate max-w-[140px]">{user.displayName || user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-ink text-white text-sm font-semibold hover:bg-ink/90"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMode('login');
                setAuthOpen(true);
              }}
              className="px-4 py-2 rounded-full border border-ink/10 bg-white shadow-sm text-sm font-semibold hover:border-primary/40"
            >
              Login to save
            </button>
            <button
              onClick={() => {
                setMode('register');
                setAuthOpen(true);
              }}
              className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-card hover:bg-primary/90"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        mode={mode}
        onLoginGoogle={handleLoginGoogle}
        onLoginEmail={handleLoginEmail}
        onRegisterEmail={handleRegisterEmail}
      />
      <OnboardingModal open={showOnboarding} onClose={close} />
    </header>
  );
};

export default Navbar;
