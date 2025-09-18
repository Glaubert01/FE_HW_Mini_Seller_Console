import React from "react";
import { Link, NavLink } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { to: "/leads", label: "Leads" },
  { to: "/opportunities", label: "Opportunities" },
];

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-brand-600">
            Mini Seller Console
          </Link>
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-brand-600 ${
                    isActive ? "text-brand-500" : "text-gray-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}

export default AppLayout;
