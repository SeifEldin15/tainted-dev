import { Header, Hero, Features, Pricing } from "@/components/landing";
import ServiceView from "@/components/landing/ServiceView";
import Footer from "@/components/landing/footer";
import OurFeatures from "@/components/landing/ourfeatures";
import RepeatedCta from "@/components/landing/repeatedcta";

export default function Home() {
  return (
    <div className="">
      <div className="w-full flex justify-center relative pointer-events-none">
        {/* header big shadow */}
        <div className="absolute rounded-full top-[-1500px] h-[2000px] w-full max-w-[1500px] top-gradient-shadow opacity-50 sm:opacity-100 z-20"></div>
      </div>
      <Header />
      <Hero />
      <OurFeatures />
      <ServiceView />
      <Pricing />
      <RepeatedCta />
      <Footer />
    </div>
  );
}
