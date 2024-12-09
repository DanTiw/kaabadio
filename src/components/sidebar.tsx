'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clipboard, Menu, X, UserRoundIcon as UserRoundPen, ChevronLeft, ChevronRight, LogOut, Recycle } from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Recycle', href: '/recycle', icon: Clipboard },
  { name: 'Sandbox', href: '/sandbox', icon: Recycle },
  { name: 'Profile', href: '/profile', icon: UserRoundPen },
  { name: 'LogOut', href: '/', icon: LogOut },
];

const SideNav: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[#0d2834] z-50 lg:hidden flex items-center px-4 border-b border-[#4FD1C5]/20">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="text-[#4FD1C5] hover:bg-[#1a3f4c] hover:text-[#4FD1C5]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
        <span className="ml-4 text-xl font-bold text-[#4FD1C5]">kabaad.io</span>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full bg-[#0d2834] border-r border-[#4FD1C5]/20",
        "transform transition-all duration-300 ease-in-out z-50 flex flex-col",
        "shadow-lg",
        isCollapsed ? "w-20" : "w-64",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo Section */}
        <div className={cn(
          "text-xl font-bold p-4 flex items-center border-b border-[#4FD1C5]/20 bg-[#0d2834]",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <Link 
              href='/dashboard' 
              className="text-[#4FD1C5] hover:text-[#3BA89F] transition-colors duration-200"
            >
              kabaad.io
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="text-[#4FD1C5] hover:bg-[#1a3f4c] hover:text-[#4FD1C5] lg:flex hidden"
          >
            {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </Button>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto">
          <ul className="px-2 py-4">
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  <div
                    className={cn(
                      "flex items-center p-3 rounded-lg transition-all duration-200",
                      "hover:bg-[#1a3f4c] group",
                      pathname === item.href
                        ? "bg-[#1a3f4c] text-[#4FD1C5] shadow-md"
                        : "text-[#4FD1C5] hover:text-[#4FD1C5]",
                      isCollapsed ? "justify-center" : ""
                    )}
                    title={isCollapsed ? item.name : ''}
                  >
                    <item.icon 
                      className={cn(
                        "transition-transform duration-200 group-hover:scale-110",
                        isCollapsed ? "" : "mr-3"
                      )}
                      size={22} 
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
      </div>
    </>
  );
};

export default SideNav;

