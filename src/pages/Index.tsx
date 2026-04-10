import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Categories from '@/components/Categories';
import Contact from '@/components/Contact';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Categories />
      <Contact />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
