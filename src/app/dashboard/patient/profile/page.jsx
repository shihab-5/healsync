'use client';

import React from 'react';
import { Card } from '@heroui/react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, CircleExclamation, Key } from '@gravity-ui/icons';
import Image from 'next/image';

// Master orchestrated entrance transitions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 } 
  }
};

const PatientProfile = ({ user }) => {
  const rawDate = user?.createdAt?.$date || user?.createdAt;
  const accountCreatedDate = rawDate 
    ? new Date(rawDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  const accountId = user?._id?.$oid || 'No ID available';
  const isVerified = user?.emailVerified ?? false;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen bg-gradient-to-br from-[#022c22] via-[#0D9488] to-[#115e59] p-6 md:p-10 text-white flex flex-col items-center justify-start overflow-hidden select-none"
    >
      {/* Ambient lighting layer overlays */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-white/5 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-black/20 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="w-full max-w-4xl space-y-8 z-10 mt-4">
        
        {/* Header Section */}
        <motion.div variants={cardEntranceVariants} className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
            My Profile
          </h1>
          <p className="text-teal-100/70 text-sm">
            Manage your personal account information
          </p>
        </motion.div>

        {/* 1. Main Profile Hero Card */}
        <motion.div 
          variants={cardEntranceVariants}
          whileHover={{ 
            y: -5, 
            borderColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
          }}
          className="transition-all duration-300 ease-out"
        >
          <Card className="relative overflow-hidden border border-white/10 bg-black/15 backdrop-blur-xl p-2 rounded-2xl shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
              
              {/* Dynamic Photo Frame with Breath Animation */}
              <motion.div 
                whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 200 } }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative cursor-pointer"
              >
                {/* Emerald Glow Ring behind the image */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#0D9488] to-teal-300 rounded-2xl opacity-60 blur-sm" />
                <Image
                  src={user?.image || 'https://images.pexels.com/photos/30002405/pexels-photo-30002405.jpeg'}
                  alt={`${user?.name || 'User'}'s profile avatar`}
                  width={112}
                  height={112}
                  priority
                  className="relative w-28 h-28 object-cover rounded-2xl border border-white/10 shadow-md bg-teal-950"
                />
              </motion.div>

              {/* User Identity Info Stack */}
              <div className="flex flex-col items-center sm:items-start space-y-3 flex-1 text-center sm:text-left">
                <div className="space-y-0.5">
                  <h2 className="text-2xl font-bold tracking-tight text-white capitalize">
                    {user?.name || 'Meaw'}
                  </h2>
                  <p className="text-teal-100/60 text-sm font-medium">
                    {user?.email || 'meaw@meaw.com'}
                  </p>
                </div>

                {/* Role Badge */}
                <span className="inline-flex items-center text-[11px] font-extrabold tracking-widest text-white uppercase bg-white/10 px-4 py-1.5 rounded-full border border-white/20 shadow-sm backdrop-blur-md">
                  {user?.role || 'patient'}
                </span>
              </div>

            </div>
          </Card>
        </motion.div>

        {/* Operational Analytics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 2. Security Status Card Block */}
          <motion.div 
            variants={cardEntranceVariants} 
            whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.15)' }}
            className="transition-all duration-300 ease-out"
          >
            <Card className="h-full border border-white/5 bg-black/10 backdrop-blur-lg p-5 rounded-xl flex items-center justify-center text-center flex-col gap-2 min-h-[160px]">
              <div className={`p-2.5 rounded-xl border ${isVerified ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                {isVerified ? <ShieldCheck style={{ fontSize: '20px' }} /> : <CircleExclamation style={{ fontSize: '20px' }} />}
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-teal-200/50">Security Status</p>
                <p className="text-sm font-semibold mt-0.5 text-white">
                  {isVerified ? 'Verified Account Credentials' : 'Email Address Unverified'}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* 3. Registration Date Card Block */}
          <motion.div 
            variants={cardEntranceVariants} 
            whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.15)' }}
            className="transition-all duration-300 ease-out"
          >
            <Card className="h-full border border-white/5 bg-black/10 backdrop-blur-lg p-5 rounded-xl flex items-center justify-center text-center flex-col gap-2 min-h-[160px]">
              <div className="p-2.5 bg-white/5 text-teal-200 border border-white/10 rounded-xl">
                <Calendar style={{ fontSize: '20px' }} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-teal-200/50">Registration Date</p>
                <p className="text-sm font-semibold mt-0.5 text-white">
                  Joined {accountCreatedDate}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* 4. Secure Unique Token Card Block */}
          <motion.div 
            variants={cardEntranceVariants} 
            whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.15)' }}
            className="md:col-span-2 transition-all duration-300 ease-out"
          >
            <Card className="border border-white/5 bg-black/10 backdrop-blur-lg p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 p-1">
                <div className="p-2.5 bg-white/5 text-teal-200 border border-white/10 rounded-xl">
                  <Key style={{ fontSize: '20px' }} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-teal-200/50">Secure Profile Token ID</p>
                  <code className="text-xs font-mono text-teal-300 select-all tracking-wider block mt-1 bg-black/30 px-2.5 py-1 rounded border border-white/5 w-fit">
                    {accountId}
                  </code>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default PatientProfile;