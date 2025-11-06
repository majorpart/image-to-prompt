import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-primary-bg text-text-primary flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-accent-orange text-white px-6 py-3 rounded-lg hover:bg-accent-hover transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

