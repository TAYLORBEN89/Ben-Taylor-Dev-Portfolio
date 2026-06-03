import React from 'react';
import { VercelShipItem } from '../types';

interface MarqueeProps {
  items?: VercelShipItem[];
}

export default function Marquee({ items }: MarqueeProps) {
  // Event checkpoints fallback array
  const defaultItems = [
    { id: '1', title: "LONDON UNLOCKED", subtext: "06.17", code: "LDN_06" },
    { id: '2', title: "BERLIN ASSEMBLY", subtext: "06.25", code: "BER_06" },
    { id: '3', title: "NYC GLASS SUMMIT", subtext: "06.30", code: "NYC_06" },
    { id: '4', title: "SYDNEY TRANSLATION", subtext: "07.30", code: "SYD_07" },
    { id: '5', title: "SF CORE DECK", subtext: "10.15", code: "SFC_10" }
  ];

  const mapItems = items?.map(item => ({
    id: item.id,
    title: item.title.toUpperCase(),
    subtext: item.subtext,
    code: item.code.toUpperCase()
  })) || defaultItems;

  // Repeat items to fill infinite horizontal scroll smoothly
  const repeatedItems = [...mapItems, ...mapItems, ...mapItems, ...mapItems];

  return (
    <div className="w-full bg-black border-y border-zinc-900/80 overflow-hidden relative py-4 z-10" id="marquee-banner">
      {/* Absolute Side Shadows for Sleek Border Blends */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="flex whitespace-nowrap animate-scroll">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="inline-flex items-center mx-6 sm:mx-10 select-none">
            {/* Glowing neon sphere separator */}
            <span className="w-2 h-2 rounded-full bg-lime-400 mr-4 sm:mr-6 animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
            
            {/* City Title */}
            <span className="font-sans font-black text-xl sm:text-2xl tracking-tighter text-zinc-100 hover:text-white transition duration-200">
              {item.title}
            </span>

            {/* Date Tag */}
            <span className="font-mono text-xs font-semibold bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800/80 ml-3 sm:ml-4">
              {item.subtext}
            </span>

            {/* Terminal Node code */}
            <span className="font-mono text-[10px] text-zinc-650 tracking-[0.2em] ml-2 font-bold uppercase">
              [{item.code}]
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
