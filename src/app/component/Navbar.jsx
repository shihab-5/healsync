"use client";

import { useState } from "react";
import { 
  Link, 
  Button, 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  Avatar 
} from "@heroui/react";
import { HeartFill } from "@gravity-ui/icons";
import { usePathname, useRouter } from "next/navigation"; 
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Base navigation configuration
  const baseNavLinks = [
    { name: "Home", href: "/" },
    { name: "Find Doctors", href: "/findDoctors" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const dashboardLinks = {
    patient: '/dashboard/patient',
    doctor: '/dashboard/doctor',
    admin: '/dashboard/admin'
  };

  // Determine user's dynamic dashboard route cleanly
  const userRole = user?.role || 'patient';
  const dynamicDashboardHref = dashboardLinks[userRole];

  if (user?.email) {
    baseNavLinks.push({
      name: 'Dashboard', // Fixed typo: Changed 'label' to 'name' to match the loop below
      href: dynamicDashboardHref
    });
  }

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setIsOpen(false);
      toast.success("Logged out successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to safely sign out. Please try again.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/70 backdrop-blur-lg shadow-sm">
      <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        
        {/* Left: Premium Stylized Logo and Name (Teal Theme) */}
        <div className="flex items-center gap-3 cursor-pointer group select-none z-50" onClick={() => router.push("/")}>
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

        {/* Center: Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {baseNavLinks.map((item) => {
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
          {user ? (
            <Popover placement="bottom-end" backdrop="blur" offset={12}>
              <PopoverTrigger>
                <button className="focus:outline-none bg-transparent border-none p-0 flex items-center justify-center transition-transform duration-200 active:scale-95">
                  <Avatar className="w-9 h-9 ring-2 ring-teal-500 ring-offset-2 rounded-full">
                    <Avatar.Image 
                      src={user.image || undefined} 
                      alt={user.name || "User avatar"} 
                    />
                    <Avatar.Fallback>
                      {user.name ? user.name.slice(0, 2).toUpperCase() : "US"}
                    </Avatar.Fallback>
                  </Avatar>
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-2 w-56 border border-gray-100 rounded-2xl shadow-xl bg-white flex flex-col gap-1 items-stretch">
                <div className="px-3 py-2 flex flex-col border-b border-gray-50 mb-1 pointer-events-none select-none">
                  <p className="font-bold text-teal-800 text-sm truncate">{user.name || "User"}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push(dynamicDashboardHref)} // Fixed: Dynamically redirects to role-based dashboard
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors duration-150"
                >
                  My Dashboard
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors duration-150"
                >
                  Log Out
                </button>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link 
                href="/auth/login" 
                className="font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent hover:opacity-75 transition-opacity duration-300"
              >
                Login
              </Link>
              <Link href="/auth/register">
                <Button 
                  variant="solid" 
                  className="bg-gradient-to-tr from-teal-600 to-teal-400 text-white font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-0.5 transition-all duration-300 border-none rounded-full px-6"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
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
      <div className={`absolute top-0 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 ease-in-out md:hidden overflow-hidden z-40 ${isOpen ? "max-h-[480px] opacity-100 pt-20 pb-6 shadow-xl" : "max-h-0 opacity-0 pointer-events-none"}`}>
        <div className="flex flex-col px-6 space-y-5">
          
          {user && (
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <Avatar
                isBordered
                className="border-2 border-teal-500 w-10 h-10"
                name={user.name || "User"}
                src={user.image || undefined}
              />
              <div className="flex flex-col min-w-0">
                <p className="font-bold text-gray-900 text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <ul className="flex flex-col space-y-4">
            {baseNavLinks.map((item) => {
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
            {user ? (
              <button 
                type="button"
                onClick={handleLogout}
                className="w-full text-center py-2.5 font-bold text-red-600 border border-red-100 rounded-full bg-red-50/50 hover:bg-red-50 active:bg-red-100 transition-all duration-200"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2 font-bold text-teal-600 border border-teal-100 rounded-full bg-teal-50/30"
                >
                  Login
                </Link>
                <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="solid" 
                    className="w-full bg-gradient-to-tr from-teal-600 to-teal-400 text-white font-semibold shadow-lg shadow-teal-500/30 rounded-full py-5"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

    </nav>
  );
}