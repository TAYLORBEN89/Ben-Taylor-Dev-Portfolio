import React, { useState } from 'react';
import { TicketData, VercelShipItem } from './types';
import { md5 } from './utils/md5';
import Ticket from './components/Ticket';
import TicketCustomizer from './components/TicketCustomizer';
import EventSchedule from './components/EventSchedule';
import Marquee from './components/Marquee';
import VercelShipSelector from './components/VercelShipSelector';
import { Sparkles, Terminal, ShieldAlert, BadgeCheck, Zap, Download, RefreshCw, Cpu, Send, Users } from 'lucide-react';

export default function App() {
  const defaultEmail = 'bt4ylor1776@gmail.com';
  const defaultAvatar = `https://www.gravatar.com/avatar/${md5(defaultEmail)}?s=150&d=identicon`;

  // Start with a beautifully pre-populated premium starting pass for Ben Taylor
  const [ticket, setTicket] = useState<TicketData>({
    name: 'BEN TAYLOR',
    role: 'Full-Stack Developer',
    skills: 'React, Node.js, Cloud APIs',
    interest: 'Autonomous Agents & Custom UI',
    avatarUrl: defaultAvatar,
    ticketNumber: '#001776',
    claimDate: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
    accessLevel: 'DECK_VIP',
    badgeTitle: 'ELITE INTERNET STACK ENGINEER',
    badgeMotto: 'Orchestrating bespoke full-stack landing pages, Google Play designs, and serverless architectures.',
    visualSymbol: '✦',
    theme: 'holo'
  });

  // Dynamic user-inserted content for Vercel Ship clone menu selector
  const [shipItems, setShipItems] = useState<VercelShipItem[]>([
    { id: '1', title: 'Hey Austin', subtext: 'heyaustin.vercel.app', code: 'HAY' },
    { id: '2', title: 'Trumpty Dumpty', subtext: 'trumptydumpty.vercel.app', code: 'TDMP' },
    { id: '3', title: 'Karolying Leavitt', subtext: 'karolyingleavitt.vercel.app', code: 'KRL' },
    { id: '4', title: 'Shaggy Coin', subtext: 'shaggycoin.vercel.app', code: 'SHAG' },
    { id: '5', title: 'Wavy Gravy', subtext: 'wavygravy.vercel.app', code: 'WAVY' }
  ]);

  const [generating, setGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync ticket content on project item selections
  const handleSelectShipItem = (item: VercelShipItem) => {
    handleUpdateTicket({
      role: `Creator of ${item.title}`,
      claimDate: `DEPLOYED`,
      accessLevel: `${item.code}_DECK_VIP`
    });
  };

  // Updates simple ticket preferences instantly
  const handleUpdateTicket = (updates: Partial<TicketData>) => {
    setTicket((prev) => ({
      ...prev,
      ...updates
    }));
  };

  // Re-roll a unique digital ticket serial code
  const handleRegenTicketID = () => {
    const randomID = `#${Math.floor(100000 + Math.random() * 900000)}`;
    handleUpdateTicket({ ticketNumber: randomID });
  };

  // Triggers secure server handler to analyze interests & craft highly targeted credentials via Gemini
  const handleGenerateNeuralBadge = async () => {
    setGenerating(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const response = await fetch('/api/generate-badge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ticket.name,
          role: ticket.role,
          skills: ticket.skills,
          interest: ticket.interest
        }),
      });

      if (!response.ok) {
        throw new Error(`System network failure: ${response.statusText}`);
      }

      const generatedData = await response.json();

      if (generatedData.error) {
        throw new Error(generatedData.error);
      }

      // Roll generated credentials into active ticket token
      setTicket((prev) => ({
        ...prev,
        badgeTitle: generatedData.badgeTitle,
        badgeMotto: generatedData.badgeMotto,
        visualSymbol: generatedData.visualSymbol,
        accessLevel: generatedData.accessLevel
      }));

      if (generatedData.warning) {
        setErrorMsg(generatedData.warning); // friendly warning for missing API key/sandbox state
      } else {
        setSuccessMsg("Biometric credentials successfully aligned via core neural nodes!");
      }

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "An unexpected overload occurred in the neural subsystem.");
    } finally {
      setGenerating(false);
    }
  };

  // Support saving ticket configuration print/view
  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-lime-500 selection:text-black overflow-x-hidden font-sans">
      
      {/* Visual background ambient details */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-lime-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Header utility bar (Compact, Humility constraints, No margins clutters) */}
      <header className="border-b border-zinc-900/60 bg-black/80 backdrop-blur-md relative z-40 sticky top-0" id="header-bar">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-lime-400 to-emerald-500 p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                <Cpu className="w-4 h-4 text-lime-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-widest text-white block uppercase">BEN TAYLOR DEV PORTFOLIO</span>
              <span className="text-[9px] font-mono text-zinc-500 tracking-wider uppercase block">Creative Engineering • 2026</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-[11px] font-mono text-zinc-400">
            <a href="#ticket-workspace" className="hover:text-white transition duration-200">BADGE GENERATOR</a>
            <a href="#event-schedule-section" className="hover:text-white transition duration-200">PORTFOLIO SHOWCASE</a>
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200 flex items-center gap-1">
              ORIGIN INSIDERS
              <Zap className="w-3 h-3 text-amber-400" />
            </a>
          </div>

          <button
            onClick={handlePrintTicket}
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 py-1.5 px-3 rounded-lg text-xs font-mono text-zinc-300 transition shrink-0"
            id="print-top-menu-btn"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT</span>
          </button>
        </div>
      </header>

      {/* Hero Header Space */}
      <section className="relative z-10 pt-16 pb-12 px-4 max-w-5xl mx-auto text-center" id="hero-title-segment">
        <div className="flex flex-col items-center gap-3.5 mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-purple-500/10 rounded-full border border-purple-500/30 text-purple-200 font-mono text-xs sm:text-xs md:text-sm uppercase tracking-wider mx-auto shadow-[0_0_20px_rgba(168,85,247,0.15)] font-bold">
            <Zap className="w-4 h-4 text-purple-400 animate-spin shrink-0" />
            <span className="text-center">Claim your own full stack landing page, Google Play app, backend curation & database API integration</span>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-lime-500/5 rounded-full border border-lime-400/25 text-lime-300 font-mono text-[11px] sm:text-xs md:text-xs uppercase tracking-wider mx-auto font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-lime-400 animate-spin shrink-0" />
            <span>Claim your holographic event credential token — Not on the blockchain? Claim your own token</span>
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none text-white font-sans max-w-5xl mx-auto mb-2 bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
          BEN TAYLOR DEV PORTFOLIO
        </h1>
        
        <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-mono max-w-3xl mx-auto mt-6 leading-relaxed">
          Inspired by the flawless high-fidelity pixel style of <span className="text-white hover:underline cursor-pointer">vercel.com/ship</span>. Deploying stellar custom applications, specialized backends, and responsive mobile interfaces with robust data layers.
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

      {/* RENDER DYNAMIC VERCEL SHIP INTERACTIVE MENU (EXACT MATCH TO VIDEO) */}
      <section className="relative z-10 py-4" id="vercel-menu-playground">
        <div className="max-w-4xl mx-auto text-center px-4 mb-4">
          <div className="inline-flex gap-2 items-center bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1 font-mono text-[10px] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
            <span>PLAYGROUND: INLINE CUSTOM CONTENT BOARD</span>
          </div>
        </div>
        
        <VercelShipSelector
          items={shipItems}
          onChangeItems={setShipItems}
          onSelectItem={handleSelectShipItem}
        />
      </section>

      {/* Infinite Scrolling Ticker Marquee */}
      <Marquee items={shipItems} />

      {/* Primary Workspace Bento Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 py-8 relative z-10" id="main-badge-station">
        
        {/* Dynamic Claim Notification Alert box */}
        {successMsg && (
          <div className="max-w-md mx-auto mb-6 bg-emerald-950/20 border border-emerald-900/60 p-4 rounded-xl flex items-start gap-3 text-emerald-400 font-mono text-xs shadow-lg animate-bounce">
            <BadgeCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block">COMPILE SUCCESSFUL</span>
              <p className="text-emerald-300/80 mt-0.5">{successMsg}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual Display (Ticket Card Workspace - Left Side, 7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center items-stretch bg-zinc-950/20 rounded-3xl border border-zinc-900/60 p-4 sm:p-6 backdrop-blur-md relative overflow-hidden">
            
            {/* Visual Header dials inside display */}
            <div className="flex items-center justify-between border-b border-zinc-900/80 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="font-mono text-[10px] text-zinc-500 uppercase ml-2 select-none">HOLOGRAPH PASS RENDERER • v4.11</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleRegenTicketID}
                  title="Randomize Ticket Serial Number"
                  className="p-1 px-2.5 bg-zinc-900/80 hover:bg-zinc-800 rounded border border-zinc-900 hover:border-zinc-700 transition text-[9px] font-mono uppercase text-zinc-400 flex items-center gap-1"
                  id="randomize-id-btn"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  ID-ROLL
                </button>
              </div>
            </div>

            {/* Render Virtual Interactive holographic physical ticket component */}
            <Ticket data={ticket} loading={generating} />

            {/* Instructions box for immersive virtual ticket */}
            <div className="mt-4 text-center">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
                ✦ Gently hover card on desktop to activate 3D holographic tilt reflection ✦
              </p>
              
              <div className="flex justify-center gap-3.5 mt-5">
                <button
                  type="button"
                  onClick={handlePrintTicket}
                  className="bg-white hover:bg-zinc-100 text-black py-2.5 px-5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow"
                  id="download-print-trigger"
                >
                  <Download className="w-4 h-4" />
                  Print Event Ticket
                </button>
                <a
                  href="#customizer-box"
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 py-2.5 px-5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow"
                >
                  <Terminal className="w-4 h-4" />
                  Customize Biometrics
                </a>
              </div>
            </div>

          </div>

          {/* Configuration Form Display (TicketCustomizer - Right Side, 5 columns) */}
          <div className="lg:col-span-5">
            <TicketCustomizer
              onUpdate={handleUpdateTicket}
              ticketData={ticket}
              onGenerateBadge={handleGenerateNeuralBadge}
              generating={generating}
              errorMsg={errorMsg}
            />
          </div>

        </div>

      </section>

      {/* Event Timeline / Global check-in list Segment */}
      <section className="bg-gradient-to-b from-black to-zinc-950 pt-8 pb-16">
        <EventSchedule />
      </section>

      {/* Decorative Interactive Terminal Box / Playful interaction */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 text-zinc-400 font-mono text-xs">
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-3 mb-4">
            <Terminal className="w-4 h-4 text-lime-405 text-lime-400 animate-pulse" />
            <span className="font-bold text-white uppercase tracking-wider">Venture-Compiler Systems Log</span>
          </div>
          <div className="space-y-1 text-[11px] text-zinc-500">
            <p className="text-zinc-450 text-zinc-300">&gt; INITIALIZING ENCRYPTED INTERFACE SESSION_TOKEN...</p>
            <p>&gt; MAPPING DOM RESIZE OBSERVERS ACTIVE</p>
            <p>&gt; HOST NAME INTERSECT: GOOGLE CLOUD PLATFORM CONTAINER HOST</p>
            <p>&gt; ACTIVE THEME INTEGRATION: <span className="uppercase text-white font-bold">{ticket.theme}</span> MODE REGISTERED</p>
            <p className="text-zinc-400">&gt; CURRENT USER PROFILE: {ticket.name.toUpperCase()} / {ticket.role.toUpperCase()}</p>
            <p className="text-zinc-500">&gt; COMPILING SKILLS ACCORDION NODES: [{ticket.skills.split(',').map(s => `"${s.trim()}"`).join(', ')}]</p>
            <p className="text-zinc-400 font-bold">&gt; GEMINI NEURAL INTERACTION SERVICE ONLINE: TRUE</p>
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
