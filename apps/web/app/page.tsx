import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Gradient from "../components/Gradient";
import Features from "../components/Features";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import ContentLayout from "../components/ContentLayout";

export default () => (
  <>
    <Nav />
    <main>
      <Hero />
      <ContentLayout>
        <Features />
        <CTA />
      </ContentLayout>
    </main>
    <ContentLayout>
      <Footer />
    </ContentLayout>
  </>
);
