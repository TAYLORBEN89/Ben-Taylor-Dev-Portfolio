import React from 'react';
import { VercelShipItem } from './types';
// @ts-ignore
import myAvatar from './assets/images/my_avatar.jpg';
// @ts-ignore
import googlePlayBadge from './utils/google-play-badge.png';
import Marquee from './components/Marquee';
import VercelShipSelector from './components/VercelShipSelector';
import { Download } from 'lucide-react';

export default function App() {
  // Dynamic content for Vercel Ship clone menu selector
  const shipItems: VercelShipItem[] = [
    { id: '6', title: 'MWD Pro', subtext: 'compessential.com', code: 'MWD' },
    { id: '1', title: 'Hey Austin', subtext: 'heyaustin.vercel.app', code: 'HAY' },
    { id: '2', title: 'Trumpty Dumpty', subtext: 'trumptydumpty.vercel.app', code: 'TDMP' },
    { id: '3', title: 'Karolying Leavitt', subtext: 'karolyingleavitt.vercel.app', code: 'KRL' },
    { id: '4', title: 'Shaggy Coin', subtext: 'shaggycoin.vercel.app', code: 'SHAG' },
    { id: '5', title: 'Wavy Gravy', subtext: 'wavygravy.vercel.app', code: 'WAVY' }
  ];

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
        {/* Aesthetic retro scan-lines and dither dither overlays to integrate design tightly */}
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

          {/* Navigation Links Removed per request */}
        </div>
      </header>

      {/* Hero Header Space */}
      <section className="relative z-10 pt-6 sm:pt-8 pb-0 px-4 max-w-5xl mx-auto text-center" id="hero-title-segment">
        <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-mono max-w-3xl mx-auto leading-relaxed">
          Designing and deploying stellar custom applications, business landing pages, responsive mobile interfaces, seamlessly synced data, and user-friendly content management portals.
        </p>
      </section>

      {/* Google Play Store Banner */}
      <section className="relative z-10 pt-8 pb-4 px-4 max-w-4xl mx-auto" id="play-store-promotional-banner">
        <div className="bg-zinc-950/40 backdrop-blur-md border border-zinc-900 rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-zinc-800 transition-all duration-300">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-lime-400 bg-lime-950/40 px-2.5 py-1 rounded border border-lime-900/30 mb-3">
              NOW ON THE GOOGLE PLAY STORE
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              MWD Pro: Training Essentials
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
              Elevate your tactical preparation on Android devices.
            </p>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.mwdpro.app&utm_source=na_Med"
            target="_blank"
            rel="noopener noreferrer"
            className="block h-12 hover:scale-[1.03] active:scale-95 transition-all duration-200 shrink-0 select-none"
          >
            <img 
              src={googlePlayBadge} 
              alt="Get it on Google Play" 
              className="h-full w-auto object-contain rounded-md border border-zinc-900 hover:border-zinc-800 transition-all duration-200" 
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
      </section>

      {/* RENDER DYNAMIC VERCEL SHIP PORTFOLIO BOARD */}
      <section className="relative z-10 pt-0 pb-20" id="vercel-menu-playground">
        <VercelShipSelector
          items={shipItems}
          onSelectItem={() => {}}
        />
      </section>

      {/* Infinite Scrolling Ticker Marquee */}
      <Marquee items={shipItems} />

      {/* Clean minimal padding separator */}
      <div className="pb-24" />

    </div>
  );
}
