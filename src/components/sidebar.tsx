'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clipboard, UserRoundPen, Menu, X, HeartHandshake } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Recycle', href: '/recycle', icon: Clipboard },
  { name: 'Profile', href: '/profile', icon: UserRoundPen },
  { name: 'Donate', href: '/donate', icon: HeartHandshake }
];

const SideNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-cream-100 rounded-md"
        onClick={toggleMenu}
        style={{ padding: '8px' }}
      >
        {isOpen ? (
          <X className="w-6 h-6" style={{ color: '#800020' }} />
        ) : (
          <Menu className="w-6 h-6" style={{ color: '#800020' }} />
        )}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          backgroundColor: '#000000',
          width: isHovered ? '256px' : '80px',
          transform: `translateX(${isOpen || window.innerWidth >= 1024 ? '0' : '-100%'})`,
          transition: 'all 0.3s ease-in-out',
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100%',
          zIndex: 50,
          '@media (minWidth: 1024px)': {
            transform: 'translateX(0)',
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Container */}
        <div style={{ 
          padding: '16px',
          borderBottom: '1px solid rgba(255, 253, 245, 0.1)',
          display: 'flex',
          justifyContent: isHovered ? 'flex-start' : 'center',
          alignItems: 'center'
        }}>
          {isHovered ? (
            <h1 style={{ 
              color: '#FFFDF5',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              Kabaad.io
            </h1>
          ) : (
            <img
              src="/logo.png"
              alt="Kabaad.io"
              style={{
                height: '32px',
                width: 'auto'
              }}
            />
          )}
        </div>

        {/* Navigation Items */}
        <nav style={{ marginTop: '32px' }}>
          <ul style={{ padding: '0 8px' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const ItemIcon = item.icon;

              return (
                <li key={item.href} style={{ marginBottom: '8px' }}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      backgroundColor: isActive ? '#FFFDF5' : 'transparent',
                      color: isActive ? '#800020' : '#FFFDF5',
                      transition: 'all 0.2s ease-in-out',
                      fontWeight: 'bold',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 253, 245, 0.9)';
                        e.currentTarget.style.color = '#800020';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#FFFDF5';
                      }
                    }}
                  >
                    <ItemIcon style={{ 
                      width: '24px',
                      height: '24px'
                    }} />
                    <span style={{
                      marginLeft: '16px',
                      opacity: isHovered ? 1 : 0,
                      width: isHovered ? 'auto' : 0,
                      overflow: 'hidden',
                      transition: 'opacity 0.3s ease-in-out',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Add media query styles */}
      <style jsx global>{`
        @media (minWidth: 1024px) {
          aside {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
};

export default SideNav;