import Hero from "@/components/Hero";
import Procedimentos from "@/components/Procedimentos";
import Contato from "@/components/Contato";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <main>
      <Navbar />

      <div id="home">
        <Hero />
      </div>

      <div id="procedimentos">
        <Procedimentos />
      </div>

      <div id="contato">
        <Contato />
      </div>
    </main>
  );
}