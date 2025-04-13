<style jsx global>{`
  /* MOBILE-ONLY SUPER AGGRESSIVE SPACE REDUCTION - DOES NOT AFFECT DESKTOP/TABLET */
  @media screen and (max-width: 640px) and (hover: none) and (pointer: coarse) {
    /* Target contact section specifically */
    body:not(.desktop) .contact-section {
      margin-top: -20px !important; /* Pull up the section */
      padding-top: 5px !important;
      padding-bottom: 5px !important;
      max-height: 420px !important; /* Restrictive height */
      overflow: hidden !important;
    }
    
    /* Compress section title */
    body:not(.desktop) .contact-section h2, 
    body:not(.desktop) .contact-section .text-3xl {
      font-size: 0.9rem !important; /* Tiny section title */
      line-height: 0.8 !important;
      margin-top: 0 !important;
      margin-bottom: 1px !important;
      padding: 0 !important;
    }
    
    /* Eliminate subtitle space */
    body:not(.desktop) .contact-section p.text-gray-600,
    body:not(.desktop) .contact-section .text-lg {
      font-size: 0.6rem !important;
      line-height: 0.8 !important;
      margin-top: 0 !important;
      margin-bottom: 2px !important;
      max-height: 8px !important;
    }
    
    /* Ultra-compress form container */
    body:not(.desktop) .contact-section .grid {
      grid-gap: 0 !important; /* No gap */
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Compress input fields */
    body:not(.desktop) .contact-section input,
    body:not(.desktop) .contact-section textarea,
    body:not(.desktop) .contact-section select {
      padding: 2px 4px !important; /* Minimal padding */
      margin-bottom: 2px !important;
      min-height: unset !important;
      height: auto !important;
      font-size: 0.7rem !important;
      border-radius: 2px !important;
    }
    
    /* Special for textarea */
    body:not(.desktop) .contact-section textarea {
      height: 40px !important;
      min-height: 40px !important;
      max-height: 40px !important;
    }
    
    /* Form field labels */
    body:not(.desktop) .contact-section label {
      font-size: 0.6rem !important;
      line-height: 1 !important;
      margin-bottom: 0 !important;
      margin-top: 0 !important;
    }
    
    /* Submit button */
    body:not(.desktop) .contact-section button[type="submit"],
    body:not(.desktop) .contact-section .bg-primary,
    body:not(.desktop) .contact-section .text-white {
      padding: 3px 6px !important;
      font-size: 0.7rem !important;
      height: auto !important;
      min-height: unset !important;
      border-radius: 2px !important;
      margin-top: 0 !important;
    }
    
    /* Form groups */
    body:not(.desktop) .contact-section .mb-4,
    body:not(.desktop) .contact-section .mb-6 {
      margin-bottom: 2px !important;
    }
    
    /* Contact details on the right side */
    body:not(.desktop) .contact-section .contact-details {
      margin-top: 0 !important;
      padding: 5px !important;
    }
    
    /* Contact detail items */
    body:not(.desktop) .contact-section .contact-item {
      margin-bottom: 2px !important;
      padding: 2px !important;
    }
    
    /* Icons in contact details */
    body:not(.desktop) .contact-section .contact-item svg,
    body:not(.desktop) .contact-section .w-5,
    body:not(.desktop) .contact-section .h-5 {
      width: 12px !important;
      height: 12px !important;
      min-width: 12px !important;
      min-height: 12px !important;
      margin-right: 3px !important;
    }
    
    /* Contact item text */
    body:not(.desktop) .contact-section .contact-item span,
    body:not(.desktop) .contact-section .contact-item a {
      font-size: 0.6rem !important;
      line-height: 1 !important;
    }
    
    /* Container adjustments */
    body:not(.desktop) .contact-section .container {
      padding-left: 3px !important;
      padding-right: 3px !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }
    
    /* Section grid columns - stack them with minimal spacing */
    body:not(.desktop) .contact-section .grid-cols-1 {
      margin-top: 0 !important;
    }
    
    /* Adjust spacing between form and contact details */
    body:not(.desktop) .contact-section .md:grid-cols-2 > div:first-child {
      margin-bottom: 5px !important;
    }
    
    /* Extra aggressive for smaller screens */
    @media screen and (max-width: 480px) {
      body:not(.desktop) .contact-section {
        margin-top: -30px !important;
        max-height: 380px !important;
      }
      
      body:not(.desktop) .contact-section textarea {
        height: 30px !important;
        min-height: 30px !important;
        max-height: 30px !important;
      }
      
      body:not(.desktop) .contact-section .contact-item svg,
      body:not(.desktop) .contact-section .w-5,
      body:not(.desktop) .contact-section .h-5 {
        width: 10px !important;
        height: 10px !important;
        min-width: 10px !important;
        min-height: 10px !important;
      }
    }
    
    /* Most extreme for tiny screens */
    @media screen and (max-width: 350px) {
      body:not(.desktop) .contact-section {
        margin-top: -40px !important;
        max-height: 350px !important;
      }
      
      body:not(.desktop) .contact-section input,
      body:not(.desktop) .contact-section select {
        height: 18px !important;
        font-size: 0.65rem !important;
      }
      
      body:not(.desktop) .contact-section textarea {
        height: 25px !important;
        min-height: 25px !important;
        max-height: 25px !important;
      }
      
      body:not(.desktop) .contact-section label {
        font-size: 0.55rem !important;
      }
    }
  }
`}</style> 