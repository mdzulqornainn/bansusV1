'use client';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}

        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/10 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-1/4 left-16 w-20 h-20 border-2 border-gray-600/30 transform rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-400/5 via-transparent to-transparent"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      {/* Main loading container */}
      <div className="flex flex-col items-center space-y-6 relative z-10">
        {/* Modern spinner */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-20 h-20 border-3 border-transparent border-t-yellow-400 border-r-yellow-300 rounded-full animate-spin"></div>

          {/* Middle ring */}
          <div className="absolute inset-2 w-16 h-16 border-2 border-transparent border-b-white border-l-gray-300 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>

          {/* Inner pulsing core with image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400 shadow-lg">
              <Image
                src="/bansus.png"
                alt="Bansus Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Animated text */}
        <div className="text-center">
          <div className="text-white text-lg font-bold tracking-widest">
            <span className="inline-block animate-pulse" style={{ animationDelay: '0s' }}>L</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.1s' }}>O</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>A</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.3s' }}>D</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>I</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>N</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.6s' }}>G</span>
          </div>
        </div>
      </div>
    </div>
  );
}