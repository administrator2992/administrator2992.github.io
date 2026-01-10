import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F8FCF4]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border border-black bg-[#6D8990]">
        <div className="flex items-center justify-between px-6 py-6 lg:px-12">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="h-10 w-10 flex-shrink-0"
            />
            <span className="font-kaisei text-2xl font-medium leading-[145%] tracking-[-0.48px] text-black">
              ファル
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 rounded-[40px] bg-black/5 px-10 py-4 backdrop-blur-[35px] md:flex">
            <Link
              to="/articles"
              className="text-center text-base font-medium leading-[145%] tracking-[-0.08px] text-black"
            >
              Articles
            </Link>
            <Link
              to="/publications"
              className="text-center text-base font-medium leading-[145%] tracking-[-0.08px] text-black"
            >
              Publications
            </Link>
            <Link
              to="/portfolio"
              className="text-center text-base font-medium leading-[145%] tracking-[-0.08px] text-black"
            >
              Portofolio
            </Link>
            <Link
              to="/resume"
              className="text-center text-base font-medium leading-[145%] tracking-[-0.08px] text-black"
            >
              Resume
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="flex flex-col gap-[10px] md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="h-0 w-[35px] border-t-2 border-black"></div>
            <div className="h-0 w-[35px] border-t-2 border-black"></div>
            <div className="h-0 w-[35px] border-t-2 border-black"></div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-black bg-[#6D8990] px-6 py-6 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link
                to="/articles"
                className="text-base font-medium leading-[145%] tracking-[-0.08px] text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                to="/publications"
                className="text-base font-medium leading-[145%] tracking-[-0.08px] text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                Publications
              </Link>
              <Link
                to="/portfolio"
                className="text-base font-medium leading-[145%] tracking-[-0.08px] text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portofolio
              </Link>
              <Link
                to="/resume"
                className="text-base font-medium leading-[145%] tracking-[-0.08px] text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-[88px]">{children}</main>

      {/* Footer */}
      <footer className="border-t border-black bg-[#6D8990] px-6 py-8 lg:px-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-12">
          {/* Social Links */}
          <div className="flex items-left gap-6">
            {/* GitHub */}
            <a
              href="https://github.com/administrator2992"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-left gap-2 text-base font-medium text-black transition-opacity hover:opacity-70"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* ResearchGate */}
            <a
              href="https://www.researchgate.net/profile/Ahmad-Nabhaan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-left gap-2 text-base font-medium text-black transition-opacity hover:opacity-70"
              aria-label="ResearchGate"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.586 0c-1.582 0-2.97.776-3.873 2.1-.544.797-.898 1.79-.977 2.9h-.023c-.073-.017-.238-.017-.402-.017-2.347 0-4.35 1.73-4.35 4.514 0 2.283 1.583 4.078 3.896 4.452v.053c-1.092.182-2.236.56-3.136 1.188-1.44.998-2.374 2.564-2.374 4.67 0 3.582 2.986 4.14 5.833 4.14 3.26 0 6.82-1.033 6.82-4.893 0-2.144-1.193-3.407-2.986-4.043-.88-.312-1.867-.52-2.88-.69v-.07c.746-.157 1.433-.488 1.985-.95 1.084-.902 1.69-2.274 1.69-3.87 0-.64-.087-1.24-.245-1.79h1.98c.176 0 .256.052.256.157v.122c0 .123-.123.245-.123.367 0 .28.193.474.472.474h1.073c.263 0 .456-.193.456-.456V2.99c0-.822-.158-1.584-.474-2.204C21.69.298 20.677 0 19.586 0zm-3.606 4.45c-.123 0-.123.018-.193.018.053-.683.246-1.312.544-1.83.544-.946 1.4-1.515 2.33-1.515.316 0 .614.053.86.176.64.298.95.949.95 1.9v1.269h-2.488c-.735 0-1.478-.018-2.003-.018zm.456 4.583c0-1.62.898-2.898 2.4-2.898 1.337 0 2.33 1.073 2.33 2.88 0 1.653-1.003 2.986-2.313 2.986-1.547 0-2.417-1.347-2.417-2.968zm-.142 7.05c1.635.316 3.652.773 3.652 2.898 0 1.828-1.792 2.503-3.607 2.503-1.97 0-3.59-.693-3.59-2.503 0-1.582.973-2.503 2.54-2.864l1.005-.035z" />
              </svg>
              <span className="hidden sm:inline">ResearchGate</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ahmadnabhaan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-left gap-2 text-base font-medium text-black transition-opacity hover:opacity-70"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="hidden sm:inline">LinkedIn</span>
            </a>

            {/* Email */}
            <a
              href="mailto:nabhaan.ahmad.ln@gmail.com"
              className="flex items-left gap-2 text-base font-medium text-black transition-opacity hover:opacity-70"
              aria-label="Email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-black/60">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
