<style jsx global>{`
  /* MOBILE-ONLY SUPER AGGRESSIVE SPACE REDUCTION - DOES NOT AFFECT DESKTOP/TABLET */
  @media screen and (max-width: 640px) and (hover: none) and (pointer: coarse) {
    /* Target testimonials section specifically */
    body:not(.desktop) .testimonials-section {
      margin-top: -25px !important; /* Extreme negative margin to pull up */
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      margin-bottom: -30px !important; /* Pull up next section */
      max-height: 220px !important; /* Ultra-restrictive height */
      overflow: hidden !important;
    }
    
    /* Compress section title */
    body:not(.desktop) .testimonials-section h2, 
    body:not(.desktop) .testimonials-section .text-3xl {
      font-size: 0.9rem !important; /* Tiny section title */
      line-height: 0.8 !important;
      margin-top: 0 !important;
      margin-bottom: 3px !important;
      padding: 0 !important;
    }
    
    /* Eliminate subtitle */
    body:not(.desktop) .testimonials-section p.text-gray-600 {
      font-size: 0.6rem !important;
      line-height: 0.8 !important;
      margin-top: 0 !important;
      margin-bottom: 2px !important;
      max-height: 8px !important;
      overflow: hidden !important;
    }
    
    /* Ultra-compress testimonial cards */
    body:not(.desktop) .testimonials-section .grid {
      grid-gap: 0.5rem !important; /* Minimal gap */
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Make testimonial cards ultra-compact */
    body:not(.desktop) .testimonials-section .bg-white {
      padding: 3px !important; /* Microscopic padding */
      margin: 0 !important;
      min-height: unset !important;
      max-height: 90px !important; /* Restricted maximum height */
      border-radius: 3px !important; /* Smaller radius */
      transform: scale(0.9) !important; /* Slightly smaller */
      transform-origin: top center !important;
    }
    
    /* Compress testimonial card content */
    body:not(.desktop) .testimonials-section .bg-white > div {
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Ultra-small avatar */
    body:not(.desktop) .testimonials-section .w-12,
    body:not(.desktop) .testimonials-section .h-12 {
      width: 20px !important;
      height: 20px !important;
      min-width: 20px !important;
      min-height: 20px !important;
    }
    
    /* Testimonial author info */
    body:not(.desktop) .testimonials-section .font-bold {
      font-size: 0.6rem !important;
      line-height: 0.9 !important;
      margin-top: -2px !important;
      margin-bottom: 0 !important;
    }
    
    /* Author title text */
    body:not(.desktop) .testimonials-section .text-gray-600.text-sm {
      font-size: 0.5rem !important;
      line-height: 0.8 !important;
      margin-top: -1px !important;
      margin-bottom: 0 !important;
    }
    
    /* Star icons for rating */
    body:not(.desktop) .testimonials-section svg {
      width: 8px !important;
      height: 8px !important;
      margin: 0 !important;
    }
    
    /* Star rating container */
    body:not(.desktop) .testimonials-section .flex.space-x-1 {
      margin-top: -2px !important;
      margin-bottom: 0 !important;
      gap: 1px !important;
    }
    
    /* Quote content */
    body:not(.desktop) .testimonials-section .text-gray-700 {
      font-size: 0.55rem !important;
      line-height: 0.9 !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      overflow: hidden !important;
      max-height: 48px !important; /* Restrict quote height */
      text-overflow: ellipsis !important;
      display: -webkit-box !important;
      -webkit-line-clamp: 4 !important; /* Max 4 lines */
      -webkit-box-orient: vertical !important;
    }
    
    /* Space between grid items */
    body:not(.desktop) .testimonials-section .gap-5,
    body:not(.desktop) .testimonials-section .gap-4,
    body:not(.desktop) .testimonials-section .gap-8 {
      gap: 2px !important;
    }
    
    /* Container adjustments */
    body:not(.desktop) .testimonials-section .container {
      padding-left: 3px !important;
      padding-right: 3px !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }
    
    /* Make container at top of page absolutely positioned */
    body:not(.desktop) .testimonials-section > .container:first-child {
      position: static !important;
      margin-top: -20px !important;
    }
    
    /* Control grid size */
    body:not(.desktop) .testimonials-section .grid-cols-1 {
      grid-template-columns: repeat(1, 1fr) !important;
    }
    
    @media screen and (max-width: 480px) {
      /* Extra aggressive for very small screens */
      body:not(.desktop) .testimonials-section {
        max-height: 180px !important;
        margin-top: -35px !important;
        margin-bottom: -40px !important;
      }
      
      body:not(.desktop) .testimonials-section .bg-white {
        max-height: 70px !important;
      }
      
      body:not(.desktop) .testimonials-section .text-gray-700 {
        max-height: 32px !important;
        -webkit-line-clamp: 3 !important; /* Max 3 lines */
      }
    }
    
    @media screen and (max-width: 350px) {
      /* Most extreme for tiny screens */
      body:not(.desktop) .testimonials-section {
        max-height: 150px !important;
        margin-top: -45px !important;
        margin-bottom: -50px !important;
      }
      
      body:not(.desktop) .testimonials-section .bg-white {
        max-height: 60px !important;
        padding: 2px !important;
      }
      
      body:not(.desktop) .testimonials-section .text-gray-700 {
        max-height: 24px !important;
        -webkit-line-clamp: 2 !important; /* Max 2 lines */
        font-size: 0.5rem !important;
      }
      
      body:not(.desktop) .testimonials-section .font-bold {
        font-size: 0.55rem !important;
      }
      
      body:not(.desktop) .testimonials-section .text-gray-600.text-sm {
        font-size: 0.45rem !important;
      }
    }
  }
`}</style> 