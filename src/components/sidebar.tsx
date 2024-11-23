'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Clipboard, Menu, X, HeartHandshake, UserRoundPen, ChevronLeft, ChevronRight, LogOut} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Recycle', href: '/recycle', icon: Clipboard },
  { name: 'Profile', href: '/profile', icon: UserRoundPen },
  { name: 'LogOut', href: '/', icon: LogOut },
];

const SideNav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="min-h-screen flex">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-sky-50 z-50 lg:hidden flex items-center px-4 border-b border-sky-600">
        <button
          onClick={toggleMenu}
          className="p-2 bg-sky-600 text-sky-50 rounded-md hover:bg-sky-700 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-4 text-xl font-bold text-black">kaabad.io</span>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full
        ${isCollapsed ? 'w-20' : 'w-64'}
        bg-sky-50 border-r border-sky-600
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        z-40
        flex flex-col
      `}>
        {/* Logo Section */}
        <div className={`
          text-xl font-bold p-4 flex items-center
          ${isCollapsed ? 'justify-center' : 'justify-between'}
          border-b border-sky-600
        `}>
          {!isCollapsed && <Link href='/dashboard' className="text-black hover:text-orange-500 transition-colors">kaabad.io</Link>}
      
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto">
          <ul className="px-2 py-4">
            {navItems.map((item) => (
              <li key={item.name} className="mb-4">
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  <div
                    className={`
                      flex items-center p-4 rounded-md transition-all duration-200
                      ${pathname === item.href
                        ? 'bg-sky-600 text-sky-50 scale-105'
                        : 'text-orange-500 hover:bg-sky-600 hover:text-sky-50 hover:scale-105'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? item.name : ''}
                  >
                    <item.icon className={isCollapsed ? '' : 'mr-2'} size={25} />
                    {!isCollapsed && item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Logo */}
        <div className="border-t border-sky-600 p-4">
          <div className="flex justify-center">
            <Image 
              src="/logo.png"
              alt="kaabad.io logo" 
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
     
    </div>
  );
};

export default SideNav;