"use client"
import { Hero, Features, Pricing, Countries, Popular, About, FAQ } from "@/components/landing";
import Header from "@/components/Header";
import ServiceView from "@/components/landing/ServiceView";
import Footer from "@/components/landing/footer";
import OurFeatures from "@/components/landing/ourfeatures";
import RepeatedCta from "@/components/landing/repeatedcta";

export default function Home() {
  return (
    <div className="">
      <div className="w-full flex justify-center relative pointer-events-none">
      </div>
      <Header />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <Countries />
      <Popular />
      <div id="about">
        <About />
      </div>
      <FAQ />
      <Footer />
    </div>
  );
}
