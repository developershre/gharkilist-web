import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PhoneSimulator from '@/components/PhoneSimulator';
import ComparisonMatrix from '@/components/ComparisonMatrix';
import FeaturesGrid from '@/components/FeaturesGrid';
import CategoryExplorer from '@/components/CategoryExplorer';
import DownloadSection from '@/components/DownloadSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ScrollHandler from '@/components/ScrollHandler';

export default function Home() {
  return (
    <div className="min-h-screen">
      <ScrollHandler />
      <Header />
      <Hero />
      <FeaturesGrid />
      <ComparisonMatrix />
      <PhoneSimulator />
      <CategoryExplorer />
      <DownloadSection />
      <FAQ />
      <Footer />
    </div>
  );
}
