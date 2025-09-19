import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo + brand */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/logo_lightmode.svg"
            alt="Mini Seller Console"
            className="h-6 w-auto dark:hidden"
          />
          <img
            src="/assets/logo_lightmode.svg"
            alt="Mini Seller Console"
            className="h-6 w-auto hidden dark:block"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Mini Seller Console
          </span>
        </Link>

        {/* Links rápidos */}
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Contact
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Mini Seller Console. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
