import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';

import Contact from '@/components/Contact';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useSiteStore } from '@/store/siteStore';

const Index = () => {
  const loadFromDB = useSiteStore((s) => s.loadFromDB);
  const loaded = useSiteStore((s) => s.loaded);

  useEffect(() => {
    if (!loaded) {
      loadFromDB();
    }
  }, [loaded, loadFromDB]);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      
      <Contact />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
