import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'

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

        {/* Auth buttons */}
        <div className="hidden lg:flex items-center space-x-4">
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

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
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
