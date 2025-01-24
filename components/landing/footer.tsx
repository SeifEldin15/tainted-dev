import Link from 'next/link';
import { FaDiscord, FaTelegram } from 'react-icons/fa';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="bg-white dark:bg-gray-900 py-12 max-w-[1350px] mx-auto mt-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-6">
            <Image 
              src={theme === 'dark' ? "/logo-text-side.png" : "/image.png"}
              alt="LightningProxies" 
              width={214} 
              height={48}
            />
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-md">
              LightningProxies offers a complex proxy infrastructure equipped with many proxy solutions in one place. We have Datacenter, Residential, IPv6 & ISP proxies at a cost-effective price.
            </p>
            <div className="mt-6">
              <Link 
                href="https://discord.gg/lightningproxies" 
                className="inline-flex items-center bg-[#5865F2] text-white px-6 py-3 rounded-lg"
              >
                <FaDiscord className="w-6 h-6 mr-2" />
                Join Our Discord Channel
                <span className="block text-sm opacity-80">Click here to join our discord community</span>
              </Link>
            </div>
          </div>

          {/* Account Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">ACCOUNT</h3>
            <ul className="space-y-3">
              <li><Link href="/create-account" className="text-gray-600 dark:text-gray-300 hover:text-brand">Create Account</Link></li>
              <li><Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-brand">Log In</Link></li>
            </ul>
          </div>

          {/* Products Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">PRODUCTS</h3>
            <ul className="space-y-3">
              <li><Link href="/ipv6" className="text-gray-600 dark:text-gray-300 hover:text-brand">IPv6</Link></li>
              <li><Link href="/datacenter" className="text-gray-600 dark:text-gray-300 hover:text-brand">Datacenter</Link></li>
              <li><Link href="/residential" className="text-gray-600 dark:text-gray-300 hover:text-brand">Residential</Link></li>
              <li><Link href="/isp" className="text-gray-600 dark:text-gray-300 hover:text-brand">ISP</Link></li>
            </ul>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-2">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">EXPLORE</h3>
            <ul className="space-y-3">
              <li><Link href="/faqs" className="text-gray-600 dark:text-gray-300 hover:text-brand">FAQs</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-brand">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-brand">Privacy Policy</Link></li>
              <li><Link href="/partners" className="text-gray-600 dark:text-gray-300 hover:text-brand">Partners</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t dark:border-transparent flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300">Copyright © 2024 LightningProxies. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="https://discord.gg/lightningproxies">
              <FaDiscord className="w-6 h-6 text-black dark:text-white" />
            </Link>
            <Link href="https://t.me/lightningproxies">
              <FaTelegram className="w-6 h-6 text-black dark:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
