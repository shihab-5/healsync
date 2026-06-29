"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Bars, 
  LayoutColumns, 
  Calendar, 
  CreditCard, 
  Star, 
  Gear, 
  ArrowRightFromSquare,
  PersonSpeaker,
  PersonMagnifier,
  HouseFill,
  ChartBar,
} from "@gravity-ui/icons";
import { Button, Drawer, Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client"; 
import Link from "next/link";

export function Sidebar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [activeItem, setActiveItem] = useState("Payment History");

  const patientNav = [
    { icon: LayoutColumns,href:"/dashboard/patient", label: "Overview" },
    { icon: Calendar,href:"/dashboard/patient/myAppointments", label: "My Appointments" },
    { icon: CreditCard,href:"/dashboard/patient/paymentHistory", label: "Payment History" },
    { icon: Star, href:"/dashboard/patient/myreview",label: "My Reviews" },
  ];
  const doctorNav = [
    { icon: LayoutColumns,href:"/dashboard/doctor", label: "Overview" },
    { icon: Calendar,href:"/dashboard/doctor/manageSchedule", label: "Manage Schedule" },
    { icon: CreditCard,href:"/dashboard/doctor/appointments", label: "Appointments" },
    { icon: Star, href:"/dashboard/doctor/prescriptions",label: "Prescriptions" },
  ];

  const adminNav = [
  { 
    icon: LayoutColumns, 
    href: "/dashboard/admin", 
    label: "Overview" 
  },
  { 
    icon: PersonSpeaker, 
    href: "/dashboard/admin/manageUsers", 
    label: "Manage Users" 
  },
  { 
    icon: PersonMagnifier, 
    href: "/dashboard/admin/manageDoctors", 
    label: "Manage Doctors" 
  },
  { 
    icon: Calendar, 
    href: "/dashboard/admin/manageAppointments", 
    label: "Appointments" 
  },
  { 
    icon: CreditCard, 
    href: "/dashboard/admin/payments", 
    label: "Payments" 
  },
  { 
    icon:ChartBar, // or ChartColumn / BarChart
    href: "/dashboard/admin/analytics", 
    label: "Analytics" 
  },
];

   const navMap= {
    patient :patientNav,
    doctor  :doctorNav,
    admin   :adminNav
   }
   const navigationItems =navMap[user?.role||'patient']
console.log(user)

  const accountItems = [
    { icon: Gear,href:"/dashboard/patient/profile", label: "Profile Settings" },
    { icon: ArrowRightFromSquare, label: "Logout", isLogout: true },
  ];

  const handleLogout = async () => {
    await authClient.signOut({
      callbackURL: "/auth/login",
    });
  };

  const renderNavList = (items) => (
    <div className="flex flex-col gap-1.5">
      {items.map((item) => {
        const isActive = activeItem === item.label;
        return (
          <Link
            href={item.href||"#"}

            key={item.label}
            onClick={() => item.isLogout ? handleLogout() : setActiveItem(item.label)}
            className={`group flex items-center justify-between w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 outline-none
              ${isActive 
                ? "bg-teal-600 text-white shadow-md shadow-teal-600/20" 
                : item.isLogout
                  ? "text-rose-500 hover:bg-slate-100 active:bg-slate-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100"
              }`}
            type="button"
          >
            <div className="flex items-center gap-3">
              <item.icon className={`size-5 shrink-0 ${isActive ? "text-white" : item.isLogout ? "text-rose-500" : "text-slate-400 group-hover:text-slate-600"}`} />
              <span>{item.label}</span>
            </div>
            {isActive && (
              <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </Link>
        );
      })}
    </div>
  );

  const navContent = (
    <div className="flex flex-col gap-6">
      {/* Brand Logo Header Block */}
      <div className="flex items-center gap-3 cursor-pointer group select-none z-50 px-2 pb-2" onClick={() => router.push("/")}>
       

      
      </div>

      {/* Profile Header Card */}
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100 px-2">
        {isPending ? (
          <div className="animate-pulse flex items-center gap-3 w-full">
            <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0" />
            <div className="flex-col items-start gap-2 flex-1 min-w-0">
              <div className="h-4 bg-slate-200 rounded w-2/3" />
              <div className="h-5 bg-slate-100 rounded-full w-16 border border-slate-200" />
            </div>
          </div>
        ) : user ? (
          <>
            <Avatar className="w-12 h-12 ring-2 ring-teal-500/30 rounded-full shrink-0">
              <Avatar.Image src={user.image} alt={user.name} />
              <Avatar.Fallback className="bg-gradient-to-br from-teal-700 to-teal-500 text-white font-bold">{user.name?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col items-start min-w-0">
              <span className="font-bold text-slate-800 text-base truncate w-full">{user.name}</span>
              <span className="mt-1 px-3 py-0.5 bg-teal-50 text-teal-700 text-xs font-bold rounded-full border border-teal-100 capitalize">
                {user.role || "patient"}
              </span>
            </div>
          </>
        ) : (
          <div className="text-slate-400 text-sm font-semibold px-2">Not signed in</div>
        )}
      </div>

      {/* Navigation Group */}
      <div className="space-y-3">
        <p className="px-4 text-xs font-bold uppercase tracking-wider text-teal-600/70 select-none">Navigation</p>
        {renderNavList(navigationItems)}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 my-1" />

      {/* Account Group */}
      <div className="space-y-3">
        <p className="px-4 text-xs font-bold uppercase tracking-wider text-teal-600/70 select-none">Account</p>
        {renderNavList(accountItems)}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Panel */}
      <aside className="hidden w-64 shrink-0 flex-col gap-2 bg-white border-r border-slate-100 p-4 lg:flex min-h-screen shadow-sm">
        {navContent}
      </aside>

      {/* Mobile Menu Action Bar */}
      <div className="lg:hidden p-4 bg-white border-b border-slate-100 flex items-center justify-between w-full shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => router.push("/")}>
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-700 via-teal-600 to-teal-400 shadow-sm shadow-teal-500/20">
           
          </div>
       
        </div>
        <Drawer>
          <Button 
            className="bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold rounded-xl border-none" 
            variant="flat"
          >
            <Bars />
            Menu
          </Button>
          <Drawer.Backdrop className="bg-slate-900/20 backdrop-blur-sm">
            <Drawer.Content placement="left" className="bg-white max-w-xs border-r border-slate-100 p-0">
              <Drawer.Dialog className="outline-none h-full flex flex-col">
                <Drawer.Header className="px-6 pt-6 pb-2 flex items-center justify-between border-b border-slate-100">
                  <Drawer.Heading className="text-sm font-bold uppercase tracking-wider text-teal-600/70">
                    Control Panel
                  </Drawer.Heading>
                  <Drawer.CloseTrigger className="text-slate-400 hover:text-slate-600 rounded-lg transition-colors p-1 bg-slate-50" />
                </Drawer.Header>
                <Drawer.Body className="p-6 flex-1 overflow-y-auto">
                  {navContent}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}