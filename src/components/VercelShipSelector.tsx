import React, { useState } from 'react';
import { VercelShipItem } from '../types';
import { Sparkles, Plus, Trash2, RotateCcw, Edit3, Check, CheckCircle, Info } from 'lucide-react';

interface VercelShipSelectorProps {
  items: VercelShipItem[];
  onChangeItems: (items: VercelShipItem[]) => void;
  onSelectItem?: (item: VercelShipItem) => void;
}

export default function VercelShipSelector({ items, onChangeItems, onSelectItem }: VercelShipSelectorProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  // Default values to revert if needed
  const defaultItems: VercelShipItem[] = [
    { id: '1', title: 'Hey Austin', subtext: 'heyaustin.vercel.app', code: 'HAY' },
    { id: '2', title: 'Trumpty Dumpty', subtext: 'trumptydumpty.vercel.app', code: 'TDMP' },
    { id: '3', title: 'Karolying Leavitt', subtext: 'karolyingleavitt.vercel.app', code: 'KRL' },
    { id: '4', title: 'Shaggy Coin', subtext: 'shaggycoin.vercel.app', code: 'SHAG' },
    { id: '5', title: 'Wavy Gravy', subtext: 'wavygravy.vercel.app', code: 'WAVY' }
  ];

  const handleUpdateItem = (id: string, field: keyof VercelShipItem, value: string) => {
    const updated = items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChangeItems(updated);
  };

  const handleAddItem = () => {
    const newId = String(Date.now());
    const newItem: VercelShipItem = {
      id: newId,
      title: 'New Checkpoint',
      subtext: '12.01',
      code: 'NEW'
    };
    onChangeItems([...items, newItem]);
    setEditingItem(newId);
    setHoveredIndex(items.length);
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = items.filter(item => item.id !== id);
    onChangeItems(filtered);
    if (hoveredIndex >= filtered.length) {
      setHoveredIndex(Math.max(0, filtered.length - 1));
    }
  };

  const handleReset = () => {
    onChangeItems(defaultItems);
    setHoveredIndex(0);
    setEditingItem(null);
  };

  // Active item details based on hovered index
  const activeItem = items[hoveredIndex] || items[0] || { id: '0', title: 'Ship', subtext: '', code: 'S' };

  return (
    <div className="w-full text-white py-10 px-4" id="vercel-ship-selector-component">
      <div className="max-w-4xl mx-auto">
        
        {/* VERCEL SHIP NAV COMPOSER BOARD */}
        <div className="border border-zinc-800 rounded-3xl bg-[#030303] overflow-hidden shadow-2xl relative">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-900 bg-black/90">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">CHOOSE YOUR PROJECT:</span>
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
                No checkpoints found inside current register.<br />
                Click "Add Custom Checkpoint" below to seed items!
              </div>
            ) : (
              <div className="divide-y divide-zinc-900 border-b border-zinc-900">
                {items.map((item, index) => {
                  const isHovered = hoveredIndex === index;
                  const isEditing = editingItem === item.id;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                        if (onSelectItem) onSelectItem(item);
                      }}
                      className={`relative w-full transition-all duration-200 select-none ${
                        isHovered ? 'bg-[#0a0a0a]' : 'bg-transparent'
                      }`}
                      id={`vercel-ship-row-${item.id}`}
                    >
                      {/* Flex wrapper for the big text line */}
                      <div className="flex items-center justify-between pr-4 md:pr-10">
                        {isEditing ? (
                          <div className="flex-1 flex flex-wrap gap-3 p-4 bg-zinc-950 items-center justify-between">
                            <div className="flex-1 min-w-[200px] flex gap-2">
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => handleUpdateItem(item.id, 'title', e.target.value)}
                                className="bg-zinc-900 text-white font-sans font-bold text-sm px-2.5 py-1.5 rounded border border-zinc-850 w-full focus:outline-none focus:border-white"
                                placeholder="Location name..."
                              />
                              <input
                                type="text"
                                value={item.subtext}
                                onChange={(e) => handleUpdateItem(item.id, 'subtext', e.target.value)}
                                className="bg-zinc-900 text-white font-mono text-xs px-2.5 py-1.5 rounded border border-zinc-850 w-24 focus:outline-none focus:border-white"
                                placeholder="Date (MM.DD)..."
                              />
                              <input
                                type="text"
                                value={item.code}
                                onChange={(e) => handleUpdateItem(item.id, 'code', e.target.value.toUpperCase().slice(0, 4))}
                                className="bg-zinc-900 text-white font-mono text-xs px-2.5 py-1.5 rounded border border-zinc-850 w-16 focus:outline-none focus:border-white"
                                placeholder="Code..."
                              />
                            </div>
                            <button
                              onClick={() => setEditingItem(null)}
                              className="bg-zinc-100 hover:bg-white text-black rounded px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                              title="Confirm Edit"
                            >
                              Done
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => {
                              const url = item.subtext.startsWith('http') ? item.subtext : `https://${item.subtext}`;
                              window.open(url, '_blank');
                            }}
                            className="flex-1 py-5 pl-6 md:pl-10 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 cursor-pointer group/link"
                            title={`Launch ${item.title} (${item.subtext})`}
                          >
                            {/* Static interactive list line matching video */}
                            <h3 className={`font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight transition-all duration-300 leading-none ${
                              isHovered ? 'text-white opacity-100' : 'text-zinc-500 opacity-40'
                            } group-hover/link:text-lime-400`}>
                              {item.title}
                            </h3>
                            <span className={`font-mono font-medium text-xs sm:text-sm md:text-base lg:text-lg tracking-normal transition-all duration-300 opacity-80 ${
                              isHovered ? 'text-zinc-400 opacity-100' : 'text-zinc-650 opacity-20'
                            } group-hover/link:text-white truncate`}>
                              — {item.subtext}
                            </span>
                          </div>
                        )}

                        {/* Character Mascot & Action Tools on right side */}
                        {!isEditing && (
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

                            {/* Hover tools (Edit / Delete buttons to interact with own content) */}
                            <div className={`flex items-center gap-1.5 transition-opacity duration-200 ${
                              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}>
                              <button
                                onClick={() => setEditingItem(item.id)}
                                className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 rounded-lg text-zinc-400 hover:text-white transition"
                                title="Edit Item Details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => handleDeleteItem(item.id, e)}
                                className="p-2 bg-zinc-900/40 border border-zinc-900 hover:border-red-900 rounded-lg text-zinc-500 hover:text-red-400 transition"
                                title="Delete Checkpoint"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Inline controls to instantly insert own content */}
          <div className="px-6 py-4 bg-zinc-950/90 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-900">
            <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[11px]">
              <Info className="w-3.5 h-3.5 text-zinc-400" />
              <span>Hover lists on desktop to lock neural transponders.</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleReset}
                className="p-2 px-3 text-xs bg-zinc-900 hover:bg-zinc-850/80 hover:text-white border border-zinc-850 rounded-lg font-mono text-zinc-400 flex items-center gap-1.5 transition"
                id="reset-checkpoints-btn"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Defaults
              </button>
              
              <button
                type="button"
                onClick={handleAddItem}
                className="p-2 px-4 text-xs bg-white hover:bg-zinc-100 hover:scale-[0.99] rounded-lg font-mono text-black font-bold flex items-center gap-1.5 transition"
                id="add-checkpoint-btn"
              >
                <Plus className="w-4 h-4 text-black" />
                Add Custom Checkpoint
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
