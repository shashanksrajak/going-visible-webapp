import Image from "next/image";
import HeaderHomePage from "./_components/HeaderHomePage";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <>
      <HeaderHomePage />

      <main>
        <Hero />
      </main>
    </>
  );
}
