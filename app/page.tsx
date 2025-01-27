"use client"
import { Hero, Features, Pricing, Countries, Popular, About, FAQ } from "@/components/landing";
import Header from "@/components/Header";
import ServiceView from "@/components/landing/ServiceView";
import Footer from "@/components/landing/footer";
import OurFeatures from "@/components/landing/ourfeatures";
import RepeatedCta from "@/components/landing/repeatedcta";
import { BottomBanner } from "@/components/Popup"

export default function Home() {
  return (
    <>
      <div className="dark:bg-gray-900">
        <div className="w-full flex justify-center relative pointer-events-none">
        </div>
        <Header />
        <Hero />
        <div id="features" className="dark:bg-gray-900">
          <Features />
        </div>
        <div id="pricing" className="dark:bg-gray-900">
          <Pricing />
        </div>
        <Countries />
        <Popular />
        <div id="about" className="dark:bg-gray-900">
          <About />
        </div>
        <FAQ />
        <Footer />
      </div>
      <BottomBanner />
    </>
  );
}
