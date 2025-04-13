"use client"

export default function RotatingBanner() {
  return (
    <div className="w-full bg-black py-8 overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div className="inline-flex whitespace-nowrap animate-smooth-banner">
          {Array.from({ length: 15 }).map((_, index) => (
            <span key={index} className="text-white text-5xl md:text-7xl font-extrabold mx-8 uppercase">
              La <span className="text-red-500 mx-2">•</span> Música <span className="text-red-500 mx-2">•</span> Une
            </span>
          ))}
        </div>
      </div>

      {/* Custom animation for the banner */}
      <style jsx global>{`
        @keyframes smooth-banner {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-smooth-banner {
          animation: smooth-banner 40s linear infinite;
          will-change: transform;
        }
        
        /* Mobile performance optimization only */
        @media (max-width: 767px) {
          .animate-smooth-banner {
            animation-duration: 30s; /* Slightly faster on mobile for better performance */
          }
        }
        
        /* Accessibility - respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .animate-smooth-banner {
            animation-duration: 60s;
          }
        }
      `}</style>
    </div>
  )
}
