'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/providers';
import { Menu, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="mx-auto flex flex-wrap items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-foreground">VERP</span>
          </a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <nav className="flex space-x-4">
            <Link
              href="/"
              className={[
                'rounded-md px-3 py-2 text-sm font-medium',
                'hover:bg-accent hover:text-accent-foreground',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              ].join(' ')}
            >
              Home
            </Link>
            <Link
              href="/features"
              className={[
                'rounded-md px-3 py-2 text-sm font-medium',
                'hover:bg-accent hover:text-accent-foreground',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              ].join(' ')}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={[
                'rounded-md px-3 py-2 text-sm font-medium',
                'hover:bg-accent hover:text-accent-foreground',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              ].join(' ')}
            >
              Pricing
            </Link>
            <Link
              href="/services"
              className={[
                'rounded-md px-3 py-2 text-sm font-medium',
                'hover:bg-accent hover:text-accent-foreground',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              ].join(' ')}
            >
              Services
            </Link>
            <Link
              href="/about"
              className={[
                'rounded-md px-3 py-2 text-sm font-medium',
                'hover:bg-accent hover:text-accent-foreground',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              ].join(' ')}
            >
              About
            </Link>
          </nav>
        </div>

        {/* Auth / User Controls */}
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1 rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none"
                >
                  <User className="h-5 w-5" />
                </button>
                {/* Simple dropdown menu */}
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-popover p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                    <div className="py-1 text-sm text-foreground">
                      <p className="truncate">{user.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.role}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-accent hover:bg-accent/10 hover:text-accent"
              >
                Login
              </Link>
              {/* Optional: "Go to App" button for unauthenticated */}
              <Link
                href="/login"
                className="ml-2 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Go to App
              </Link>
            </>
          )}
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
            >
              Pricing
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
            >
              About
            </Link>
            <Link
              href="/downloads"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent"
            >
              Downloads
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent mt-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 mt-2"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent mt-2"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 mt-2"
                >
                  Go to App
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}