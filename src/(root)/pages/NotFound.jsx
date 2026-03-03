import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", href: "/" },

  { label: "For Parents", href: "/parents" },
  { label: "For Teachers", href: "/teachers" },
  { label: "For Learners", href: "/learners" },

];

export default function NotFound() {
  return (

      <section
        className="min-h-[calc(100vh-64px)] flex items-center justify-center px-[var(--spacing-xl)] py-[var(--spacing-3xl)] md:max-[768px]:px-[var(--spacing-md)] md:max-[768px]:py-[var(--spacing-2xl)]"
        style={{ background: "linear-gradient(135deg, var(--background-light) 0%, var(--white) 50%, var(--primary-light) 100%)" }}
      >
        <div className="max-w-[600px] text-center">
          {/* 404 Icon */}
          <div className="inline-flex items-center justify-center w-[100px] h-[100px] max-[768px]:w-[80px] max-[768px]:h-[80px] bg-[var(--primary-light)] rounded-full text-[var(--primary)] mb-[var(--spacing-lg)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="max-[768px]:w-12 max-[768px]:h-12"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>

          {/* Error Code */}
          <h1
            className="text-[clamp(5rem,15vw,8rem)] font-extrabold leading-none mb-[var(--spacing-sm)]"
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </h1>

          {/* Title */}
          <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-bold text-[var(--text-primary)] mb-[var(--spacing-md)]">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-base text-[var(--text-secondary)] leading-[1.7] mb-[var(--spacing-xl)] max-w-[450px] mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Don&apos;t worry, let&apos;s get you back on track.
          </p>

          {/* Primary CTA */}
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-[var(--spacing-sm)] px-[var(--spacing-xl)] py-[var(--spacing-md)] bg-[var(--primary)] text-[var(--white)] text-base font-semibold rounded-[var(--radius-md)] no-underline shadow-[var(--shadow-md)] transition-[var(--transition-base)] hover:bg-[var(--primary-dark)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] hover:text-[var(--white)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </Link>

          {/* Quick Links */}
          <div className="mt-[var(--spacing-2xl)] pt-[var(--spacing-xl)] border-t border-[var(--border-color)] max-[768px]:mt-[var(--spacing-xl)] max-[768px]:pt-[var(--spacing-lg)]">
            <p className="text-[0.9rem] text-[var(--text-muted)] mb-[var(--spacing-md)]">Or explore these pages:</p>
            <div className="flex flex-wrap justify-center gap-[var(--spacing-sm)] max-[768px]:gap-[var(--spacing-xs)]">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="inline-block px-[var(--spacing-md)] py-[var(--spacing-sm)] bg-[var(--white)] text-[var(--text-primary)] text-sm font-medium rounded-[var(--radius-md)] no-underline border border-[var(--border-color)] transition-[var(--transition-base)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary-light)] max-[768px]:px-[var(--spacing-sm)] max-[768px]:py-[var(--spacing-xs)] max-[768px]:text-[0.8rem]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        
        </div>
      </section>
    
  );
}
