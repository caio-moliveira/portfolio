import { Navbar } from "@/components/nav/Navbar";
import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { TechStack } from "@/components/sections/TechStack";
import { Projects } from "@/components/sections/Projects";
import { Teaching } from "@/components/sections/Teaching";
import { Consulting } from "@/components/sections/Consulting";
import { Contact } from "@/components/sections/Contact";
import { ChatOverlay } from "@/components/chat/ChatOverlay";
import { ChatFab } from "@/components/chat/ChatFab";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <About />
        <Timeline />
        <TechStack />
        <Projects />
        <Teaching />
        <Consulting />
        <Contact />
      </main>
      <ChatFab />
      <ChatOverlay />
    </>
  );
}
