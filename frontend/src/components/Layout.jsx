import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background bg-texture">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pb-12 pt-6">{children}</main>
    </div>
  );
};

export default Layout;
