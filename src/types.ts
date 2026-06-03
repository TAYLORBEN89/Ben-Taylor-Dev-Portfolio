export interface TicketData {
  name: string;
  role: string;
  skills: string;
  interest: string;
  avatarUrl: string;
  ticketNumber: string;
  claimDate: string;
  accessLevel: string;
  badgeTitle: string;
  badgeMotto: string;
  visualSymbol: string;
  theme: 'laser' | 'holo' | 'solar' | 'obsidian';
}

export interface CitySchedule {
  name: string;
  date: string;
  timeUTC: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  speakers: string[];
  track: string;
}

export interface EventSession {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  time: string;
  tag: string;
  capacity?: string;
}

export interface VercelShipItem {
  id: string;
  title: string;
  subtext: string;
  code: string;
}

