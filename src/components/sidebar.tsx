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

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing auth tokens)
    router.push('/'); // Redirect to landing page
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-16 bg-sky-50 z-30 lg:hidden flex items-center px-4 border-b border-sky-600">
        <button
          onClick={toggleMenu}
          className="p-2 bg-sky-600 text-sky-50 rounded-md hover:bg-sky-700 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-4 text-xl font-bold text-black">kaabad.io</span>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-15 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      <nav className={`
        fixed top-0 left-0 h-full bg-sky-50 flex flex-col
        transform transition-all duration-300 ease-in-out z-20
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'w-20' : 'w-64'}
        lg:translate-x-0 lg:static lg:h-screen
        border-r border-sky-600
      `}>
        {/* Logo Section at Top */}
        <div className={`
          text-xl font-bold mb-8 p-4 flex items-center
          ${isCollapsed ? 'justify-center' : 'justify-between'}
          border-b border-sky-600
        `}>
          {!isCollapsed && <Link href='/dashboard' className="text-black hover:text-orange-500 transition-colors">kaabad.io</Link>}
          <button
            onClick={toggleCollapse}
            className="p-1 hover:bg-sky-600 hover:text-sky-50 rounded-md hidden lg:block transition-colors text-orange-500"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Items */}
        <ul className="flex-grow px-2">
          {navItems.map((item) => (
            <li key={item.name} className="mb-4">
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                <div
                  className={`
                    flex items-center p-4 rounded-md transition-all duration-200
                    ${pathname === item.href
                      ? 'bg-sky-600 text-sky-50 scale-115'
                      : 'text-orange-500 hover:bg-sky-600 hover:text-sky-50'
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

        {/* Logout Button and Logo at Bottom */}
        <div className="mt-auto border-t border-sky-600 p-4">
          

          {/* Logo at Bottom */}
          <div className={`
            flex items-center justify-center
            ${isCollapsed ? 'w-full' : 'w-full'}
          `}>
            <Image 
              src="/logo.png" // Replace with your actual logo path
              alt="kaabad.io logo" 
              width={isCollapsed ? 100 : 100} 
              height={isCollapsed ? 100 : 100} 
              className="object-contain"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideNav;