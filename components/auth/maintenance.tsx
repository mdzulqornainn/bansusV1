"use client";

import { Crown, Diamond, Loader, Sparkles, Star, Zap } from "lucide-react";
import Image from "next/image";

const MaintenancePage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-4 sm:px-6 lg:px-8 overflow-hidden relative lg:pt-8">
      {/* Background Geometric Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-500/5 to-transparent"></div>

        {/* Floating Particles - Responsive positioning */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-twinkle shadow-yellow-glow"></div>
        <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full animate-twinkle-delay-1"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-300 rounded-full animate-twinkle-delay-2 shadow-yellow-glow"></div>
        <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-yellow-200 rounded-full animate-twinkle-delay-3"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-twinkle-delay-4"></div>

        {/* Geometric Shapes - Responsive sizes */}
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-4 h-4 sm:w-8 sm:h-8 border border-yellow-400/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-3 h-3 sm:w-6 sm:h-6 border border-white/20 rotate-45 animate-spin-reverse"></div>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-6 sm:space-y-8 lg:space-y-10 animate-fade-in-up relative z-10 w-full max-w-4xl mx-auto">
        {/* Logo Container with Premium Design - Responsive */}
        <div className="relative flex items-center justify-center">
          {/* Outer Ring - Yellow - Responsive */}
          <div className="absolute w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 border-2 border-yellow-400/40 rounded-full animate-spin-slow"></div>
          {/* Middle Ring - White - Responsive */}
          <div className="absolute w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 border border-white/30 rounded-full animate-spin-reverse"></div>

          {/* Main Logo Container - Responsive */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl animate-float border-2 sm:border-4 border-white/20">
            <Image
              src="/bansus.png"
              width={40}
              height={40}
              alt="Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 drop-shadow-lg"
            />
            {/* Premium Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-yellow-300 rounded-full blur-lg sm:blur-xl opacity-60 animate-pulse-glow"></div>
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl sm:blur-2xl opacity-30 animate-pulse-glow"></div>
          </div>

          {/* Orbiting Premium Elements - Responsive */}
          <div className="absolute w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 animate-orbit">
            <Crown className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400 drop-shadow-lg" />
          </div>
          <div className="absolute w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 animate-orbit-reverse">
            <Diamond className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Premium Title - Responsive */}
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 animate-text-shimmer bg-300% tracking-wide sm:tracking-wider drop-shadow-2xl">
            Server Under Maintenance
          </h1>
          {/* Elegant Underline - Responsive */}
          <div className="flex justify-center items-center space-x-1 sm:space-x-2">
            <div className="w-4 sm:w-6 lg:w-8 h-0.5 bg-white/60"></div>
            <div className="w-8 sm:w-12 lg:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 animate-width-pulse shadow-yellow-glow"></div>
            <div className="w-4 sm:w-6 lg:w-8 h-0.5 bg-white/60"></div>
          </div>
        </div>

        {/* Premium Description - Responsive */}
        <p className="text-white/80 max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto text-sm sm:text-base lg:text-xl leading-relaxed animate-fade-in-delay font-light tracking-wide px-4 sm:px-0">
          Mohon tunggu, aplikasi sedang{" "}
          <span className="text-yellow-400 font-medium">
            dalam pemeliharaan
          </span>
          .
        </p>

        {/* Premium Loading Progress - Responsive */}
        <div className="w-64 sm:w-72 lg:w-80 mx-auto space-y-4 sm:space-y-5 lg:space-y-6 px-4 sm:px-0">
          {/* Progress Container */}
          <div className="relative">
            <div className="w-full bg-gray-800/60 rounded-full h-2 sm:h-2.5 lg:h-3 overflow-hidden border border-white/10">
              <div className="h-2 sm:h-2.5 lg:h-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-full animate-loading-bar shadow-yellow-glow"></div>
            </div>
            {/* Progress Indicators - Responsive */}
            <div className="absolute -top-0.5 sm:-top-1 left-0 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-yellow-400 rounded-full animate-pulse border-1 sm:border-2 border-white shadow-yellow-glow"></div>
            <div className="absolute -top-0.5 sm:-top-1 right-0 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-white rounded-full animate-pulse border-1 sm:border-2 border-yellow-400"></div>
          </div>

          {/* Premium Animated Icons - Responsive */}
          <div className="flex justify-center items-center space-x-4 sm:space-x-6 lg:space-x-8">
            <div className="animate-bounce-1 p-1.5 sm:p-2 bg-yellow-400/10 rounded-full border border-yellow-400/30">
              <Loader className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400 animate-spin" />
            </div>
            <div className="animate-bounce-2 p-1.5 sm:p-2 bg-white/10 rounded-full border border-white/30">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white animate-pulse" />
            </div>
            <div className="animate-bounce-3 p-1.5 sm:p-2 bg-yellow-400/10 rounded-full border border-yellow-400/30">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-300 animate-ping" />
            </div>
            <div className="animate-bounce-4 p-1.5 sm:p-2 bg-white/10 rounded-full border border-white/30">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Premium Loading Dots - Responsive */}
        <div className="flex justify-center items-center space-x-2 sm:space-x-3">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-yellow-400 rounded-full animate-bounce-dot-1 shadow-yellow-glow"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white rounded-full animate-bounce-dot-2 shadow-white-glow"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-yellow-300 rounded-full animate-bounce-dot-3 shadow-yellow-glow"></div>
        </div>

        {/* Loading Status Text - Responsive */}
        <div className="animate-fade-in-delay-2">
          <p className="text-yellow-400/80 text-xs sm:text-sm font-medium tracking-wide sm:tracking-widest uppercase">
            Preparing Experience...
          </p>
        </div>
      </div>

      {/* Corner Decorations - Responsive */}
      <div className="absolute top-3 sm:top-6 left-3 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-l-2 border-t-2 border-yellow-400/40"></div>
      <div className="absolute top-3 sm:top-6 right-3 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-r-2 border-t-2 border-white/40"></div>
      <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-l-2 border-b-2 border-white/40"></div>
      <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-r-2 border-b-2 border-yellow-400/40"></div>
    </section>
  );
};

export default MaintenancePage;
