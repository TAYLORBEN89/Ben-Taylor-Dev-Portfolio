import React, { useState, useRef } from 'react';
import { TicketData } from '../types';
import { md5 } from '../utils/md5';
import { Sparkles, Upload, Shuffle, Github, Image as ImageIcon, Check, Command, ShieldAlert, Cpu, Mail, Globe } from 'lucide-react';

interface TicketCustomizerProps {
  onUpdate: (data: Partial<TicketData>) => void;
  ticketData: TicketData;
  onGenerateBadge: () => Promise<void>;
  generating: boolean;
  errorMsg: string | null;
}

export default function TicketCustomizer({
  onUpdate,
  ticketData,
  onGenerateBadge,
  generating,
  errorMsg
}: TicketCustomizerProps) {
  const [gitUsername, setGitUsername] = useState('');
  const [fetchingGit, setFetchingGit] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('bt4ylor1776@gmail.com');
  const [fetchingGoogle, setFetchingGoogle] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Unsplash preset beautiful avatar image links to rotate through
  const presetImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  ];

  const handleFetchGoogle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim()) return;
    setFetchingGoogle(true);
    setTimeout(() => {
      const emailLower = googleEmail.trim().toLowerCase();
      const hash = md5(emailLower);
      const avatarUrl = `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
      onUpdate({
        avatarUrl,
        name: emailLower.split('@')[0].toUpperCase().replace(/[\._\-]/g, ' '),
        role: "Full-Stack Developer"
      });
      setFetchingGoogle(false);
    }, 450);
  };

  const handleFetchGithub = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gitUsername.trim()) return;
    setFetchingGit(true);
    try {
      // Fetch avatar URL from raw github endpoint or api
      const avatarUrl = `https://github.com/${gitUsername.trim()}.png`;
      onUpdate({
        avatarUrl,
        name: gitUsername.trim().toUpperCase(),
        role: "Github Ship Developer"
      });
    } catch (e) {
      console.error("Failed to map github user", e);
    } finally {
      setFetchingGit(false);
    }
  };

  // Support local Drag and Drop upload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onUpdate({ avatarUrl: e.target.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const rotatePresetImage = () => {
    const currentIndex = presetImages.indexOf(ticketData.avatarUrl);
    const nextIndex = (currentIndex + 1) % presetImages.length;
    onUpdate({ avatarUrl: presetImages[nextIndex] });
  };

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-5 md:p-6 text-white max-w-xl mx-auto backdrop-blur-md" id="customizer-box">
      
      {/* Box Header */}
      <div className="flex items-center gap-3 border-b border-zinc-900 pb-4 mb-5">
        <div className="p-2 rounded-lg bg-zinc-900 text-lime-400">
          <Command className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-100">Personalization Deck</h3>
          <p className="text-[11px] text-zinc-500 font-mono">Calibrate biometric and aesthetic layers of your pass.</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        
        {/* Aesthetic Theme Swatches Selector */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Aesthetic Skin Preset</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'laser', label: 'Laser', bg: 'bg-lime-500', name: 'Midnight Laser' },
              { id: 'holo', label: 'Prism', bg: 'bg-fuchsia-500', name: 'Holographic Prism' },
              { id: 'solar', label: 'Solar', bg: 'bg-amber-600', name: 'Solar Sunset' },
              { id: 'obsidian', label: 'Core', bg: 'bg-zinc-400', name: 'Obsidian Core' }
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => onUpdate({ theme: theme.id as 'laser' | 'holo' | 'solar' | 'obsidian' })}
                className={`py-2 px-1.5 rounded-lg border text-left transition-all relative ${
                  ticketData.theme === theme.id
                    ? 'border-white bg-zinc-900/60 ring-1 ring-zinc-700'
                    : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900/40 hover:border-zinc-700'
                }`}
                type="button"
                id={`theme-btn-${theme.id}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${theme.bg} shrink-0`} />
                  <span className="text-[10px] font-mono tracking-wide hidden sm:inline">{theme.label}</span>
                </div>
                {ticketData.theme === theme.id && (
                  <span className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Identity Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Operational Name</label>
            <input
              type="text"
              value={ticketData.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="e.g. CORA CHASE"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 px-3 text-xs font-sans text-white focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
              required
              id="input-core-name"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Base Profession</label>
            <input
              type="text"
              value={ticketData.role}
              onChange={(e) => onUpdate({ role: e.target.value })}
              placeholder="e.g. AI System Architect"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 px-3 text-xs font-sans text-white focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
              required
              id="input-core-role"
            />
          </div>
        </div>

        {/* Dynamic Bio Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Primary Skills</label>
            <input
              type="text"
              value={ticketData.skills}
              onChange={(e) => onUpdate({ skills: e.target.value })}
              placeholder="e.g. React, LLMs, WebGL"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-zinc-600"
              required
              id="input-core-skills"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Focus Interest</label>
            <input
              type="text"
              value={ticketData.interest}
              onChange={(e) => onUpdate({ interest: e.target.value })}
              placeholder="e.g. Autonomous Agents"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 px-3 text-xs font-mono text-white focus:outline-none focus:border-zinc-600"
              required
              id="input-core-interest"
            />
          </div>
        </div>

        {/* Biometric Avatar & Photo Deck */}
        <div className="border border-zinc-900 bg-zinc-950/40 p-4 rounded-xl">
          <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Avatar Imagery Node</label>
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            
            {/* Visual Avatar preview in customizer */}
            <div className="flex flex-col items-center justify-center bg-zinc-900/60 p-3 rounded-lg border border-zinc-800 text-center shrink-0 w-24">
              <img
                src={ticketData.avatarUrl}
                alt="Avatar Preview"
                className="w-12 h-12 rounded-full object-cover border border-zinc-700 bg-zinc-950 mb-1.5"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={rotatePresetImage}
                className="text-[9px] font-mono hover:text-white text-zinc-400 border border-zinc-800 hover:bg-zinc-800 transition py-0.5 px-1.5 rounded-full flex items-center gap-1"
                id="preset-rotate-btn"
              >
                <Shuffle className="w-2.5 h-2.5" />
                Rotate
              </button>
            </div>

            {/* Drag and Drop Box + Manual Selection (Usability mandate) */}
            <div
              className={`flex-1 flex flex-col items-center justify-center p-4 border rounded-lg border-dashed text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-white bg-zinc-900/80 text-white'
                  : 'border-zinc-800 bg-zinc-950/20 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/10'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
              id="file-dropzone"
            >
              <Upload className="w-4 h-4 mb-1.5 text-zinc-500 animate-pulse" />
              <p className="text-[10px] font-mono text-zinc-300">
                Drag photo here or <span className="text-white underline font-semibold">Browse</span>
              </p>
              <p className="text-[8px] font-mono text-zinc-500 mt-1 uppercase">JPG, PNG, GIF files up to 2MB</p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                id="hidden-avatar-input"
              />
            </div>
          </div>

          {/* Sync via Google Email / Gravatar */}
          <form onSubmit={handleFetchGoogle} className="mt-4 flex gap-2 pt-3 border-t border-zinc-900/40">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-zinc-500">
                <Mail className="w-3.5 h-3.5" />
              </span>
              <input
                type="email"
                value={googleEmail}
                onChange={(e) => setGoogleEmail(e.target.value)}
                placeholder="Google Account Email..."
                className="w-full bg-zinc-900/60 border border-zinc-900 rounded-lg py-1.5 pl-8 pr-3 text-[11px] font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
                id="google-email-input"
              />
            </div>
            <button
              type="submit"
              disabled={fetchingGoogle || !googleEmail}
              className="bg-purple-950/45 hover:bg-purple-900/60 text-purple-200 hover:text-white disabled:bg-zinc-950 disabled:text-zinc-600 border border-purple-500/20 hover:border-purple-500/40 text-[10px] font-mono py-1.5 px-3 rounded-lg transition shrink-0"
              id="google-sync-btn"
            >
              {fetchingGoogle ? 'Syncing...' : 'Sync Google Profile'}
            </button>
          </form>

          {/* Sync via Github handle */}
          <form onSubmit={handleFetchGithub} className="mt-2.5 flex gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-zinc-500">
                <Github className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={gitUsername}
                onChange={(e) => setGitUsername(e.target.value)}
                placeholder="Synchronize with GitHub Username..."
                className="w-full bg-zinc-900/60 border border-zinc-900 rounded-lg py-1.5 pl-8 pr-3 text-[11px] font-mono text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-zinc-700"
                id="git-username-input"
              />
            </div>
            <button
              type="submit"
              disabled={fetchingGit || !gitUsername}
              className="bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-950 text-zinc-300 disabled:text-zinc-600 border border-zinc-700/50 hover:border-zinc-600 text-[10px] font-mono py-1.5 px-3 rounded-lg transition shrink-0"
              id="git-sync-btn"
            >
              {fetchingGit ? 'Syncing...' : 'Sync GitHub'}
            </button>
          </form>
        </div>

        {/* Generate / Claim Ticket Button */}
        <div className="pt-3 border-t border-zinc-900/80">
          <button
            type="button"
            disabled={generating}
            onClick={onGenerateBadge}
            className={`w-full py-3.5 rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-semibold text-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
              generating
                ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                : 'bg-white hover:bg-zinc-100 border border-zinc-300 hover:scale-[0.99] cursor-pointer'
            }`}
            id="neural-badge-generate-btn"
          >
            {generating ? (
              <>
                <span className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin shrink-0" />
                <span>Generating Neural Credentials...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 animate-bounce" />
                <span>Synthesize Neural Ticket</span>
              </>
            )}
          </button>
          
          {errorMsg ? (
            <p className="text-[11px] font-mono text-red-400 mt-2.5 flex items-center gap-1.5 bg-red-950/20 p-2.5 rounded border border-red-900/40">
              <ShieldAlert className="w-3.5 h-3.5" />
              {errorMsg}
            </p>
          ) : (
            <p className="text-[10px] font-mono text-zinc-500 mt-2 text-center">
              Uses Gemini LLM to analyze your focus fields and craft elite credential badges.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
