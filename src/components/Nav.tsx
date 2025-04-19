'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type NavItem = {
  name: string;
  href: string;
};

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Why Choose Us', href: '/WhyChooseUsPage' },
  { name: 'Farmer Impact', href: '/farmer-impact' },
  { name: 'SDG Goals', href: '/sdg-goals' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Contact', href: '/contact' },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full py-4 bg-white bg-opacity-90 backdrop-blur-sm fixed top-0 left-0 z-50 shadow-md">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex justify-between items-center px-10">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="AgriChain Logo" className="h-10 w-auto" />
        </div>

        {/* Center Nav Items */}
        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300
                text-black 
                ${pathname === item.href
                  ? 'border-2 border-green-600 shadow-[0_0_15px_rgba(34,139,34,0.5)]'
                  : 'hover:bg-green-100 hover:shadow-[0_0_10px_rgba(34,139,34,0.3)]'
                }
                hover:text-black
                relative group`}
            >
              {item.name}
              <span className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-400 to-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></span>
            </Link>
          ))}
        </div>

        {/* Join Us Button */}
        <div>
          <Link
            href="/join-us"
            className="ml-4 px-5 py-2 text-sm rounded-full bg-green-600 text-white hover:bg-green-700 transition"
          >
            Join Us
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex lg:hidden justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="AgriChain Logo" className="h-8 w-auto" />
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="text-black text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white shadow-lg">
          <ul className="flex flex-col items-center gap-4 py-4">
            {navItems.map((item) => (
              <li key={item.href} onClick={() => setIsMenuOpen(false)}>
                <Link
                  href={item.href}
                  className={`px-6 py-2 rounded-full text-sm transition-all duration-300
                    text-black 
                    ${pathname === item.href
                      ? 'border-2 border-green-600 shadow-[0_0_15px_rgba(34,139,34,0.5)]'
                      : 'hover:bg-green-100 hover:shadow-[0_0_10px_rgba(34,139,34,0.3)]'
                    }
                    hover:text-black
                    relative group`}
                >
                  {item.name}
                  <span className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-400 to-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/join-us"
                className="mt-2 px-5 py-2 text-sm rounded-full bg-green-600 text-white hover:bg-green-700 transition"
              >
                Join Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}