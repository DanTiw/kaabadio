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
      <div className="fixed top-0 left-0 right-0 h-16 bg-white z-50 lg:hidden flex items-center px-4 border-b border-blue-200">
        <button
          onClick={toggleMenu}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 hover:shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-4 text-xl font-bold text-blue-900">kaabad.io</span>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full
        ${isCollapsed ? 'w-20' : 'w-64'}
        bg-white border-r border-blue-200
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        z-40
        flex flex-col
        shadow-lg
      `}>
        {/* Logo Section */}
        <div className={`
          text-xl font-bold p-4 flex items-center
          ${isCollapsed ? 'justify-center' : 'justify-between'}
          border-b border-blue-200
          bg-white
        `}>
          {!isCollapsed && (
            <Link 
              href='/dashboard' 
              className="text-blue-900 hover:text-blue-600 transition-colors duration-200"
            >
              kaabad.io
            </Link>
          )}
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto">
          <ul className="px-2 py-4">
            {navItems.map((item) => (
              <li key={item.name} className="mb-4">
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  <div
                    className={`
                      flex items-center p-4 rounded-lg transition-all duration-200
                      ${pathname === item.href
                        ? 'bg-blue-600 text-white shadow-md scale-105'
                        : 'text-blue-600 hover:bg-blue-50 hover:text-blue-800 hover:scale-105'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                      group
                      hover:shadow-md
                    `}
                    title={isCollapsed ? item.name : ''}
                  >
                    <item.icon 
                      className={`
                        ${isCollapsed ? '' : 'mr-2'} 
                        transition-transform duration-200 
                        group-hover:scale-110
                      `} 
                      size={25} 
                    />
                    {!isCollapsed && (
                      <span className="font-medium transition-all duration-200 group-hover:translate-x-1">
                        {item.name}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Logo */}
        <div className="border-t border-blue-200 p-4 bg-white">
          <div className="flex justify-center">
            <Image 
              src="/logo.png"
              alt="kaabad.io logo" 
              width={100}
              height={100}
              className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
     
    </div>
  );
};

export default SideNav;