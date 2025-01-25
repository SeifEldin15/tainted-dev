import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'

type DropdownItem = {
  label: string;
  href: string;
  scroll?: boolean;
}

type NavItem = {
  label: string;
  href: string;
  dropdownItems?: DropdownItem[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: pathname === '/' ? '#' : '/',
      dropdownItems: pathname === '/' ? [
        { label: 'About', href: '#about', scroll: true },
        { label: 'Features', href: '#features', scroll: true },
        { label: 'Pricing', href: '#pricing', scroll: true },
      ] : undefined
    },
    {
      label: 'Pricing',
      href: pathname === '/pricing' ? '#' : '/pricing',
      dropdownItems: pathname === '/pricing' ? [
        { label: 'IPv4 Datacenter', href: '#ipv4', scroll: true },
        { label: 'IPv6 Datacenter', href: '#ipv6', scroll: true },
        { label: 'IPv4 Plans', href: '#ipv4-plans', scroll: true },
      ] : [
        { label: 'IPv4 Datacenter', href: '/pricing#ipv4' },
        { label: 'IPv6 Datacenter', href: '/pricing#ipv6' },
        { label: 'IPv4 Plans', href: '/pricing#ipv4-plans' },
      ]
    },
    { label: 'Reseller', href: '/reseller' },
  ]

  return (
    <header className="relative border-b border-gray-300 dark:border-transparent dark:bg-gray-900">
      <div className="flex justify-between items-center max-w-[1350px] mx-auto">
        <div className="flex items-center ">
          <Link href="/" className="mr-8">
            <Image 
              src={theme === 'dark' ? "/logo-text-side.png" : "/image.png"} 
              alt="Logo" 
              width={180} 
              height={180} 
            />
          </Link>

          {/* Desktop menu */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                   onMouseEnter={() => setActiveDropdown(item.label)}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <Link
                  href={item.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium py-6 inline-block"
                >
                  {item.label}
                </Link>
                
                {item.dropdownItems && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 min-w-[200px]">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          if (dropdownItem.scroll) {
                            e.preventDefault();
                            scrollToSection(dropdownItem.href.substring(1));
                            setActiveDropdown(null);
                          }
                        }}
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Auth buttons and theme toggle */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
            aria-label="Toggle theme"
          >
            <div className="absolute inset-y-0 left-0 w-7 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            </div>
            <div className="absolute inset-y-0 right-0 w-7 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            </div>
            <div 
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
                theme === 'dark' ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
          <Link href="/login" className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium">
            Login
          </Link>
          <Link href="/register" className="bg-brand text-black px-4 py-2 rounded-lg hover:bg-brand/90">
            Sign Up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="p-2 rounded-lg lg:hidden text-black dark:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden absolute left-0 right-0 top-full w-full bg-white dark:bg-gray-800 shadow-lg z-50`}>
        <div className="py-2">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block px-4 py-2 text-base text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.dropdownItems && (
                <div className="pl-4">
                  {item.dropdownItems.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.href}
                      href={dropdownItem.href}
                      className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full px-4 py-2 text-base text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              <div className="relative w-14 h-7 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300">
                <div className="absolute inset-y-0 left-0 w-7 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                </div>
                <div className="absolute inset-y-0 right-0 w-7 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>
                </div>
                <div 
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
                    theme === 'dark' ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </div>
            </button>
            <Link
              href="/login"
              className="block px-4 py-2 text-base text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block px-4 py-2 text-base bg-brand text-white hover:bg-brand/90"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
