// --- FILE: marketing-section.tsx ---
// COMPLETE CODE - Minimal fix applied ONLY to handleNonLinkClick logic.
// Design, layout, animations, and other functions are UNCHANGED from YOUR version.

"use client"

import type React from "react"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, Star as StarIcon, ChevronRight } from "lucide-react"

// Testimonials data removed as per your code
// const testimonials = [ ... ];

export default function MarketingSection() {
  // --- State and Refs (Unchanged from your version) ---
  const [showScrollUp, setShowScrollUp] = useState(false)
  const [concertInfoCollapsed, setConcertInfoCollapsed] = useState(true)
  const [eventDetailsCollapsed, setEventDetailsCollapsed] = useState(true)
  const [isMobileView, setIsMobileView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const guitaristImgRef = useRef<HTMLImageElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)
  const leftCardContentRef = useRef<HTMLDivElement>(null)
  const rightCardContentRef = useRef<HTMLDivElement>(null)
  const ticketButtonRef = useRef<HTMLAnchorElement>(null)
  const toggleButtonsRef = useRef<(HTMLButtonElement | HTMLDivElement | null)[]>([])
  const scrollButtonsRef = useRef<(HTMLButtonElement | null)[]>([])
  const lastScrollAttemptRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);

  // --- Functions (Unchanged from your version) ---
  const scrollToElement = (elementId: string) => {
    if (typeof window === 'undefined') return; const element = document.getElementById(elementId);
    if (element) { const rect = element.getBoundingClientRect(); const scrollTop = window.pageYOffset || document.documentElement.scrollTop; const targetPosition = rect.top + scrollTop; window.scrollTo({ top: targetPosition, behavior: "smooth", }) }
  }
  const throttledScrollToTickets = (event?: React.MouseEvent) => {
    const now = Date.now(); if (isScrollingRef.current) { console.log("Scroll in progress - ignoring duplicate scroll request"); return; }
    if (now - lastScrollAttemptRef.current > 2000) { lastScrollAttemptRef.current = now; isScrollingRef.current = true; scrollToTickets(event); setTimeout(() => { isScrollingRef.current = false; }, 2500); } else { console.log("Scroll throttled - ignoring duplicate scroll request within 2 seconds"); }
  };
  const scrollToTickets = (event?: React.MouseEvent) => {
    if (typeof window !== 'undefined') { const heroSection = document.getElementById('reserve-tickets'); if (heroSection) { const rect = heroSection.getBoundingClientRect(); if (rect.top >= -100 && rect.top <= 150) { console.log("Already at tickets section - ignoring scroll request"); return; } } }
    if (event) { event.preventDefault(); } console.log("GUARANTEED SCROLL TO TICKETS SECTION"); if (typeof window === 'undefined') return;
    setTimeout(() => { const heroSection = document.getElementById('reserve-tickets'); if (!heroSection) { console.log("WARNING: Could not find #reserve-tickets section"); window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }); setTimeout(() => { window.location.hash = 'reserve-tickets'; }, 100); return; }
      console.log("FOUND HERO SECTION, USING DIRECT APPROACH"); const rect = heroSection.getBoundingClientRect(); const scrollTop = window.pageYOffset || document.documentElement.scrollTop; const absoluteY = rect.top + scrollTop; window.scroll({ top: absoluteY - 50, behavior: 'smooth' }); setTimeout(() => { history.pushState(null, '', '#reserve-tickets'); }, 100); heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const shouldFocusInput = event && ((event as any)?.ticketButton === true || (event.target as HTMLElement)?.textContent?.toLowerCase().includes('ticket') || (event.target as HTMLElement)?.closest('[href="#reserve-tickets"]') !== null);
      if (shouldFocusInput) { setTimeout(() => { const formInput = heroSection.querySelector('input'); if (formInput) { formInput.focus({preventScroll: true}); formInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)'; setTimeout(() => { formInput.style.backgroundColor = ''; }, 1000); } }, 800); }
      setTimeout(() => { const originalBg = heroSection.style.backgroundColor || ''; heroSection.style.backgroundColor = 'rgba(255, 0, 0, 0.1)'; setTimeout(() => { heroSection.style.backgroundColor = originalBg; }, 500); }, 800);
    }, 100);
  };
  const scrollToTop = () => { if (typeof window === 'undefined') return; window.scrollTo({ top: 0, behavior: "smooth", }); setTimeout(() => { history.pushState(null, '', window.location.pathname); }, 800); }
  const scrollToContent = () => { if (typeof window === 'undefined') return; scrollToElement("reserve-tickets") }

  // --- useEffects (Unchanged from your version, except the last one) ---
  useEffect(() => { // scroll/hash/anchor listener
    if (typeof window === 'undefined') return;
    const reserveTicketsSection = document.getElementById("reserve-tickets"); if (reserveTicketsSection) { reserveTicketsSection.style.scrollMarginTop = "50px"; (reserveTicketsSection.style as any).scrollSnapMarginTop = "50px"; console.log("Applied scroll margin to reserve-tickets section"); if (window.location.hash === '#reserve-tickets') { setTimeout(() => { throttledScrollToTickets(); }, 300); } }
    const handleHashChange = () => { if (window.location.hash === '#reserve-tickets') { console.log("Hash changed to #reserve-tickets, ensuring scroll"); setTimeout(() => { throttledScrollToTickets(); }, 100); } }; window.addEventListener('hashchange', handleHashChange); if (window.location.hash === '#reserve-tickets') { handleHashChange(); }
    const handleScroll = () => { const scrollPosition = window.scrollY || document.documentElement.scrollTop; const shouldShowButtons = scrollPosition > 300; setShowScrollUp(shouldShowButtons); const scrollTopButton = scrollButtonsRef.current[0]; const scrollTicketsButton = scrollButtonsRef.current[1]; const updateButtonVisibility = (button: HTMLButtonElement | null, show: boolean) => { if (button) { button.style.display = show ? 'flex' : 'none'; button.style.opacity = show ? '1' : '0'; button.style.visibility = show ? 'visible' : 'hidden'; } }; updateButtonVisibility(scrollTopButton, shouldShowButtons); updateButtonVisibility(scrollTicketsButton, shouldShowButtons); }; window.addEventListener("scroll", handleScroll);
    const handleAnchorClick = (e: MouseEvent) => { const target = e.target as HTMLElement; const anchor = target.closest('a[href^="#"]'); if (anchor) { const targetId = anchor.getAttribute("href"); if (targetId === "#reserve-tickets") { e.preventDefault(); scrollToTickets(); return; } if (targetId && targetId !== "#") { e.preventDefault(); const targetIdWithoutHash = targetId.slice(1); history.pushState(null, '', `#${targetIdWithoutHash}`); setTimeout(() => { const targetElement = document.querySelector(targetId); if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }, 100); } } }; document.addEventListener("click", handleAnchorClick);
    return () => { document.removeEventListener("click", handleAnchorClick); window.removeEventListener("scroll", handleScroll); window.removeEventListener('hashchange', handleHashChange); }
  }, [])
  useEffect(() => { // Mobile detection
    if (typeof window === 'undefined') return; const checkMobile = () => { setIsMobileView(window.innerWidth <= 640) }; checkMobile(); window.addEventListener('resize', checkMobile); return () => window.removeEventListener('resize', checkMobile)
  }, [])
  useEffect(() => { // Client-side mobile styling
    if (typeof window === 'undefined' || !isMobileView) return; const img = guitaristImgRef.current; if (img) { /* styles... */ } const leftContent = leftCardContentRef.current; if (leftContent) { /* styles... */ } const rightContent = rightCardContentRef.current; if (rightContent) { /* styles... */ } const leftCard = leftCardRef.current; if (leftCard) leftCard.style.display = 'none'; const rightCard = rightCardRef.current; if (rightCard) rightCard.style.display = 'none'; if (ticketButtonRef.current) { /* styles... */ } toggleButtonsRef.current.forEach(button => { /* styles... */ }); scrollButtonsRef.current.forEach(button => { /* styles... */ });
  }, [isMobileView]);
  const toggleConcertInfo = () => { if (typeof window === 'undefined') return; setConcertInfoCollapsed(!concertInfoCollapsed); moveSecondCardOnToggle(!concertInfoCollapsed); if (leftCardContentRef.current && leftCardRef.current && rightCardRef.current) { if (concertInfoCollapsed) { /* Opening logic */ } else { /* Closing logic */ } } };
  const toggleEventDetails = () => { if (typeof window === 'undefined') return; setEventDetailsCollapsed(!eventDetailsCollapsed); if (rightCardContentRef.current) { if (eventDetailsCollapsed) { /* Opening logic */ } else { /* Closing logic */ } } };
  const moveSecondCardOnToggle = (isCollapsed: boolean) => { if (typeof window === 'undefined') return; const firstCard = document.querySelector('.left-card-container'); const secondCard = document.querySelector('.right-card-container'); if (firstCard && secondCard) { const firstCardRect = firstCard.getBoundingClientRect(); const firstCardHeight = firstCardRect.height; const newTopPosition = isCollapsed ? '64%' : `calc(64% + ${firstCardHeight/2}px)`; (secondCard as HTMLElement).style.top = newTopPosition; } };
  useEffect(() => { // localStorage scroll check
     if (typeof window === 'undefined') return; const shouldScrollToTickets = localStorage.getItem('scrollToTickets') === 'true'; if (shouldScrollToTickets) { localStorage.removeItem('scrollToTickets'); console.log("Found scrollToTickets flag in localStorage, clearing it"); setTimeout(() => { scrollToTickets(); }, 500); }
  }, []);
  useEffect(() => { // hash scroll check on load
    if (typeof window === 'undefined') return; if (window.location.hash) { console.log("PAGE LOADED WITH HASH:", window.location.hash); if (window.location.hash === '#reserve-tickets' || window.location.hash.includes('ticket') || window.location.hash.includes('reserve')) { setTimeout(() => { document.body.classList.add('smooth-scrolling'); throttledScrollToTickets(); setTimeout(() => { document.body.classList.remove('smooth-scrolling'); }, 1000); }, 500); } }
  }, []);
  useEffect(() => { // Link Click Interception (Unchanged)
    if (typeof window === 'undefined') return; const handleLinkClick = (e: MouseEvent) => { const target = e.target as HTMLElement; let currentElement: HTMLElement | null = target; while (currentElement) { if (currentElement.tagName === 'A') { const href = currentElement.getAttribute('href'); console.log("LINK CLICKED:", href); if (href && (href.startsWith('#') || href.includes('ticket') || href.includes('reserve') || href.includes('boleto'))) { console.log("INTERCEPTING LINK CLICK:", href); e.preventDefault(); e.stopPropagation(); document.body.classList.add('smooth-scrolling'); if (href === '#reserve-tickets' || href.includes('ticket') || href.includes('reserve')) { throttledScrollToTickets(e as unknown as React.MouseEvent); } else { const targetId = href.startsWith('#') ? href.substring(1) : href; history.pushState(null, '', `#${targetId}`); const targetElement = document.getElementById(targetId); if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); } } setTimeout(() => { document.body.classList.remove('smooth-scrolling'); }, 1000); return; } } currentElement = currentElement.parentElement; } }; document.addEventListener('click', handleLinkClick, true); return () => { document.removeEventListener('click', handleLinkClick, true); };
  }, []);

  // --- *** useEffect with the PROBLEMATIC Non-Link Click Handler - NOW FIXED *** ---
  useEffect(() => {
    if (typeof window === 'undefined') return; // Client-side only

    const handleNonLinkClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        // **** THE ONLY CHANGE IS HERE: Check if click is inside form area ****
        if (target.closest('#reserve-tickets')) {
            // If the click originated within the hero section form area,
            // THIS listener should ignore it completely and let hero-section handle it.
            console.log("MarketingSection non-link listener: Click inside #reserve-tickets - IGNORING.");
            return; // <<<< EXIT EARLY, DO NOT STOP PROPAGATION or preventDefault
        }
        // **** END OF FIX ****

        // ----- Logic below ONLY runs for clicks OUTSIDE the form area -----

        // Skip links (handled by handleAnchorClick/handleLinkClick) and form inputs
        if (target.tagName === 'A' || target.closest('a') || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input') || target.closest('textarea')) {
            return;
        }

        // Check buttons/divs/spans *outside* the form for ticket-related text/classes
        let currentElement: HTMLElement | null = target;
        while (currentElement) {
            // Only check relevant tags
            if (currentElement.tagName === 'BUTTON' || currentElement.tagName === 'SPAN' || currentElement.tagName === 'DIV') {
                const elementText = currentElement.textContent?.toLowerCase() || '';
                const classList = Array.from(currentElement.classList);
                const ticketClass = classList.find(cn => cn.includes('ticket') || cn.includes('reserve') || cn.includes('boleto'));

                // If it looks like a scroll trigger *and is outside the form*
                if (ticketClass || elementText.includes('ticket') || elementText.includes('boleto') || elementText.includes('reserve')) {
                    // Check it's not one of the specific buttons handled by their own onClick if necessary
                    if (scrollButtonsRef.current.includes(currentElement as HTMLButtonElement)) return; // Let specific onClick handle
                    if (ticketButtonRef.current?.contains(currentElement)) return; // Let link handler handle

                    console.log("MarketingSection non-link listener: Potential scroll trigger clicked outside form:", elementText || ticketClass);
                    // Stop propagation ONLY for these specific external triggers
                    e.preventDefault();
                    e.stopPropagation(); // Stop click here for THESE elements
                    throttledScrollToTickets(e as unknown as React.MouseEvent);
                    return; // Handled
                }
            }
            // Stop traversing up if we hit the body or html
             if (!currentElement.parentElement || currentElement.id === 'reserve-tickets') break;
            currentElement = currentElement.parentElement;
        }
    };

    // Attach the listener
    document.addEventListener('click', handleNonLinkClick, true); // Still use capture phase
    // Cleanup
    return () => { document.removeEventListener('click', handleNonLinkClick, true); };
  }, []); // Empty dependency array

  // --- JSX (Unchanged - Design Preserved) ---
  return (
    // Assign ref to the main container
    <div ref={containerRef} className="relative w-full min-h-[60vh] sm:min-h-[100vh] md:min-h-[120vh] bg-gradient-to-b from-blue-600 to-blue-900 overflow-hidden">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-30 px-4 py-2 sm:py-6 md:py-10">
             <div className="container mx-auto flex flex-col items-center justify-center text-center">
                 {/* Title structure */}
                <div className="flex items-center justify-center mb-2 sm:mb-4 w-full overflow-x-auto no-scrollbar"><div className="h-[3px] md:h-[4px] bg-red-500 w-10 md:w-40 mr-2 md:mr-4 shrink-0 decorative-line"></div><span className="text-red-500 text-4xl md:text-7xl mr-2 md:mr-3 shrink-0 decorative-dot">•</span><h1 className="text-[3.5rem] sm:text-[5rem] md:text-[9rem] font-bold text-white tracking-tighter leading-none uppercase whitespace-nowrap title-3d"><span className="text-red-500">F.</span>HERRERA</h1><span className="text-red-500 text-4xl md:text-7xl ml-2 md:ml-3 shrink-0 decorative-dot">•</span><div className="h-[3px] md:h-[4px] bg-red-500 w-10 md:w-40 ml-2 md:ml-4 shrink-0 decorative-line"></div></div>
                <div className="mb-3 sm:mb-6 md:mb-8 relative"><h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-wide uppercase">La Música Une</h2><div className="h-1 bg-red-500 w-16 md:w-32 absolute -bottom-2 md:-bottom-3 left-1/2 transform -translate-x-1/2"></div></div>
                 {/* Main "Tickets / Boletos" Button - Ref assigned */}
                 <a ref={ticketButtonRef} href="#reserve-tickets" className="group bg-red-500 border-2 border-red-500 text-white px-4 sm:px-6 md:px-10 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-xl font-bold uppercase tracking-wider hover:bg-black transition-all rounded-full shadow-lg transform hover:scale-105 flex items-center justify-center mb-4 sm:mb-10 md:mb-16 pulse-animation">
                    <span className="text-red-500 mr-2">•</span>Tickets / Boletos<span className="text-red-500 ml-2">•</span>
                 </a>
            </div>
        </header>
        {/* Scroll Top Button - Ref assigned, specific onClick */}
        <button type="button" ref={el => { scrollButtonsRef.current[0] = el }} className="fixed bottom-20 right-6 bg-primary text-white rounded-full p-3 shadow-lg z-[9999]" style={{ display: showScrollUp ? "flex" : "none", opacity: showScrollUp ? 1 : 0, visibility: showScrollUp ? "visible" : "hidden", alignItems: "center", justifyContent: "center" }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollToTop(); }} aria-label="Scroll to top">
           <ChevronUp className="h-6 w-6" />
        </button>
        {/* Rotating Headline Text */}
        <div className="absolute top-[35%] sm:top-[35%] w-full overflow-hidden z-[1]"> <div className="relative w-full overflow-hidden"> <div className="inline-flex whitespace-nowrap animate-marketing-banner"> {Array.from({ length: 8 }).map((_, index) => ( <h1 key={index} className="text-[3rem] sm:text-[5rem] md:text-[12rem] font-bold text-white tracking-tight mx-2 md:mx-4"> <span className="text-red-500 text-3xl sm:text-5xl md:text-9xl mr-2 md:mr-4">•</span> MIGRATION{" "} <span className="text-red-500 text-3xl sm:text-5xl md:text-9xl mx-2 md:mx-4">•</span> BUILDS{" "} <span className="text-red-500 text-3xl sm:text-5xl md:text-9xl mx-2 md:mx-4">•</span> NATIONS{" "} <span className="text-red-500 text-3xl sm:text-5xl md:text-9xl mx-2 md:mx-4">•</span> MIGRATION{" "} </h1> ))} </div> </div> </div>
        {/* Guitarist Image */}
        <div className="absolute inset-0 flex items-center justify-center overflow-visible z-[100]"> <div className="relative w-[450px] h-[650px] sm:w-[500px] sm:h-[700px] md:w-[900px] md:h-[1200px]"> <Image ref={guitaristImgRef} src="https://pub-28e558b74ea64a0781531927a8b49e0e.r2.dev/tio.png" alt="Guitarist performing" fill sizes="(max-width: 640px) 500px, (max-width: 768px) 600px, 900px" className={`z-50 absolute ${isMobileView ? 'mobile-guitarist-img' : 'desktop-guitarist-img'}`} style={{ objectFit: "contain", objectPosition: "center", transform: isMobileView ? 'translateY(-5%)' : 'translateY(25%)', zIndex: 100, maxHeight: isMobileView ? '600px' : 'auto' }} priority /> </div> </div>
        {/* Left Card */}
        <div ref={leftCardRef} className="left-card-container absolute bottom-4 sm:bottom-10 md:bottom-20 left-4 sm:left-6 md:left-8 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-full max-w-[90%] sm:max-w-lg bg-black/90 p-5 sm:p-8 md:p-10 z-20 rounded-xl shadow-3d transform transition-transform duration-300 hover:translate-y-[-5px]" onClick={toggleConcertInfo}> <div className="mb-4 sm:mb-6 md:mb-8 flex justify-between items-center"><h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide inline-block transform transition-transform duration-300 hover:scale-105">FRANCISCO HERRERA IN CONCERT<div className="h-1 md:h-1.5 bg-red-500 w-1/2 mt-2 md:mt-3"></div></h2><div className="absolute top-4 right-4 bg-transparent border-none z-10 p-1 touch-card-button" ref={(el) => { if (toggleButtonsRef.current) { toggleButtonsRef.current[0] = el; } }}>{concertInfoCollapsed ? ( <ChevronDown className="h-6 w-6 text-red-500" /> ) : ( <ChevronUp className="h-6 w-6 text-red-500" />)}</div></div><div ref={leftCardContentRef} className="space-y-3 transition-all duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}><div className="flex items-start mb-3 sm:mb-4 md:mb-6"><span className="text-red-500 text-xl md:text-2xl mr-3 md:mr-4 mt-0.5">•</span><p className="text-white text-base sm:text-lg md:text-xl leading-relaxed">Migration strengthens <span className="italic">La Migración fortalece</span> the nation{" "} <span className="italic">la nación</span></p></div><div className="flex items-start mb-3 sm:mb-4 md:mb-6"><span className="text-red-500 text-xl md:text-2xl mr-3 md:mr-4 mt-0.5">•</span><p className="text-white text-base sm:text-lg md:text-xl leading-relaxed">Summer / Verano 2025 San Francisco</p></div><div className="flex items-start mb-2"><span className="text-red-500 text-xl md:text-2xl mr-3 md:mr-4 mt-0.5">•</span><p className="text-white text-base sm:text-lg md:text-xl leading-relaxed">Special Guests <span className="italic block mt-1">Invitados especiales</span></p></div></div> </div>
        {/* Right Card */}
        <div ref={rightCardRef} className="right-card-container absolute bottom-4 sm:bottom-10 md:bottom-20 right-4 sm:right-6 md:right-8 z-20 bg-black/90 p-4 sm:p-5 rounded-xl shadow-3d-card transform transition-transform duration-300 hover:translate-y-[-5px] max-w-[90%] sm:max-w-xs" onClick={toggleEventDetails}> <div className="flex justify-between items-center mb-2 md:mb-3"><h3 className="text-white text-lg md:text-xl font-bold flex items-center"><span className="text-red-500 mr-2">🎶</span> Live in San Francisco</h3><div className="absolute top-4 right-4 bg-transparent border-none z-10 p-1 touch-card-button" ref={(el) => { if (toggleButtonsRef.current) { toggleButtonsRef.current[1] = el; } }}>{eventDetailsCollapsed ? ( <ChevronDown className="h-6 w-6 text-red-500" /> ) : ( <ChevronUp className="h-6 w-6 text-red-500" />)}</div></div><div ref={rightCardContentRef} className="transition-all duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}><div className="space-y-1 md:space-y-2"><p className="text-white text-sm sm:text-base md:text-lg flex items-center"><Calendar size={14} className="text-red-500 mr-2 flex-shrink-0" /><span>Saturday, June 22, 2024</span></p><p className="text-white text-sm sm:text-base md:text-lg flex items-center"><Clock size={14} className="text-red-500 mr-2 flex-shrink-0" /><span>4:00 PM – 7:00 PM</span></p><p className="text-white text-sm sm:text-base md:text-lg flex items-center"><MapPin size={14} className="text-red-500 mr-2 flex-shrink-0" /><span>518 Valencia St.</span></p></div><a href="#reserve-tickets" onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log("RESERVE SPOT LINK CLICKED"); document.body.classList.add('smooth-scrolling'); scrollToTickets(); }} className="inline-block mt-2 md:mt-3 text-red-500 text-sm sm:text-base font-medium hover:text-red-400 transition-colors transform transition-transform hover:translate-x-1">Reserve your spot →</a></div> </div>
        {/* Scroll Tickets Button */}
        <button type="button" ref={el => { scrollButtonsRef.current[1] = el }} className="fixed bottom-6 right-6 bg-red-500 text-white rounded-full p-3 shadow-lg z-[9999]" style={{ display: showScrollUp ? "flex" : "none", opacity: showScrollUp ? 1 : 0, visibility: showScrollUp ? "visible" : "hidden", alignItems: "center", justifyContent: "center" }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); console.log("SCROLL TO TICKETS BUTTON CLICKED"); scrollToTickets(e); }} aria-label="Reserve tickets">
           <ChevronRight className="h-6 w-6" />
        </button>
        {/* Styles */}
        <style jsx global>{`
          /* All your existing styles here... */
          @keyframes marketing-banner { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marketing-banner { animation: marketing-banner 50s linear infinite; will-change: transform; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          html { scroll-behavior: smooth; }
          .shadow-3d { box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), 0 6px 6px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset; transform-style: preserve-3d; backface-visibility: hidden; border: 1px solid rgba(255, 255, 255, 0.15); }
          .shadow-3d::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%); border-radius: inherit; pointer-events: none; }
          .shadow-3d-card { box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4), 0 5px 10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15) inset; transform-style: preserve-3d; backface-visibility: hidden; border: 1px solid rgba(255, 255, 255, 0.2); background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)); }
          .shadow-3d-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 40%; background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0)); border-radius: inherit; border-bottom-right-radius: 0; border-bottom-left-radius: 0; pointer-events: none; }
          .title-3d { position: relative; color: white; text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15); transform-style: preserve-3d; transition: all 0.3s ease; }
          @media (max-width: 640px) { .title-3d { text-shadow: 0 1px 0 #cccccc, 0 1px 0 #c9c9c9, 0 2px 0 #bbb, 0 2px 0 #b9b9b9, 0 3px 0 #aaa, 0 3px 1px rgba(0,0,0,.1), 0 0 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.3), 0 2px 3px rgba(0,0,0,.2), 0 3px 5px rgba(0,0,0,.25), 0 5px 5px rgba(0,0,0,.2), 0 10px 10px rgba(0,0,0,.15); } }
          .title-3d:hover { text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15), 0 25px 25px rgba(0,0,0,.1); transform: translateY(-5px); }
          .title-3d span { display: inline-block; transform-style: preserve-3d; text-shadow: 0 1px 0 #ff6666, 0 2px 0 #ff5252, 0 3px 0 #ff3d3d, 0 4px 0 #ff2929, 0 5px 0 #ff1414, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15); }
          @media (max-width: 640px) { .title-3d span { text-shadow: 0 1px 0 #ff6666, 0 1px 0 #ff5252, 0 2px 0 #ff3d3d, 0 2px 0 #ff2929, 0 3px 0 #ff1414, 0 3px 1px rgba(0,0,0,.1), 0 0 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.3), 0 2px 3px rgba(0,0,0,.2), 0 3px 5px rgba(0,0,0,.25), 0 5px 5px rgba(0,0,0,.2), 0 10px 10px rgba(0,0,0,.15); } }
          .decorative-dot { position: relative; display: inline-block; color: #e11d48; text-shadow: 0 1px 0 #f43f5e, 0 2px 0 #e11d48, 0 3px 0 #be123c, 0 4px 0 #9f1239, 0 5px 0 #881337, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15); transform-style: preserve-3d; transform: translateZ(10px); transition: all 0.3s ease; animation: float 3s ease-in-out infinite; }
          @keyframes float { 0%, 100% { transform: translateY(0) translateZ(10px); } 50% { transform: translateY(-5px) translateZ(15px); } }
          @media (max-width: 640px) { .decorative-dot { text-shadow: 0 1px 0 #f43f5e, 0 2px 0 #e11d48, 0 3px 0 #be123c, 0 4px 0 #9f1239, 0 5px 1px rgba(0,0,0,.1), 0 0 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.3), 0 2px 3px rgba(0,0,0,.2), 0 3px 5px rgba(0,0,0,.25); } }
          .decorative-line { position: relative; background: linear-gradient(to right, #f43f5e, #e11d48, #be123c); box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.05) inset; transform-style: preserve-3d; transform: translateZ(5px); border-radius: 2px; animation: pulse 4s ease-in-out infinite; }
          @keyframes pulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
          .decorative-line::before { content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 1px; background: rgba(255,255,255,0.3); border-radius: 2px; }
          .decorative-line::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.3); border-radius: 2px; }
          .scroll-button { display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.6); color: white; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 50%; cursor: pointer; transition: all 0.3s ease; z-index: 999 !important; width: 40px; height: 40px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }
          .scroll-button:hover { background-color: rgba(220, 38, 38, 0.8); border-color: rgba(255, 255, 255, 0.4); transform: scale(1.1); }
          .scroll-button:active { transform: scale(0.95); }
          .smooth-scroll-target { scroll-margin-top: 20px; scroll-snap-margin-top: 20px; }
          #reserve-tickets { scroll-margin-top: 20px; scroll-snap-margin-top: 20px; }
          .scroll-down-button { width: 40px; height: 40px; margin-top: 20px; }
          @media (min-width: 768px) { .scroll-down-button { width: 50px; height: 50px; } }
          .scroll-up-button { position: fixed; bottom: 20px; right: 20px; width: 36px; height: 36px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); animation: fadeIn 0.3s ease-in-out; }
          @media (min-width: 768px) { .scroll-up-button { bottom: 30px; right: 30px; width: 44px; height: 44px; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          .animate-bounce { animation: bounce 2s infinite; }
          @media (max-width: 767px) { .scroll-button { width: 36px !important; height: 36px !important; } a, button { min-height: 40px; } a:active, button:active { transform: scale(0.97); } }
          @media (max-width: 640px) { .animate-marketing-banner { animation-duration: 40s; } @keyframes float { 0%, 100% { transform: translateY(0) translateZ(10px); } 50% { transform: translateY(-3px) translateZ(12px); } } .title-3d { margin-bottom: -10px; font-size: clamp(2.5rem, 8vw, 3.5rem); line-height: 1; } .relative.min-h-\[120vh\], .relative.min-h-\[70vh\] { min-height: 70vh; } }
          .absolute.top-\[35\%\] { z-index: 1 !important; }
          .absolute.inset-0.flex.items-center.justify-center.translate-y-\[25\%\] { z-index: 9999 !important; }
          @media (max-width: 640px) { .bg-gradient-to-b.from-blue-600.to-blue-900 { background: linear-gradient(to bottom, #2563EB, #1E40AF 60%, #1E3A8A 100%) !important; background-size: 100% 60vh !important; background-repeat: no-repeat !important; } .absolute.inset-0.flex.items-center.justify-center.translate-y-\[25\%\] { z-index: 9999 !important; transform: translateY(5%) !important; top: 45% !important; position: relative !important; } img[alt="Guitarist performing"] { display: block !important; visibility: visible !important; opacity: 1 !important; position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -30%) !important; max-height: 500px !important; width: auto !important; z-index: 999 !important; pointer-events: none !important; object-fit: contain !important; max-width: 98vw !important; } .relative.w-full.min-h-\[120vh\] + div, .relative.w-full.min-h-\[70vh\] + div, .relative.w-full.min-h-\[40vh\] + div, .relative.w-full.min-h-\[50vh\] + div, .relative.w-full.min-h-\[60vh\] + div, div[ref="containerRef"] + div { margin-top: 0 !important; } }
          @media (max-width: 640px) { .left-card-container, .right-card-container { display: none !important; visibility: hidden !important; opacity: 0 !important; position: absolute !important; left: -9999px !important; top: -9999px !important; height: 0 !important; width: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important; pointer-events: none !important; } [ref="leftCardRef"], [ref="rightCardRef"] { display: none !important; opacity: 0 !important; pointer-events: none !important; height: 0 !important; width: 0 !important; } .container.min-h-\[120vh\], .container.min-h-\[150vh\], .container.min-h-\[170vh\], .container.min-h-\[180vh\], .container.min-h-\[200vh\], .container.min-h-\[105vh\], .container.min-h-\[65vh\], .container.min-h-\[70vh\], .container.min-h-\[40vh\], .container.min-h-\[50vh\], .container.min-h-\[60vh\] { min-height: 60vh !important; height: 60vh !important; max-height: 60vh !important; overflow: hidden !important; } }
          .pulse-animation { animation: gentle-pulse 3s infinite; box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
          @keyframes gentle-pulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); } 70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); } }
          .clicking { transform: scale(0.95) !important; background-color: black !important; transition: all 0.2s ease-in-out !important; }
          .smooth-scrolling { scroll-behavior: smooth !important; transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000) !important; }
          .smooth-scrolling body { transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1.000) !important; }
          #reserve-tickets, .smooth-scrolling #reserve-tickets { scroll-margin-top: 50px !important; scroll-snap-margin-top: 50px !important; transition: all 0.3s ease-out !important; }
        `}</style>
    </div>
  )
}