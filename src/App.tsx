import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Clients } from './components/Clients';
import { About } from './components/About';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { Technology } from './components/Technology';
import { Cases } from './components/Cases';
import { Process } from './components/Process';
import { Reviews } from './components/Reviews';
import { Coverage } from './components/Coverage';
import { Faq } from './components/Faq';
import { Quote } from './components/Quote';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { initSmoothScroll } from './lib/scroll';
import type { PageKind } from './lib/routes';

type AppProps = { page?: PageKind; slug?: string };

export default function App({ page = 'home', slug = '' }: AppProps) {
  useEffect(() => initSmoothScroll(), []);

  if (page !== 'home') {
    return <LandingPage kind={page} slug={slug} />;
  }

  return (
    <>
      <Nav onHome />
      <main id="main">
        <Hero />
        <Clients />
        <About />
        <Services />
        <Work />
        <Technology />
        <Cases />
        <Process />
        <Reviews />
        <Coverage />
        <Faq />
        <Quote />
        <FinalCta />
      </main>
      <Footer onHome />
    </>
  );
}
