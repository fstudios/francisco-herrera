<style jsx global>{`
  /* MOBILE-ONLY EXTREME SPACE REDUCTION - DOES NOT AFFECT DESKTOP/TABLET */
  @media screen and (max-width: 640px) and (hover: none) and (pointer: coarse) {
    /* Target events section specifically */
    body:not(.desktop) .events-section {
      margin-top: -25px !important; /* Negative margin to pull up */
      padding-top: 5px !important;
      padding-bottom: 5px !important;
      max-height: 440px !important; /* Restrict height */
      overflow: hidden !important;
    }
    
    /* Compress section title */
    body:not(.desktop) .events-section h2, 
    body:not(.desktop) .events-section .text-3xl {
      font-size: 1rem !important;
      line-height: 0.9 !important;
      margin-top: 0 !important;
      margin-bottom: 1px !important;
      padding: 0 !important;
    }
    
    /* Eliminate subtitle space */
    body:not(.desktop) .events-section p.text-gray-600,
    body:not(.desktop) .events-section .text-lg {
      font-size: 0.6rem !important;
      line-height: 0.8 !important;
      margin-top: 0 !important;
      margin-bottom: 2px !important;
      max-height: 8px !important;
    }
    
    /* Ultra-compress event listings container */
    body:not(.desktop) .events-section .grid,
    body:not(.desktop) .events-section .events-list {
      grid-gap: 3px !important; /* Minimal gap */
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Event cards */
    body:not(.desktop) .events-section .event-card {
      padding: 4px !important;
      margin-bottom: 4px !important;
      border-radius: 2px !important;
      min-height: unset !important;
    }
    
    /* Event date */
    body:not(.desktop) .events-section .event-date {
      font-size: 0.6rem !important;
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1 !important;
    }
    
    /* Event title */
    body:not(.desktop) .events-section .event-title {
      font-size: 0.75rem !important;
      line-height: 1 !important;
      margin: 1px 0 !important;
      font-weight: 600 !important;
    }
    
    /* Event location */
    body:not(.desktop) .events-section .event-location {
      font-size: 0.6rem !important;
      margin: 0 !important;
      line-height: 1 !important;
    }
    
    /* Event description */
    body:not(.desktop) .events-section .event-description {
      font-size: 0.6rem !important;
      line-height: 1.1 !important;
      margin: 1px 0 !important;
      max-height: 2.2em !important; /* Restrict to 2 lines */
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      display: -webkit-box !important;
      -webkit-line-clamp: 2 !important;
      -webkit-box-orient: vertical !important;
    }
    
    /* Event price */
    body:not(.desktop) .events-section .event-price {
      font-size: 0.65rem !important;
      font-weight: 600 !important;
      margin: 1px 0 !important;
    }
    
    /* Event buttons */
    body:not(.desktop) .events-section .event-buttons {
      margin-top: 2px !important;
      display: flex !important;
      gap: 4px !important;
    }
    
    body:not(.desktop) .events-section button,
    body:not(.desktop) .events-section .btn {
      padding: 2px 4px !important;
      font-size: 0.6rem !important;
      height: auto !important;
      min-height: unset !important;
      line-height: 1 !important;
      border-radius: 2px !important;
    }
    
    /* Calendar layout adjustments */
    body:not(.desktop) .events-section .calendar-view {
      padding: 2px !important;
      font-size: 0.6rem !important;
    }
    
    body:not(.desktop) .events-section .calendar-header {
      font-size: 0.7rem !important;
      padding: 2px !important;
    }
    
    body:not(.desktop) .events-section .calendar-day {
      height: 18px !important;
      width: 18px !important;
      font-size: 0.55rem !important;
      margin: 1px !important;
      padding: 1px !important;
    }
    
    body:not(.desktop) .events-section .calendar-day.has-event {
      background-size: 5px !important;
    }
    
    /* Container adjustments */
    body:not(.desktop) .events-section .container {
      padding-left: 4px !important;
      padding-right: 4px !important;
      margin-left: auto !important;
      margin-right: auto !important;
    }
    
    /* Icons in events */
    body:not(.desktop) .events-section svg,
    body:not(.desktop) .events-section .w-4,
    body:not(.desktop) .events-section .h-4 {
      width: 10px !important;
      height: 10px !important;
      min-width: 10px !important;
      min-height: 10px !important;
      margin-right: 2px !important;
    }
    
    /* Navigation arrows for event pagination */
    body:not(.desktop) .events-section .pagination-arrows button {
      padding: 0 !important;
      width: 20px !important;
      height: 20px !important;
    }
    
    /* Month selector if present */
    body:not(.desktop) .events-section .month-selector select {
      font-size: 0.6rem !important;
      padding: 1px !important;
      height: 18px !important;
    }
    
    /* Extra aggressive for smaller screens */
    @media screen and (max-width: 480px) {
      body:not(.desktop) .events-section {
        margin-top: -35px !important;
        max-height: 400px !important;
      }
      
      body:not(.desktop) .events-section .event-description {
        -webkit-line-clamp: 1 !important; /* Further restrict to 1 line */
        max-height: 1.1em !important;
      }
      
      body:not(.desktop) .events-section .event-card {
        padding: 3px !important;
      }
    }
    
    /* Most extreme for tiny screens */
    @media screen and (max-width: 350px) {
      body:not(.desktop) .events-section {
        margin-top: -40px !important;
        max-height: 370px !important;
      }
      
      body:not(.desktop) .events-section .event-title {
        font-size: 0.7rem !important;
      }
      
      body:not(.desktop) .events-section .event-description {
        display: none !important; /* Hide description entirely */
      }
      
      body:not(.desktop) .events-section .event-location,
      body:not(.desktop) .events-section .event-date,
      body:not(.desktop) .events-section .event-price {
        font-size: 0.55rem !important;
      }
    }
  }
`}</style> 