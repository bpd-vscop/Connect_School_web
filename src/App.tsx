import SideNavigation from './components/layout/SideNavigation';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Testimonials from './components/sections/Testimonials';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <SideNavigation />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;