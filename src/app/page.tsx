import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProblemSection } from "@/components/problem-section";
import { PrimitivesSection } from "@/components/primitives-section";
import { BankAccountSection } from "@/components/bank-account-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { FacilitatorSection } from "@/components/facilitator-section";
import { EconomicsSection } from "@/components/economics-section";
import { NetworkSection } from "@/components/network-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-muted font-sans grid-bg-dense">
      <Navbar />
      <Hero />
      <ProblemSection />
      <PrimitivesSection />
      <BankAccountSection />
      <HowItWorksSection />
      <FacilitatorSection />
      <EconomicsSection />
      <NetworkSection />
      <CTASection />
      <Footer />
    </div>
  );
}
