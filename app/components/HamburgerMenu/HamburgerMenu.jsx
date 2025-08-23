"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Navigation links
  const navItems = [
    { href: '/', label: 'home' },
    { href: '/about', label: 'about' },
    { href: '/contact', label: 'contact' },
  ];

  // Animation variants for the menu overlay
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Animation variants for menu items
  const itemVariants = {
    closed: {
      opacity: 0,
      x: 50,
    },
    open: {
      opacity: 1,
      x: 0,
    }
  };

  // Stagger animation for menu items
  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f3f3f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <Image className="hover:rotate-180" src="/wave.png" width="100" height="100" alt="wave"></Image>
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="relative z-50 flex flex-col justify-center items-center w-12 h-12 p-1 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-8 h-8 flex flex-col justify-center items-center">
                {/* Top line */}
                <motion.span
                  className="absolute block h-1 w-8 bg-gray-900 rounded-full"
                  animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  style={{ transformOrigin: 'center' }}
                />
                {/* Middle line */}
                <motion.span
                  className="absolute block h-1 w-8 bg-gray-900 rounded-full"
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                {/* Bottom line */}
                <motion.span
                  className="absolute block h-1 w-8 bg-gray-900 rounded-full"
                  animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  style={{ transformOrigin: 'center' }}
                />
                </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 w-80 h-full bg-[#75593b] shadow-xl z-40"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Menu Content */}
              <div className="flex flex-col h-full pt-20 pb-8 px-8">
                {/* Navigation Items */}
                <motion.nav
                  className="flex-1"
                  variants={containerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <ul className="space-y-6">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        variants={itemVariants}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="block text-2xl font-light text-[#f3f3f2] hover:text-[#D4B4C4] transition-colors duration-200"
                          onClick={toggleMenu}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>

                {/* Footer Info */}
                <motion.div
                  className="border-t border-gray-200 pt-6 space-y-3"
                  variants={itemVariants}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                >
                  <p className="text-sm text-[#f3f3f2]">
                    Oakland, CA
                  </p>
                  <p className="text-sm text-[#f3f3f2]">
                    hello@currents.school
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;