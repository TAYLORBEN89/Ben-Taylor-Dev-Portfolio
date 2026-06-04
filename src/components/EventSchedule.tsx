import React, { useState, useEffect } from 'react';
import { CitySchedule, EventSession } from '../types';
import { Calendar, MapPin, Users, Flame, Clock, Radio, ChevronRight, ToggleLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function EventSchedule() {
  const [selectedCity, setSelectedCity] = useState<string | null>('Hey Austin');
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 42, seconds: 15 });

  // Dynamically update countdown timer to keep dashboard live
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const cities: CitySchedule[] = [
    {
      name: 'Hey Austin',
      date: 'HAY',
      timeUTC: 'ONLINE',
      venue: 'heyaustin.vercel.app',
      status: 'upcoming',
      speakers: ['Austin', 'Vercel Deployer'],
      track: 'Conversational LLMs'
    },
    {
      name: 'Trumpty Dumpty',
      date: 'TDMP',
      timeUTC: 'ONLINE',
      venue: 'trumptydumpty.vercel.app',
      status: 'upcoming',
      speakers: ['Meme Engineer'],
      track: 'Generative Humor'
    },
    {
      name: 'Karolying Leavitt',
      date: 'KRL',
      timeUTC: 'ONLINE',
      venue: 'karolyingleavitt.vercel.app',
      status: 'upcoming',
      speakers: ['Karolying'],
      track: 'Decentralized AI Agents'
    },
    {
      name: 'Shaggy Coin',
      date: 'SHAG',
      timeUTC: 'ONLINE',
      venue: 'shaggycoin.vercel.app',
      status: 'upcoming',
      speakers: ['Zoinks Devs'],
      track: 'Memetic Cryptography'
    },
    {
      name: 'Wavy Gravy',
      date: 'WAVY',
      timeUTC: 'ONLINE',
      venue: 'wavygravy.vercel.app',
      status: 'upcoming',
      speakers: ['Wavy', 'UI Synthesizer'],
      track: 'Psychedelic Canvas'
    }
  ];

  const sessionsByCity: Record<string, EventSession[]> = {
    'Hey Austin': [
      { id: 'hey-1', title: 'Interactive Conversational Interface with Custom System Prompts', speaker: 'Austin', speakerRole: 'Lead Architect', time: 'DEPLOYED', tag: 'LLM Systems', capacity: 'Active' },
      { id: 'hey-2', title: 'Deploying High-Fidelity React Interfaces to Vercel Serverless Edge', speaker: 'Vercel Deployer', speakerRole: 'Edge Architect', time: 'ONLINE', tag: 'Infrastructures', capacity: 'Online' }
    ],
    'Trumpty Dumpty': [
      { id: 'trmp-1', title: 'Generative Comedy and Gamified Meme Physics Pipelines', speaker: 'Meme Engineer', speakerRole: 'Media Lead', time: 'DEPLOYED', tag: 'Meme Engine', capacity: 'Active' }
    ],
    'Karolying Leavitt': [
      { id: 'krl-1', title: 'Political AI Assistant & Decentralized Media Synthesizer', speaker: 'Karolying', speakerRole: 'Lead Designer', time: 'DEPLOYED', tag: 'Agentic Workflows', capacity: 'Online' }
    ],
    'Shaggy Coin': [
      { id: 'shag-1', title: 'Zoinks! Scaling Memetic Blockchain Assets with Speed & Humor', speaker: 'Zoinks Devs', speakerRole: 'Asset Planners', time: 'DEPLOYED', tag: 'Crypto Assets', capacity: 'Active' }
    ],
    'Wavy Gravy': [
      { id: 'wavy-1', title: 'GLSL Shaders & Generative Fluid Waves for Immersive Experiences', speaker: 'Wavy', speakerRole: 'Immersive Dev', time: 'DEPLOYED', tag: 'Visual Coding', capacity: 'Online' }
    ]
  };

  const currentCitySessions = selectedCity ? (sessionsByCity[selectedCity] || []) : [];

  return (
    <div className="w-full text-white py-12 px-4" id="event-schedule-section">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-zinc-900 pb-6">
          <div>
            <div className="flex items-center gap-2 text-lime-400 font-mono text-[10px] uppercase tracking-widest mb-2.5">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              <span>Event Horizon Core</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Active Project Showcase</h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-mono mt-1">
              Direct insight into high-performance web applications deployed live on the Vercel infrastructure.
            </p>
          </div>

          {/* countdown clock bento box */}
          <div className="flex items-center gap-3 backdrop-blur-md bg-zinc-950 p-3 rounded-xl border border-zinc-900 shadow-inner">
            <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-zinc-500 pr-3 border-r border-zinc-900">
              <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
              <span>Project Team<br />Sync Clock</span>
            </div>
            <div className="flex gap-2">
              {[
                { val: timeLeft.days, unit: 'D' },
                { val: timeLeft.hours, unit: 'H' },
                { val: timeLeft.minutes, unit: 'M' },
                { val: timeLeft.seconds, unit: 'S' }
              ].map((time, idx) => (
                <div key={idx} className="flex flex-col items-center animate-pulse-slow">
                  <span className="bg-black border border-green-500/20 px-2.5 py-1 rounded min-w-[38px] text-center font-retro text-lg text-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.15)] select-none">
                    {String(time.val).padStart(2, '0')}
                  </span>
                  <span className="text-[7.5px] font-mono mt-1 text-zinc-500 uppercase tracking-wider">{time.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Grid Concept Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Interactive City Nav Board (4 columns in Bento Layout) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-4">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4 px-1 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                Global Node Transceivers
              </h3>
              
              <div className="flex flex-col gap-2.5">
                {cities.map((city) => {
                  const isActive = selectedCity === city.name;
                  const citySessions = sessionsByCity[city.name] || [];

                  return (
                    <div
                      key={city.name}
                      className={`w-full rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col ${
                        isActive
                          ? 'bg-zinc-900 border-lime-400 bg-lime-500/[0.01] shadow-[0_0_15px_rgba(132,204,22,0.1)]'
                          : 'bg-zinc-950/40 border-zinc-900/80 hover:bg-zinc-900/30 hover:border-zinc-800'
                      }`}
                      id={`city-nav-${city.name}`}
                    >
                      {/* Interactive Trigger Button Row */}
                      <button
                        type="button"
                        onClick={() => {
                          if (isActive) {
                            setSelectedCity(null);
                          } else {
                            setSelectedCity(city.name);
                          }
                        }}
                        className="w-full p-3.5 text-left flex items-center justify-between relative select-none cursor-pointer focus:outline-none"
                      >
                        {/* Interactive glowing vertical bar */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-lime-400" />
                        )}

                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg font-mono text-xs font-black min-w-14 text-center transition-colors duration-200 ${
                            isActive ? 'bg-lime-400 text-black' : 'bg-zinc-900 text-zinc-400'
                          }`}>
                            {city.date}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold font-sans text-sm tracking-wide text-white">{city.name.toUpperCase()}</span>
                              <span className="text-[9px] font-mono text-zinc-600">•</span>
                              <span className="text-[10px] font-mono text-zinc-500">{city.timeUTC}</span>
                            </div>
                            <p className="text-[11px] text-zinc-400 font-mono truncate max-w-[150px] sm:max-w-xs">{city.venue}</p>
                          </div>
                        </div>

                        {/* Speakers micro badge */}
                        <div className="flex items-center gap-1 text-zinc-400 font-mono text-[10px]">
                          <Users className="w-3 h-3 text-zinc-500" />
                          <span>{city.speakers.length}</span>
                          <ChevronRight className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-300 ${isActive ? 'rotate-90 text-lime-400' : ''}`} />
                        </div>
                      </button>

                      {/* Smooth animation dropdown container */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-3.5 pb-4 pt-1 border-t border-zinc-900 bg-[#000000]/30 mr-1 ml-1 mb-1 rounded-b-lg">
                              <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-lime-400 mb-3 mt-1.5 flex items-center gap-1.5 bg-lime-500/5 px-2.5 py-1 rounded border border-lime-500/10">
                                <Radio className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
                                <span>LIVE DETAILED SEGMENTS</span>
                              </div>

                              <div className="flex flex-col gap-2.5">
                                {citySessions.map((session) => (
                                  <div
                                    key={session.id}
                                    className="border border-zinc-900 bg-zinc-950/80 rounded-lg p-3 hover:border-zinc-800 transition duration-150"
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-retro text-xs text-lime-400 bg-lime-500/5 px-2 py-0.5 rounded border border-lime-500/10">
                                        {session.time}
                                      </span>
                                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{session.tag}</span>
                                    </div>
                                    <h4 className="font-bold text-xs text-zinc-250 leading-snug">
                                      {session.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-2">
                                      <div className="w-4 h-4 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center font-mono text-[8.5px] text-zinc-400 font-bold">
                                        {session.speaker.charAt(0)}
                                      </div>
                                      <span className="text-[11px] text-zinc-300 font-semibold">{session.speaker}</span>
                                      <span className="text-zinc-700">•</span>
                                      <span className="text-[9px] font-mono text-zinc-500">{session.speakerRole}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-zinc-900 flex justify-end">
                                <a
                                  href={`https://${city.venue}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[9.5px] font-mono hover:text-white transition font-bold flex items-center gap-1 text-lime-400 uppercase tracking-widest bg-lime-500/5 hover:bg-lime-500/15 px-2.5 py-1 rounded border border-lime-500/10"
                                >
                                  Open Site
                                  <ChevronRight className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Micro Bento Box: Quick Stats / Callout */}
            <div className="bg-gradient-to-br from-zinc-950 to-neutral-950 rounded-2xl border border-zinc-900 p-5 relative overflow-hidden group/box">
              <div className="absolute top-0 right-0 w-24 h-24 bg-lime-500/5 rounded-full blur-2xl group-hover/box:scale-150 transition-all duration-700 pointer-events-none" />
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-lime-500/10 text-lime-400 rounded-xl border border-lime-500/20">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400">Collaborators</h4>
                  <p className="text-lg font-bold text-white tracking-tight mt-0.5">85,248 Claims Claimed</p>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase mt-0.5">Active Ticket Engine Load: 4.2%</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Selected City Program Details (7 columns in Bento Layout) */}
          <div className="lg:col-span-7 bg-zinc-950 rounded-2xl border border-zinc-900 p-5 md:p-6 min-h-[400px] flex flex-col justify-between">
            {!selectedCity ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center text-center py-16 px-4 min-h-[340px]">
                <div className="w-16 h-16 rounded-full border border-zinc-900 flex items-center justify-center mb-5 bg-black relative">
                  <div className="absolute inset-0 bg-lime-500/5 animate-pulse rounded-full" />
                  <Radio className="w-8 h-8 text-zinc-600 animate-pulse" />
                </div>
                <h4 className="font-retro uppercase tracking-[0.2em] text-zinc-400 text-xl sm:text-2xl">Awaiting Uplink</h4>
                <p className="text-zinc-500 font-mono text-[11.5px] sm:text-xs max-w-sm mt-3 leading-relaxed">
                  TRANSCEIVER SYSTEM IN STANDBY. SELECT A GLOBAL NODE TRANSCEIVER TO STREAM ENCRYPTED TICKET PAYLOADS.
                </p>
                <div className="w-48 h-[1px] bg-zinc-900 my-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-20 bg-lime-400/40 animate-[scroll_2.5s_linear_infinite]" />
                </div>
                <div className="text-[10px] font-mono text-zinc-650 uppercase tracking-widest animate-pulse flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-750 animate-ping" />
                  STATION REGISTER ONLINE | FEED IDLE
                </div>
              </div>
            ) : (
              <>
                <div>
                  {/* Header inside details container */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-900 pb-4 mb-6 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-900 rounded-lg text-white">
                        <Radio className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-500">LIVE DETAILED SEGMENTS</span>
                        <h3 className="text-lg font-bold tracking-wide uppercase text-white">{selectedCity} Node Summit</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 rounded-full text-zinc-400 text-[10px] font-mono">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      <span>{cities.find(c => c.name === selectedCity)?.venue}</span>
                    </div>
                  </div>

                  {/* Session entries mapping */}
                  <div className="flex flex-col gap-4">
                    {currentCitySessions.map((session, index) => (
                      <div
                        key={session.id}
                        className="group border border-zinc-900 bg-zinc-950/60 rounded-xl p-4 hover:bg-zinc-900/40 hover:border-zinc-800 transition relative"
                        id={`session-card-${session.id}`}
                      >
                        <div className="flex justify-between items-start gap-4 flex-wrap sm:flex-nowrap">
                          <div>
                            {/* Time and category tag row */}
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="font-mono text-[10px] text-lime-400 bg-lime-500/5 px-2 py-0.5 rounded border border-lime-500/10 tracking-wider">
                                {session.time}
                              </span>
                              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{session.tag}</span>
                            </div>
                            
                            {/* Session title */}
                            <h4 className="font-bold text-sm text-zinc-150 tracking-tight group-hover:text-white transition leading-snug">
                              {session.title}
                            </h4>

                            {/* Speaker details */}
                            <div className="flex items-center gap-2.5 mt-2">
                              <div className="w-5 h-5 bg-zinc-850 border border-zinc-800 rounded-full flex items-center justify-center font-mono text-[9px] text-zinc-400 font-bold">
                                {session.speaker.charAt(0)}
                              </div>
                              <span className="text-xs text-zinc-300 font-semibold">{session.speaker}</span>
                              <span className="text-zinc-700">•</span>
                              <span className="text-[10px] font-mono text-zinc-500">{session.speakerRole}</span>
                            </div>
                          </div>

                          {/* Status / Attendance Capacity Badge */}
                          <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900/40 px-2.5 py-1 rounded-full border border-zinc-850 shrink-0 uppercase sm:self-center">
                            {session.capacity || 'Open Seat'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom info link inside program card */}
                <div className="mt-8 border-t border-zinc-900/80 pt-4 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-650" />
                    *Node status indicators are verified live.
                  </span>
                  <a
                    href={`https://${cities.find(c => c.name === selectedCity)?.venue || ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition font-bold flex items-center gap-1 text-lime-400"
                  >
                    Open {selectedCity} Site
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
