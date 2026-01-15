import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="max-w-2xl mx-auto mt-16 text-center bg-white p-8 rounded-3xl shadow-card">
    <h2 className="text-3xl font-bold text-ink mb-2">Page not found</h2>
    <p className="text-muted mb-4">Let’s get you back to building ideas.</p>
    <Link to="/" className="px-5 py-3 rounded-full bg-primary text-white font-semibold shadow-card">
      Go home
    </Link>
  </div>
);

export default NotFound;
