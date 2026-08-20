import React, { useEffect, useRef, useState } from 'react';
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
      className="flex items-center gap-1.5 h-8 sm:h-9 px-2 sm:px-2.5 rounded border border-zinc-700 bg-black select-none shrink-0"
      title={`${isPlay ? 'Google Play' : 'App Store'} — Coming Soon`}
    >
      {isPlay ? (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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

function openProject(item: VercelShipItem) {
  const url = item.subtext.startsWith('http') ? item.subtext : `https://${item.subtext}`;
  window.open(url, '_blank');
}

function StoreBadges({ item }: { item: VercelShipItem }) {
  if (!item.playStoreUrl && !(item.comingSoonStores && item.comingSoonStores.length > 0)) {
    return null;
  }

  return (
    <>
      {item.playStoreUrl && (
        <a
          href={item.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="block h-9 sm:h-11 w-auto max-w-[140px] sm:max-w-none hover:scale-[1.08] active:scale-95 transition-all duration-200 select-none z-30 shrink-0"
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
    </>
  );
}

function WalkingTvMascot() {
  return (
    <div className="animate-char-float filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 shrink-0" id="character-mascot-icon">
      <svg
        className="w-10 h-10 sm:w-12 sm:h-12 text-white"
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
  );
}

export default function VercelShipSelector({ items, onSelectItem }: VercelShipSelectorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [armedIndex, setArmedIndex] = useState<number | null>(null);
  const pointerTypeRef = useRef<string>('mouse');
  const [prefersHover, setPrefersHover] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setPrefersHover(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const activate = (index: number, item: VercelShipItem) => {
    setHoveredIndex(index);
    if (onSelectItem) onSelectItem(item);
  };

  const handleProjectClick = (index: number, item: VercelShipItem) => {
    const isTouch = pointerTypeRef.current === 'touch' || !prefersHover;
    if (isTouch) {
      if (armedIndex === index) {
        openProject(item);
        return;
      }
      setArmedIndex(index);
      activate(index, item);
      return;
    }
    openProject(item);
  };

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
                      onPointerDown={(event) => {
                        pointerTypeRef.current = event.pointerType || 'mouse';
                      }}
                      onMouseEnter={() => {
                        if (pointerTypeRef.current === 'touch') return;
                        activate(index, item);
                      }}
                      className={`relative w-full min-w-0 transition-all duration-150 select-none border-2 overflow-hidden ${
                        isHovered 
                          ? 'bg-transparent border-white z-10 md:scale-[1.01]' 
                          : 'bg-transparent border-zinc-900/40'
                      }`}
                      id={`vercel-ship-row-${item.id}`}
                    >

                      <div className="flex items-start sm:items-center justify-between gap-2 pr-3 sm:pr-4 md:pr-10 relative z-10 min-w-0">
                        <div className="min-w-0 flex-1 py-4 sm:py-5 pl-4 sm:pl-6 md:pl-10">
                          <div
                            onClick={() => handleProjectClick(index, item)}
                            className="min-w-0 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 cursor-pointer group/link"
                            title={
                              !prefersHover && armedIndex !== index
                                ? `Select ${item.title}`
                                : `Launch ${item.title} (${item.subtext})`
                            }
                          >
                            <h3 className={`font-retro tracking-wide text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-300 leading-none uppercase break-words ${
                              isHovered ? 'text-white opacity-100' : 'text-zinc-500 opacity-40'
                            } group-hover/link:text-white`}>
                              {item.title}
                            </h3>
                            <span className={`font-mono font-medium text-xs sm:text-sm md:text-base lg:text-lg tracking-normal transition-all duration-300 opacity-80 min-w-0 max-w-full truncate ${
                              isHovered ? 'text-zinc-400 opacity-100' : 'text-zinc-650 opacity-20'
                            } group-hover/link:text-zinc-100`}>
                              — {item.subtext}
                            </span>
                          </div>

                          {(item.playStoreUrl || (item.comingSoonStores && item.comingSoonStores.length > 0)) && (
                            <div className="flex sm:hidden items-center gap-2 mt-3">
                              <StoreBadges item={item} />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative pt-4 sm:pt-0">
                          <div className="hidden sm:flex items-center gap-1.5">
                            <StoreBadges item={item} />
                          </div>

                          {isHovered && (
                            <div className="mr-1 sm:mr-2 md:mr-6">
                              <WalkingTvMascot />
                            </div>
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
