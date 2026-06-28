'use client';
import { Link, Button } from "@heroui/react";
import { HeartFill } from "@gravity-ui/icons";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const pathname=usePathname();
  if (pathname.includes("/dashboard")) {
    return null; // Don't render the footer on dashboard pages
  }

  return (
    <footer className="bg-white border-t border-gray-100 border-l-[8px] border-l-teal-600 pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: 4 Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Logo & Brand Info */}
          <div className="flex flex-col gap-6">
            
            {/* The exact Interactive Teal Logo from Navbar */}
            <div className="flex items-center gap-3 cursor-pointer group select-none w-fit">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400 shadow-sm shadow-teal-500/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-teal-500/40">
                <span className="text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-[10deg] flex items-center justify-center">
                  <HeartFill size={18} />
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-500 -z-10" />
              </div>
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
            
            <p className="text-gray-500 text-[15px] leading-relaxed pr-4">
              Connecting patients with verified healthcare professionals for better health outcomes.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-6 tracking-wide">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              {["Home", "Find Doctors", "About Us", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-500 text-[15px] hover:text-teal-600 hover:translate-x-1 transition-all duration-300 font-medium">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-6 tracking-wide">Contact</h3>
            <ul className="flex flex-col gap-5">
              
              {/* Location */}
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-500 text-[15px] leading-relaxed">
                  123 Healthcare Ave, Medical District, City 12345
                </span>
              </li>

              {/* Email */}
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <Link href="mailto:info@healsync.com" className="text-gray-500 text-[15px] hover:text-teal-600 transition-colors">
                  info@healsync.com
                </Link>
              </li>

              {/* Emergency Phone */}
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-orange-500 font-bold text-[15px]">
                  Emergency: 911
                </span>
              </li>

              {/* Standard Phone */}
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-500 text-[15px]">
                  +1 (234) 567-890
                </span>
              </li>

            </ul>
          </div>

          {/* Column 4: Follow Us & Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-6 tracking-wide">Follow Us</h3>
            
            {/* Circular Social Icons exactly like the photo */}
            <div className="flex items-center gap-3 mb-4">
              {/* Facebook */}
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-50 hover:bg-teal-50 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:-translate-y-1 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </Link>
              {/* Twitter */}
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-50 hover:bg-teal-50 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:-translate-y-1 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </Link>
              {/* Instagram */}
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-50 hover:bg-teal-50 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:-translate-y-1 transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </Link>
              {/* LinkedIn */}
              <Link href="#" className="w-10 h-10 rounded-full bg-gray-50 hover:bg-teal-50 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:-translate-y-1 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </Link>
            </div>

            <p className="text-gray-500 text-[15px] mb-4">
              Stay updated with health tips and news
            </p>

            {/* Retained Newsletter functionality as requested */}
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
              />
              <Button 
                variant="solid" 
                className="w-full bg-gradient-to-tr from-teal-600 to-teal-400 text-white font-semibold shadow-md shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all duration-300 border-none rounded-lg"
              >
                Subscribe
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-[15px]">
            © {currentYear} HealSync. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-500 text-[15px] hover:text-teal-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 text-[15px] hover:text-teal-600 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-gray-500 text-[15px] hover:text-teal-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}