import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { config, displayHeadline } from "../content/site.ts";

const NAV_LINKS = [
  { label: "HOME", to: "/" },
  { label: "ABOUT", to: "/about" },
  { label: "ARTICLES", to: "/articles" },
  { label: "LINKS", to: "/links" },
] as const;

function navLinkClass(isActive: boolean): string {
  const base =
    "nav-link relative text-[10px] tracking-[0.25em] uppercase transition-colors duration-200 no-underline";
  return isActive
    ? `${base} nav-link--active text-[color:var(--pm-accent)]`
    : `${base} text-[color:var(--pm-muted)] hover:text-[color:var(--pm-accent)]`;
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-[color:var(--pm-muted)]/40 bg-[color:var(--pm-background)]/90"
      style={{
        backdropFilter: "blur(4px)",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Accent underline that wipes left → right on hover/active */}
      <style>{`
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -3px;
          height: 1px;
          width: 100%;
          background: var(--pm-accent);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.28s ease;
          pointer-events: none;
        }
        .nav-link:hover::after,
        .nav-link--active::after {
          transform: scaleX(1);
        }
      `}</style>
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 md:px-10 h-12 w-full">

        {/* Wordmark — shows logo image if config.assets.logo is set, else text */}
        <Link
          to="/"
          className="text-[color:var(--pm-ink)] text-xs tracking-[0.3em] uppercase select-none no-underline hover:text-[color:var(--pm-accent)] transition-colors duration-200"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          aria-label="Home"
        >
          {config.assets.logo ? (
            <img
              src={`/${config.assets.logo}`}
              alt={config.name}
              className="h-6 w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          ) : (
            displayHeadline
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => navLinkClass(isActive)}
              aria-label={link.label}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger — 44px min tap target */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 min-w-[44px] min-h-[44px] items-center justify-center bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-px bg-[color:var(--pm-ink)] transition-all duration-200"
            style={{ transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }}
          />
          <span
            className="block w-5 h-px bg-[color:var(--pm-ink)] transition-all duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-[color:var(--pm-ink)] transition-all duration-200"
            style={{ transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          className="md:hidden border-t border-[color:var(--pm-muted)]/40 bg-[color:var(--pm-background)]/95 px-6 py-4 flex flex-col gap-4"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `${navLinkClass(isActive)} min-h-[44px] flex items-center`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
