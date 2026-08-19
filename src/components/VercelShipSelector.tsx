import React, { useState } from 'react';
import { VercelShipItem } from '../types';
// @ts-ignore
import googlePlayBadge from '../utils/google-play-badge.png';

interface VercelShipSelectorProps {
  items: VercelShipItem[];
  onSelectItem?: (item: VercelShipItem) => void;
}

function ComingSoonStoreBadge({ store }: { store: 'play' | 'apple'; key?: React.Key }) {
  const isPlay = store === 'play';

  return (
    <div
      className="flex items-center gap-1 h-7 sm:h-9 px-1.5 sm:px-2.5 rounded border border-zinc-700 bg-black select-none shrink-0"
      title={`${isPlay ? 'Google Play' : 'App Store'} — Coming Soon`}
    >
      {isPlay ? (
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.6 2.4 14.2 12 3.6 21.6V2.4Z" fill="#34A853" />
          <path d="M14.2 12 17.8 8.7 6.2 1.6 14.2 12Z" fill="#FBBC04" />
          <path d="M14.2 12 6.2 22.4 17.8 15.3 14.2 12Z" fill="#EA4335" />
          <path d="M17.8 8.7 21.1 10.6c.9.5.9 1.8 0 2.3L17.8 15.3 14.2 12l3.6-3.3Z" fill="#4285F4" />
        </svg>
      ) : (
        <svg className="w-4 h-4 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.37 12.86c.03 3.28 2.88 4.37 2.91 4.39-.02.08-.45 1.56-1.49 3.08-.9 1.32-1.84 2.63-3.31 2.66-1.46.03-1.93-.86-3.59-.86-1.67 0-2.18.83-3.56.89-1.43.06-2.52-1.43-3.43-2.74C2.16 17.2.73 12.27 2.64 8.94c.95-1.65 2.65-2.69 4.49-2.72 1.4-.03 2.72.94 3.58.94.85 0 2.45-1.16 4.14-.99.7.03 2.68.28 3.95 2.15-.1.06-2.36 1.38-2.33 4.54ZM13.5 4.3c.8-.9 2.11-1.59 3.2-1.63.14 1.27-.37 2.55-1.13 3.46-.75.92-1.99 1.64-3.21 1.54-.16-1.25.45-2.55 1.14-3.37Z" />
        </svg>
      )}
      <div className="flex flex-col leading-none">
        <span className="text-[7px] font-mono tracking-[0.14em] text-lime-400 uppercase">Coming Soon</span>
        <span className="text-[10px] sm:text-[11px] font-semibold text-white mt-0.5">
          {isPlay ? 'Google Play' : 'App Store'}
        </span>
      </div>
    </div>
  );
}

export default function VercelShipSelector({ items, onSelectItem }: VercelShipSelectorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  // Active item details based on hovered index
  const activeItem = items[hoveredIndex] || items[0] || { id: '0', title: 'Ship', subtext: '', code: 'S' };

  return (
    <div className="w-full max-w-[100vw] min-w-0 text-white pt-0 pb-8 sm:pb-10 px-3 sm:px-4 md:px-8" id="vercel-ship-selector-component">
      <div className="w-full min-w-0 mx-auto">
        
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
                      onFocus={() => {
                        setHoveredIndex(index);
                        if (onSelectItem) onSelectItem(item);
                      }}
                      className={`relative w-full min-w-0 transition-colors duration-150 select-none border-2 overflow-hidden ${
                        isHovered 
                          ? 'bg-transparent border-white z-10 md:scale-[1.01]' 
                          : 'bg-transparent border-zinc-900/40'
                      }`}
                      id={`vercel-ship-row-${item.id}`}
                    >

                      <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 py-3.5 px-3 sm:px-5 md:py-5 md:px-8 relative z-10 min-w-0">
                        <div 
                          onClick={() => {
                            const url = item.subtext.startsWith('http') ? item.subtext : `https://${item.subtext}`;
                            window.open(url, '_blank');
                          }}
                          className="min-w-0 flex-1 flex flex-col justify-center sm:flex-row sm:items-baseline gap-0.5 sm:gap-3 cursor-pointer group/link"
                          title={`Launch ${item.title} (${item.subtext})`}
                        >
                          <h3 className={`font-retro tracking-wide text-[clamp(1.35rem,6.2vw,4.5rem)] transition-all duration-300 leading-none uppercase break-words ${
                            isHovered ? 'text-white opacity-100' : 'text-zinc-500 opacity-40'
                          } group-hover/link:text-white`}>
                            {item.title}
                          </h3>
                          <span className={`font-mono font-medium text-[clamp(0.6rem,2.5vw,1.125rem)] tracking-normal transition-all duration-300 min-w-0 max-w-full truncate ${
                            isHovered ? 'text-zinc-400 opacity-100' : 'text-zinc-500 opacity-40'
                          } group-hover/link:text-zinc-100`}>
                            — {item.subtext}
                          </span>
                        </div>

                        {(item.playStoreUrl || (item.comingSoonStores && item.comingSoonStores.length > 0)) && (
                          <div className="flex flex-col items-end justify-center gap-1 shrink-0 sm:flex-row sm:items-center sm:gap-1.5">
                            {item.playStoreUrl && (
                              <a
                                href={item.playStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="block h-7 sm:h-10 md:h-11 w-auto max-w-[112px] sm:max-w-[160px] hover:scale-[1.04] active:scale-95 transition-all duration-200 select-none z-30"
                                title="Get MWD Pro on Google Play Store"
                              >
                                <img 
                                  src={googlePlayBadge} 
                                  alt="Get MWD Pro on Google Play" 
                                  className="h-full w-auto max-w-full object-contain rounded border border-zinc-850 hover:border-zinc-700 transition-all duration-200" 
                                  referrerPolicy="no-referrer"
                                />
                              </a>
                            )}

                            {item.comingSoonStores?.map((store) => (
                              <ComingSoonStoreBadge key={store} store={store} />
                            ))}
                          </div>
                        )}

                        {isHovered && (
                          <div className="hidden lg:block shrink-0 animate-char-float filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" id="character-mascot-icon">
                            <svg
                              className="w-12 h-12 text-white"
                              viewBox="0 0 48 48"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M37 14 L30 19" />
                              <circle cx="38" cy="12" r="2" fill="white" className="animate-pulse" />
                              <rect x="8" y="19" width="28" height="20" rx="4" fill="#000" />
                              <rect x="11" y="22" width="22" height="14" rx="2" strokeWidth="2.5" />
                              <circle cx="17" cy="27" r="1.5" fill="white" />
                              <circle cx="27" cy="27" r="1.5" fill="white" />
                              <line x1="19" y1="31" x2="25" y2="31" />
                              <line x1="16" y1="39" x2="14" y2="45" className="animate-leg-left" />
                              <line x1="28" y1="39" x2="30" y2="45" className="animate-leg-right" />
                              <circle cx="38" cy="12" r="1" fill="#fff" />
                            </svg>
                          </div>
                        )}
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
