"use client"

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { HeartFill } from "@gravity-ui/icons";
import { usePathname } from "next/navigation"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Find Doctors", href: "/doctors" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/70 backdrop-blur-lg shadow-sm">
      <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        
        {/* Left: Premium Stylized Logo and Name (Teal Theme) */}
        <div className="flex items-center gap-3 cursor-pointer group select-none z-50">
          
          {/* Logo Badge Container - Teal Gradient by default */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400 shadow-sm shadow-teal-500/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-teal-500/40">
            
            <span className="text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-[10deg] flex items-center justify-center">
              <HeartFill size={18} />
            </span>

            {/* External Teal blur glow (Appears on hover) */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-500 -z-10" />
          </div>

          {/* Stylized Name in Teal Spectrum */}
          <div className="flex items-center font-black text-2xl tracking-tight font-sans">
            <span className="text-teal-800 transition-colors duration-300 group-hover:text-teal-600">H</span>
            <span className="text-teal-700">e</span>
            <span className="text-teal-600">a</span>
            <span className="text-teal-600">l</span>
            <span className="text-teal-500">S</span>
            <span className="text-teal-500">y</span>
            <span className="text-teal-400">n</span>
            <span className="text-teal-400">c</span>
          </div>
        </div>

        {/* Center: Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="relative group/link py-2">
                <Link 
                  href={item.href} 
                  className={`font-semibold text-[15px] transition-all duration-300
                    ${isActive 
                      ? "bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent" 
                      : "text-gray-500 group-hover/link:bg-gradient-to-r group-hover/link:from-teal-600 group-hover/link:to-teal-400 group-hover/link:bg-clip-text group-hover/link:text-transparent"
                    }`}
                >
                  {item.name}
                </Link>
                <span className={`absolute bottom-0 left-1/2 h-[2.5px] rounded-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-300 ease-out -translate-x-1/2 shadow-sm shadow-teal-400/50
                  ${isActive ? "w-full" : "w-0 group-hover/link:w-full"}`} 
                />
              </li>
            );
          })}
        </ul>

        {/* Right: Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/auth/login" 
            className="font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent hover:opacity-75 transition-opacity duration-300"
          >
            Login
          </Link>
          <Link
            href="/auth/register" 
           >
          <Button 
            variant="solid" 
            className="bg-gradient-to-tr from-teal-600 to-teal-400 text-white font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-0.5 transition-all duration-300 border-none rounded-full px-6"
          >
            Register
          </Button>
          </Link>
          
        </div>

        {/* Hamburger Trigger */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className={`block h-0.5 w-6 rounded-full bg-gray-700 transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 rounded-full bg-gray-700 transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block h-0.5 w-6 rounded-full bg-gray-700 transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
        
      </header>

      {/* Mobile Drawer */}
      <div className={`absolute top-0 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 ease-in-out md:hidden overflow-hidden z-40 ${isOpen ? "max-h-[420px] opacity-100 pt-20 pb-6 shadow-xl" : "max-h-0 opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col px-6 space-y-5">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name} className="border-b border-gray-50 pb-2">
                  <Link 
                    href={item.href} 
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-medium transition-colors
                      ${isActive ? "text-teal-600 font-bold" : "text-gray-700 hover:text-teal-600"}`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-3 pt-2">
            <Link 
              href="/auth/login" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 font-bold text-teal-600 border border-teal-100 rounded-full bg-teal-50/30"
            >
              Login
            </Link>
            <Link
            href="/auth/register" 
           >
          <Button 
            variant="solid" 
            className="bg-gradient-to-tr from-teal-600 to-teal-400 text-white font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-0.5 transition-all duration-300 border-none rounded-full px-6"
          >
            Register
          </Button>
          </Link>
          </div>
        </div>
      </div>

    </nav>
  );
}