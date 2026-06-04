import React, { useState } from 'react';
import { TicketData, VercelShipItem } from './types';
// @ts-ignore
import myAvatar from './assets/images/my_avatar.jpeg';
import Ticket from './components/Ticket';
import EventSchedule from './components/EventSchedule';
import Marquee from './components/Marquee';
import VercelShipSelector from './components/VercelShipSelector';
import { Sparkles, Terminal, ShieldAlert, Zap, Cpu } from 'lucide-react';

export default function App() {
  const defaultEmail = 'bt4ylor1776@gmail.com';

  // Start with a beautifully pre-populated premium starting pass for Ben Taylor
  const [ticket, setTicket] = useState<TicketData>({
    name: 'BEN TAYLOR',
    role: 'Full Stack Developer',
    skills: 'React, Node.js, Cloud APIs',
    interest: 'Autonomous Agents & Custom UI',
    avatarUrl: myAvatar,
    ticketNumber: '#001776',
    claimDate: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
    accessLevel: 'DECK_VIP',
    badgeTitle: 'ELITE INTERNET STACK ENGINEER',
    badgeMotto: 'Orchestrating bespoke full-stack landing pages, Google Play designs, and serverless architectures.',
    visualSymbol: '✦',
    theme: 'laser'
  });

  // Dynamic content for Vercel Ship clone menu selector
  const shipItems: VercelShipItem[] = [
    { id: '1', title: 'Hey Austin', subtext: 'heyaustin.vercel.app', code: 'HAY' },
    { id: '2', title: 'Trumpty Dumpty', subtext: 'trumptydumpty.vercel.app', code: 'TDMP' },
    { id: '3', title: 'Karolying Leavitt', subtext: 'karolyingleavitt.vercel.app', code: 'KRL' },
    { id: '4', title: 'Shaggy Coin', subtext: 'shaggycoin.vercel.app', code: 'SHAG' },
    { id: '5', title: 'Wavy Gravy', subtext: 'wavygravy.vercel.app', code: 'WAVY' }
  ];

  // Sync ticket content on project item selections
  const handleSelectShipItem = (item: VercelShipItem) => {
    setTicket((prev) => ({
      ...prev,
      role: `Full Stack Developer`,
      claimDate: `DEPLOYED`,
      accessLevel: `${item.code}_DECK_VIP`,
      theme: 'laser'
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-lime-500 selection:text-black overflow-x-hidden font-sans">
      
      {/* Custom Header Graphic Banner (Using the whole image) */}
      <div className="w-full h-44 sm:h-60 md:h-72 lg:h-80 relative overflow-hidden border-b border-zinc-900 select-none bg-zinc-950 flex items-end">
        <img 
          src={myAvatar} 
          alt="Ben Taylor Banner Graphic" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-75 filter contrast-125 saturate-50 brightness-75 transition-all duration-300"
          referrerPolicy="no-referrer"
        />
        {/* Aesthetic retro scan-lines and dither grid overlays to integrate design tightly */}
        <div className="absolute inset-0 pointer-events-none bg-dither-light opacity-30 z-10" />
        <div className="absolute inset-0 pointer-events-none pixel-grid-overlay opacity-40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
      </div>

      {/* Visual background ambient details */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-lime-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header utility bar (Compact, Humility constraints, No margins clutters) */}
      <header className="border-b border-zinc-900/60 bg-black/80 backdrop-blur-md relative z-40 sticky top-0" id="header-bar">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <span className="font-extrabold text-sm tracking-widest text-white block uppercase">BEN TAYLOR DEV PORTFOLIO</span>
              <span className="text-[9px] font-mono text-zinc-500 tracking-wider uppercase block">Creative Engineering • 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-mono text-zinc-400">
            <a href="#ticket-workspace" className="hover:text-white transition duration-200">EVENT BADGE</a>
            <a href="#event-schedule-section" className="hover:text-white transition duration-200">PORTFOLIO SHOWCASE</a>
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200 hidden sm:flex items-center gap-1">
              ORIGIN INSIDERS
              <Zap className="w-3 h-3 text-amber-400" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header Space */}
      <section className="relative z-10 pt-16 pb-12 px-4 max-w-5xl mx-auto text-center" id="hero-title-segment">
        <div className="flex flex-col items-center gap-3.5 mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-purple-500/10 rounded-full border border-purple-500/30 text-purple-200 font-mono text-xs sm:text-xs md:text-sm uppercase tracking-wider mx-auto shadow-[0_0_20px_rgba(168,85,247,0.15)] font-bold">
            <Zap className="w-4 h-4 text-purple-400 animate-spin shrink-0" />
            <span className="text-center">Full stack landing pages, Google Play apps, backend curation & database API integrations</span>
          </div>
          

        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none text-white font-sans max-w-5xl mx-auto mb-2 bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
          BEN TAYLOR DEV PORTFOLIO
        </h1>
        
        <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-mono max-w-3xl mx-auto mt-6 leading-relaxed">
          Designing and deploying stellar custom applications, business landing pages, responsive mobile interfaces, seamlessly synced data, and user-friendly content management portals.
        </p>

        {/* Counter quick metrics list */}
        <div className="flex justify-center items-center gap-8 mt-10 font-mono">
          <div className="text-center">
            <span className="block text-2xl font-black text-white tracking-tight">05</span>
            <span className="block text-[9px] text-zinc-550 uppercase tracking-widest mt-1">Active Projects</span>
          </div>
          <div className="w-[1px] h-8 bg-zinc-900" />
          <div className="text-center">
            <span className="block text-2xl font-black text-white tracking-tight">Vercel</span>
            <span className="block text-[9px] text-zinc-550 uppercase tracking-widest mt-1">Platform Host</span>
          </div>
          <div className="w-[1px] h-8 bg-zinc-900" />
          <div className="text-center">
            <span className="block text-2xl font-black text-lime-400 tracking-tight">100%</span>
            <span className="block text-[9px] text-zinc-550 uppercase tracking-widest mt-1">Live Deployments</span>
          </div>
        </div>
      </section>

      {/* RENDER DYNAMIC VERCEL SHIP PORTFOLIO BOARD */}
      <section className="relative z-10 py-4" id="vercel-menu-playground">
        <div className="max-w-4xl mx-auto text-center px-4 mb-2">
          <div className="inline-flex gap-2 items-center bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 font-mono text-[10px] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
            <span>PORTFOLIO CHECKPOINT REGISTRY</span>
          </div>
        </div>
        
        <VercelShipSelector
          items={shipItems}
          onSelectItem={handleSelectShipItem}
        />
      </section>

      {/* Infinite Scrolling Ticker Marquee */}
      <Marquee items={shipItems} />

      {/* Primary Workspace Centered Layout */}
      <section className="max-w-4xl mx-auto px-4 py-8 relative z-10" id="main-badge-station">
        
        <div className="flex flex-col justify-center items-stretch bg-zinc-950/20 rounded-3xl border border-zinc-900/60 p-4 sm:p-6 backdrop-blur-md relative overflow-hidden shadow-2xl">
          
          {/* Visual Header dials inside display */}
          <div className="flex items-center justify-between border-b border-zinc-900/80 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase ml-2 select-none">HOLOGRAPH PASS RENDERER • v4.11</span>
            </div>
            <div className="font-mono text-[9px] text-zinc-500 tracking-wider">
              VERIFIED SECURE
            </div>
          </div>

          {/* Render Virtual Interactive holographic physical ticket component */}
          <Ticket data={ticket} />

          {/* Instructions box for immersive virtual ticket */}
          <div className="mt-4 text-center">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
              ✦ Gently hover card on desktop to activate 3D holographic tilt reflection ✦
            </p>
          </div>

        </div>

      </section>

      {/* Event Timeline / Global check-in list Segment */}
      <section className="bg-gradient-to-b from-black to-zinc-950 pt-8 pb-16">
        <EventSchedule />
      </section>

      {/* Decorative Interactive Terminal Box / Playful interaction */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-[#030303] border border-zinc-800 rounded-2xl p-6 text-zinc-400 font-mono text-xs shadow-2xl relative overflow-hidden">
          {/* Subtle Scanline CRT Effect overlay + Retro dithered gradient pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
          <div className="absolute inset-0 pointer-events-none bg-dither-light opacity-[0.16] z-0" />
          
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-3 mb-4 relative z-10">
            <Terminal className="w-4 h-4 text-lime-400 animate-pulse" />
            <span className="font-bold text-white uppercase tracking-wider font-mono text-[11px]">Venture-Compiler Systems Log</span>
            <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          
          <div className="space-y-2 text-[14px] sm:text-[15px] font-retro tracking-wide text-zinc-400 relative z-10 leading-relaxed">
            <p className="text-lime-400 font-bold">&gt; INITIALIZING ENCRYPTED INTERFACE SESSION_TOKEN... [OK]</p>
            <p className="text-zinc-300">&gt; MAPPING DOM RESIZE OBSERVERS ACTIVE (W-FULL RENDER ENGINE)</p>
            <p className="text-zinc-300">&gt; HOST NAME INTERSECT: GOOGLE CLOUD PLATFORM CONTAINER HOST</p>
            <p className="text-amber-400">&gt; ACTIVE THEME INTEGRATION: <span className="uppercase text-amber-300 font-bold">{ticket.theme.toUpperCase()}</span> MODE REGISTERED</p>
            <p className="text-zinc-200">&gt; CURRENT USER PROFILE: {ticket.name.toUpperCase()} / {ticket.role.toUpperCase()}</p>
            <p className="text-zinc-500">&gt; COMPILING SKILLS ACCORDION NODES: [{ticket.skills.split(',').map(s => `"${s.trim()}"`).join(', ')}]</p>
            <p className="text-lime-400 font-bold flex items-center gap-1.5 animate-pulse">
              <span>&gt; CORE INFRASTRUCTURE STATUS: LIVE AND OPERATIONAL (PORT 3000 INGRESS)</span>
              <span className="inline-block w-1.5 h-3.5 bg-lime-400 animate-pulse" />
            </p>
          </div>
        </div>
      </section>

      {/* Footer Branding block */}
      <footer className="border-t border-zinc-900/60 py-12 text-center text-zinc-500 font-mono text-xs bg-black">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-white uppercase tracking-wider">VENTURE SHIP ’26</span>
            <span className="text-zinc-700">|</span>
            <span>All biometric passes verified & synced</span>
          </div>
          <div>
            <span className="text-[10px] text-zinc-600 block uppercase sm:text-right">Crafted on High-Fidelity Infrastructure</span>
            <span className="text-[10px] text-zinc-600 block uppercase sm:text-right">Inspired by Vercel/Ship</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
