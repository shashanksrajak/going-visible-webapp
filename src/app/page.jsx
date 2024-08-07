import Image from "next/image";
import HeaderHomePage from "./_components/HeaderHomePage";
import Hero from "./_components/Hero";
import FAQ from "./_components/FAQ";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import About from "./_components/About";

export default function Home() {
  return (
    <>
      <HeaderHomePage />

      <main>
        <Hero />

        <About />

        <Features />

        <FAQ />

        <Footer />
      </main>
    </>
  );
}
