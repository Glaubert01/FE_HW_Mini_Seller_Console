import React from "react";
import { Link, NavLink } from "react-router-dom";
import Footer from "@/components/ui/Footer"; // 👈 novo

interface AppLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { to: "/leads", label: "Leads" },
  { to: "/opportunities", label: "Opportunities" },
];

function AppLayout({ children }: AppLayoutProps) {
  const [isDark, setIsDark] = React.useState(
    () =>
      (localStorage.getItem("theme") ??
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")) === "dark"
  );

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    const t = setTimeout(() => root.classList.remove("theme-transition"), 300);

    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    return () => clearTimeout(t);
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/assets/logo_lightmode.svg"
              alt="Mini Seller"
              className="h-16 w-auto dark:hidden"
            />
            <img
              src="/assets/logo_darkmode.svg"
              alt="Mini Seller"
              className="h-16 w-auto hidden dark:block"
            />
            <span className="sr-only">Mini Seller Console</span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-brand-600 ${
                    isActive
                      ? "text-brand-600"
                      : "text-gray-600 dark:text-gray-300"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={() => setIsDark((v) => !v)}
              className="h-9 w-9 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              title={isDark ? "Light mode" : "Dark mode"}
            >
              <span className="text-base">{isDark ? "☀️" : "🌙"}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>

      {/* Footer visible on all pages */}
      <Footer />
    </div>
  );
}

export default AppLayout;
