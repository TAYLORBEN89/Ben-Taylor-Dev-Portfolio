import React, { useRef, useState } from 'react';
import { TicketData } from '../types';
import { Sparkles, Calendar, ShieldCheck, Ticket as TicketIcon, Cpu, Github, ExternalLink } from 'lucide-react';

interface TicketProps {
  data: TicketData;
  loading?: boolean;
}

export default function Ticket({ data, loading = false }: TicketProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position relative to card element
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Percentage coordinates (0 to 100)
    const glowX = (mouseX / width) * 100;
    const glowY = (mouseY / height) * 100;
    
    // Calculations for structural 3D tilt
    const maxTilt = 12; // tilt amount in degrees
    const rX = ((mouseY / height) - 0.5) * -maxTilt; // reverse for natural look
    const rY = ((mouseX / width) - 0.5) * maxTilt;
    
    setRotate({ x: rX, y: rY });
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  // Theme styling selector
  const getThemeStyles = () => {
    switch (data.theme) {
      case 'holo':
        return {
          cardBg: 'from-slate-950 via-purple-950/70 to-blue-950/90',
          borderColor: 'border-fuchsia-500/30',
          accentColor: 'text-fuchsia-400',
          badgeBg: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-400/20',
          glowGradient: `radial-gradient(circle 220px at ${glowPosition.x}% ${glowPosition.y}%, rgba(168, 85, 247, 0.25) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 100%)`,
          lineColor: 'border-purple-500/20',
          brandText: 'bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent',
          meshColor: 'opacity-[0.06] bg-[radial-gradient(#d946ef_1px,transparent_1.5px)] [background-size:16px_16px]',
          glowShadow: 'shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)]'
        };
      case 'solar':
        return {
          cardBg: 'from-stone-950 via-amber-950/75 to-red-950/90',
          borderColor: 'border-amber-500/30',
          accentColor: 'text-amber-400',
          badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-400/20',
          glowGradient: `radial-gradient(circle 220px at ${glowPosition.x}% ${glowPosition.y}%, rgba(245, 158, 11, 0.25) 0%, rgba(239, 68, 68, 0.15) 50%, transparent 100%)`,
          lineColor: 'border-amber-500/20',
          brandText: 'bg-gradient-to-r from-yellow-400 via-amber-500 to-red-500 bg-clip-text text-transparent',
          meshColor: 'opacity-[0.06] bg-[radial-gradient(#f59e0b_1px,transparent_1.5px)] [background-size:16px_16px]',
          glowShadow: 'shadow-[0_0_50px_-12px_rgba(245,158,11,0.3)]'
        };
      case 'obsidian':
        return {
          cardBg: 'from-zinc-950 via-stone-900 to-zinc-900',
          borderColor: 'border-zinc-700/40',
          accentColor: 'text-zinc-300',
          badgeBg: 'bg-zinc-800/20 text-zinc-300 border-zinc-700/30',
          glowGradient: `radial-gradient(circle 220px at ${glowPosition.x}% ${glowPosition.y}%, rgba(255, 255, 255, 0.1) 0%, rgba(120, 120, 120, 0.05) 50%, transparent 100%)`,
          lineColor: 'border-zinc-800',
          brandText: 'bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent',
          meshColor: 'opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1.5px)] [background-size:16px_16px]',
          glowShadow: 'shadow-[0_0_50px_-12px_rgba(255,255,255,0.08)]'
        };
      case 'laser':
      default:
        return {
          cardBg: 'from-neutral-950 via-green-950/30 to-black',
          borderColor: 'border-lime-500/30',
          accentColor: 'text-lime-400',
          badgeBg: 'bg-lime-500/10 text-lime-300 border-lime-400/20',
          glowGradient: `radial-gradient(circle 220px at ${glowPosition.x}% ${glowPosition.y}%, rgba(132, 204, 22, 0.25) 0%, rgba(16, 185, 129, 0.15) 50%, transparent 100%)`,
          lineColor: 'border-lime-500/20',
          brandText: 'bg-gradient-to-r from-lime-400 to-emerald-400 bg-clip-text text-transparent',
          meshColor: 'opacity-[0.05] bg-[radial-gradient(#84cc16_1px,transparent_1.5px)] [background-size:16px_16px]',
          glowShadow: 'shadow-[0_0_50px_-12px_rgba(132,204,22,0.3)]'
        };
    }
  };

  const style = getThemeStyles();

  // Create mock physical barcode lines purely with dynamic array
  const barcodeLines = [
    2, 4, 1, 3, 2, 6, 2, 1, 4, 2, 3, 1, 5, 2, 4, 1, 2, 3, 6, 1, 2, 4, 2, 4, 1, 3, 2, 4, 1
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto py-8 px-4" id="ticket-workspace">
      {/* Decorative Ticket Ambient Backdrop Glow */}
      <div className={`absolute inset-0 -top-4 rounded-[40px] pointer-events-none transition-all duration-700 blur-3xl opacity-40 ${
        data.theme === 'holo' ? 'bg-gradient-radial from-fuchsia-500/20 to-blue-500/0' :
        data.theme === 'solar' ? 'bg-gradient-radial from-amber-500/20 to-red-500/0' :
        data.theme === 'obsidian' ? 'bg-gradient-radial from-zinc-500/15 to-transparent' :
        'bg-gradient-radial from-lime-500/20 to-emerald-500/0'
      }`} />

      {/* 3D Interactive Card Frame */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden w-full aspect-[16/9] sm:aspect-[2.1/1] rounded-2xl border ${style.borderColor} bg-gradient-to-br ${style.cardBg} backdrop-blur-md text-white transition-all duration-300 transform select-none cursor-grab active:cursor-grabbing ${style.glowShadow}`}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.03, 1.03, 1.03)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        id="physical-ticket-card"
      >
        {/* Ambient Overlay Layer for Mesh Pattern */}
        <div className={`absolute inset-0 pointer-events-none ${style.meshColor}`} />

        {/* Neural Loading / Processing Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-35 flex flex-col items-center justify-center transition-opacity duration-300">
            <div className="relative w-16 h-16 mb-4">
              <span className={`absolute inset-0 border-2 border-t-transparent rounded-full animate-spin ${
                data.theme === 'holo' ? 'border-fuchsia-500' :
                data.theme === 'solar' ? 'border-amber-500' :
                data.theme === 'obsidian' ? 'border-zinc-400' :
                'border-lime-500'
              }`} />
              <Cpu className="absolute inset-0 m-auto w-6 h-6 animate-pulse text-zinc-400" />
            </div>
            <p className="font-mono text-xs text-zinc-400 animate-pulse uppercase tracking-[0.25em]">
              Calibrating Cognitive Nodes...
            </p>
          </div>
        )}

        {/* Dynamic Light Reflection Layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-color-dodge"
          style={{
            background: isHovered ? style.glowGradient : 'transparent',
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Structural Left Perforation Dot Grid (Simulating real physical tear strip) */}
        <div className="absolute left-[70%] sm:left-[72%] top-0 bottom-0 w-[1px] flex flex-col justify-between py-2 pointer-events-none z-10">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className={`w-[2px] h-[3px] rounded-full bg-black/80 border-r ${style.lineColor}`} />
          ))}
        </div>

        {/* Main Content (Divided into Left Platform [72%] and Right Ticket Claim [28%]) */}
        <div className="flex h-full w-full">
          {/* Main Workspace Frame (Left) */}
          <div className="w-[70%] sm:w-[72%] h-full p-4 sm:p-6 flex flex-col justify-between relative">
            
            {/* Header: Branding Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <TicketIcon className={`w-5 h-5 ${style.accentColor}`} />
                <span className="font-mono text-xs font-semibold tracking-[0.3em] uppercase">B-TAYLOR 2026</span>
              </div>
              <div className={`px-2 py-0.5 rounded border font-mono text-[9px] uppercase tracking-wider ${style.badgeBg}`}>
                {data.accessLevel || 'CLASSIFIED_ROOT_VIP'}
              </div>
            </div>

            {/* Middle: AI Custom Generated Specialty Badge Title */}
            <div className="my-3 sm:my-4">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`text-[10px] font-mono tracking-widest uppercase text-zinc-500`}>Biometric Craft Title</span>
                <Sparkles className={`w-3 h-3 ${style.accentColor} animate-pulse`} />
              </div>
              <h2 className="text-sm sm:text-lg md:text-xl font-bold tracking-tight text-white uppercase line-clamp-2 max-w-[90%] leading-tight font-sans">
                {data.badgeTitle || "UNVERIFIED PROTOCOL SHAPER"}
              </h2>
              <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 sm:mt-1.5 font-mono line-clamp-1 italic max-w-md">
                "{data.badgeMotto || "Initiate custom AI compilation for personal neural credentials."}"
              </p>
            </div>

            {/* Footer: User Identity Credentials */}
            <div className="flex items-center gap-3 border-t border-zinc-800/50 pt-2.5 sm:pt-4">
              {/* Profile Avatar Frame */}
              <div className="relative">
                <div className={`absolute -inset-0.5 rounded-full bg-gradient-to-tr opacity-75 blur-[2px] ${
                  data.theme === 'holo' ? 'from-fuchsia-500 to-blue-500' :
                  data.theme === 'solar' ? 'from-amber-500 to-red-500' :
                  data.theme === 'obsidian' ? 'from-zinc-500 to-zinc-800' :
                  'from-lime-500 to-emerald-500'
                }`} />
                <img
                  referrerPolicy="no-referrer"
                  src={data.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"}
                  alt={data.name}
                  className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black object-cover bg-zinc-900"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-black rounded-full" />
              </div>

              {/* Text Credentials */}
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-white tracking-wide truncate max-w-[150px] sm:max-w-xs">{data.name || "Anonymous Captain"}</p>
                <div className="flex items-center gap-1.5 mt-0.5 text-[9px] sm:text-xs font-mono text-zinc-400">
                  <span className="truncate max-w-[120px]">{data.role || "Biometric Entity"}</span>
                  <span className="text-zinc-600">•</span>
                  <div className="flex items-center gap-0.5 text-zinc-500">
                    <span className="text-[10px] font-mono">{data.visualSymbol || "✦"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tear-off Ticket Stub Frame (Right) */}
          <div className="w-[30%] sm:w-[28%] h-full p-3 sm:p-5 flex flex-col justify-between items-center text-center relative bg-black/10">
            {/* Visual Header Dials */}
            <div className="w-full flex justify-between items-center px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              <span className="font-mono text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest leading-none">CLAIM PASS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            </div>

            {/* Middle: Graphic Visual Micro Barcode */}
            <div className="flex flex-col items-center justify-center my-1.5">
              <div className="flex items-end justify-center h-10 sm:h-12 gap-[1px] md:gap-[2px] bg-white/[0.03] p-1.5 rounded border border-white/5 opacity-85 hover:opacity-100 transition-opacity">
                {barcodeLines.map((spacing, idx) => (
                  <div
                    key={idx}
                    className={`bg-zinc-300 h-full`}
                    style={{ width: `${spacing}px` }}
                  />
                ))}
              </div>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-zinc-500 mt-1">{data.ticketNumber || '#004812'}</span>
            </div>

            {/* Footer Dials & Credentials */}
            <div className="w-full">
              <div className="flex items-center justify-center gap-1 font-mono text-[8px] sm:text-[9px] text-zinc-400 mt-1">
                <Calendar className="w-2.5 h-2.5 text-zinc-500" />
                <span>{data.claimDate || '06.03.2026'}</span>
              </div>
              <div className="text-[7.5px] font-mono text-zinc-600 mt-0.5 leading-none tracking-widest uppercase">
                UTC TIME NODE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Under-Ticket Action Bar (Share instructions) */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 bg-zinc-950/40 p-3 rounded-lg border border-zinc-800/50 max-w-2xl mx-auto backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Ticket fully authenticated under cryptographic V-Ship protocols.</span>
        </div>
        <div className="flex items-center gap-1.5 select-all text-[11px] text-zinc-500 hover:text-zinc-300 cursor-pointer">
          <span>ID: v-pass-{data.ticketNumber}</span>
        </div>
      </div>
    </div>
  );
}
