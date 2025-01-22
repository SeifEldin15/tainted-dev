import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

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
      dropdownItems: [
        { label: 'About', href: pathname === '/' ? '#about' : '/#about', scroll: pathname === '/' },
        { label: 'Features', href: pathname === '/' ? '#features' : '/#features', scroll: pathname === '/' },
        { label: 'Pricing', href: pathname === '/' ? '#pricing' : '/#pricing', scroll: pathname === '/' },
      ]
    },
    {
      label: 'Pricing',
      href: pathname === '/pricing' ? '#' : '/pricing',
      dropdownItems: [
        { 
          label: 'IPv4 Datacenter', 
          href: pathname === '/pricing' ? '#ipv4' : '/pricing#ipv4',
          scroll: pathname === '/pricing'
        },
        { 
          label: 'IPv6 Datacenter', 
          href: pathname === '/pricing' ? '#ipv6' : '/pricing#ipv6',
          scroll: pathname === '/pricing'
        },
        { 
          label: 'IPv4 Plans', 
          href: pathname === '/pricing' ? '#ipv4-plans' : '/pricing#ipv4-plans',
          scroll: pathname === '/pricing'
        },
      ]
    },
    { label: 'Reseller', href: '/reseller' },
  ]

  return (
    <header className="relative border-b border-gray-300">
      <div className="flex justify-between items-center max-w-[1350px] mx-auto">
        <div className="flex items-center ">
          <Link href="/" className="mr-8">
            <Image src="/image.png" alt="Logo" width={180} height={180} />
          </Link>

          {/* Desktop menu */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                   onMouseEnter={() => setActiveDropdown(item.label)}
                   onMouseLeave={() => setActiveDropdown(null)}>
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 font-medium py-6 inline-block"
                >
                  {item.label}
                </Link>
                
                {item.dropdownItems && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px]">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
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
          <Link href="/login" className="text-gray-700 hover:text-gray-900 font-medium">
            Login
          </Link>
          <Link href="/register" className="bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand/90">
            Sign Up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="p-2 rounded-lg lg:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden absolute left-0 right-0 top-full w-full bg-white shadow-lg z-50`}>
        <div className="py-2">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
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
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="border-t border-gray-200 mt-2 pt-2">
            <Link
              href="/login"
              className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
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
