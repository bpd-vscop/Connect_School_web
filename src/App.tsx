import SideNavigation from './components/layout/SideNavigation';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Testimonials from './components/sections/Testimonials';
import About from './components/sections/About';
import CTA from './components/sections/CTA';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <SideNavigation />
      <main>
        <Hero />
        <About />
        <Features />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;