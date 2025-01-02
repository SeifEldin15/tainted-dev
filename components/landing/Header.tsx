import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Troubleshoot', href: '/troubleshoot' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Merchant Lookup', href: '/merchant-lookup' },
    { label: 'Chrome Extension', href: '/chrome-extension' },
    { label: 'Amazon', href: '/amazon' },
    { label: 'AirBnB', href: '/airbnb' },
    { label: 'Uber', href: '/uber' },
    { label: 'International (INR)', href: '/international' },
    { label: 'Nike', href: '/nike' },
  ]

  return (
    <header className="relative">
      <div className=" items-center px-4 border-b">
        <button 
          className="p-2 rounded-lg bg-gray-100 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open menu</span>
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <Link href="/" className="ml-4">
          <Image
             src="/logo-text-side.png" // Replace with your actual logo path
             alt="Logo"
             width={128}
             height={128}
          />
        </Link>
         {/* Mobile menu */}
      <nav className={`
        ${isMenuOpen ? 'block' : 'hidden'}
        lg:hidden
        absolute
        left-0
        w-64
        bg-white
        shadow-lg
        z-50
      `}>
        <div className="py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Desktop menu */}
      <nav className="hidden lg:flex items-center space-x-4 py-4 text-base [&_a]:[-webkit-text-stroke:0.3px]">
        {navItems.map((item, index) => (
          <>
            <Link
              key={item.href}
              href={item.href}
              className={`text-gray-700 hover:text-gray-900 ${
                item.label === 'Home' ? 'font-medium [-webkit-text-stroke:0]' : 'font-light'
              }`}
            >
              {item.label}
            </Link>
            {index < navItems.length - 1 && (
              <span className="text-gray-400 font-normal mx-1">-</span>
            )}
          </>
        ))}
      </nav>
      </div>

     
    </header>
  )
}

export default Header
