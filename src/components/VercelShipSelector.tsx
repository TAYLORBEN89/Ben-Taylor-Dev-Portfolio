import React, { useState } from 'react';
import { VercelShipItem } from '../types';

interface VercelShipSelectorProps {
  items: VercelShipItem[];
  onSelectItem?: (item: VercelShipItem) => void;
}

export default function VercelShipSelector({ items, onSelectItem }: VercelShipSelectorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  // Active item details based on hovered index
  const activeItem = items[hoveredIndex] || items[0] || { id: '0', title: 'Ship', subtext: '', code: 'S' };

  return (
    <div className="w-full text-white pt-0 pb-10 px-4 md:px-8" id="vercel-ship-selector-component">
      <div className="w-full mx-auto">
        
        {/* VERCEL SHIP NAV COMPOSER BOARD */}
        <div className="relative">
          {/* Subtle all-over subtle pixel grid overlay */}
          <div className="absolute inset-0 pointer-events-none pixel-grid-overlay opacity-[0.10] z-0" />
          
          {/* Header Bar */}
          <div className="flex items-center justify-between py-5 border-b border-zinc-900 bg-transparent relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">PROJECTS:</span>
            </div>
            
            {/* Dynamic Ship LOGO based on hovered code */}
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-sm tracking-tighter uppercase font-sans text-zinc-100">Ship</span>
              <div className="bg-white text-black text-[10px] font-black font-mono tracking-widest px-2 py-0.5 rounded ml-0.5 uppercase select-none transition-all duration-150">
                {activeItem.code}
              </div>
            </div>
          </div>

          {/* Interactive List Frame */}
          <div className="relative">
            {items.length === 0 ? (
              <div className="py-24 text-center text-zinc-500 font-mono text-xs">
                No checkpoints found inside current register.
              </div>
            ) : (
              <div className="relative border-b border-zinc-900/60">
                {items.map((item, index) => {
                  const isHovered = hoveredIndex === index;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                        if (onSelectItem) onSelectItem(item);
                      }}
                      className={`relative w-full transition-all duration-150 select-none border-2 overflow-hidden ${
                        isHovered 
                          ? 'bg-transparent border-white z-10 scale-[1.01]' 
                          : 'bg-transparent border-zinc-900/40'
                      }`}
                      id={`vercel-ship-row-${item.id}`}
                    >

                      {/* Flex wrapper for the big text line */}
                      <div className="flex items-center justify-between pr-4 md:pr-10 relative z-10">
                        <div 
                          onClick={() => {
                            const url = item.subtext.startsWith('http') ? item.subtext : `https://${item.subtext}`;
                            window.open(url, '_blank');
                          }}
                          className="flex-1 py-5 pl-6 md:pl-10 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 cursor-pointer group/link"
                          title={`Launch ${item.title} (${item.subtext})`}
                        >
                          {/* Static interactive list line matching video */}
                          <h3 className={`font-retro tracking-wide text-3xl sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-300 leading-none uppercase ${
                            isHovered ? 'text-white opacity-100' : 'text-zinc-500 opacity-40'
                          } group-hover/link:text-white`}>
                            {item.title}
                          </h3>
                          <span className={`font-mono font-medium text-xs sm:text-sm md:text-base lg:text-lg tracking-normal transition-all duration-300 opacity-80 ${
                            isHovered ? 'text-zinc-400 opacity-100' : 'text-zinc-650 opacity-20'
                          } group-hover/link:text-zinc-100 truncate`}>
                            — {item.subtext}
                          </span>
                        </div>

                        {/* Character Mascot on right side */}
                        <div className="flex items-center gap-3 shrink-0 h-16 relative">
                          {/* MASCOT CHOP: Appears when index is hovered exactly like in Vercel video! */}
                          {isHovered ? (
                            <div className="mr-2 sm:mr-6 animate-char-float filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300" id="character-mascot-icon">
                              <svg
                                className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                                viewBox="0 0 48 48"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                {/* Walk cycle / bouncy antenna line */}
                                <path d="M37 14 L30 19" />
                                <circle cx="38" cy="12" r="2" fill="white" className="animate-pulse" />
                                
                                {/* Computer Screen Frame (Styled like retro Vercel box mascot) */}
                                <rect x="8" y="19" width="28" height="20" rx="4" fill="#000" />
                                <rect x="11" y="22" width="22" height="14" rx="2" strokeWidth="2.5" />
                                
                                {/* Dynamic Face Indicator (Pixel character face) */}
                                <circle cx="17" cy="27" r="1.5" fill="white" />
                                <circle cx="27" cy="27" r="1.5" fill="white" />
                                <line x1="19" y1="31" x2="25" y2="31" />
                                
                                {/* Little legs walking loop */}
                                <line x1="16" y1="39" x2="14" y2="45" className="animate-leg-left" />
                                <line x1="28" y1="39" x2="30" y2="45" className="animate-leg-right" />
                                
                                {/* Little antenna flash lights */}
                                <circle cx="38" cy="12" r="1" fill="#fff" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-10 sm:w-12 h-10 sm:h-12" /> // layout spacer
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>



        </div>

      </div>
    </div>
  );
}
