"use client"

import HeroSection from "@/hero-section"
import RotatingBanner from "@/rotating-banner"
import MarketingSection from "@/marketing-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <MarketingSection />
      <RotatingBanner />
      <HeroSection />
    </main>
  )
}
