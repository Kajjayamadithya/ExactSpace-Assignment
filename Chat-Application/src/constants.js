export const INITIAL_USER_LIST = ["Adithya", "Tarun", "Ashish", "Pranav", "Thapan"];

// Backwards compatibility for existing imports
export const user_list = INITIAL_USER_LIST;

export const AVATAR_PALETTE = [
  '#ef5350', // coral red
  '#9ccc65', // lime green
  '#ffa726', // warm amber
  '#42a5f5', // sky blue
  '#ec407a', // rose pink
  '#ab47bc', // purple
  '#26a69a', // teal
  '#5c6bc0', // indigo
  '#ff7043', // deep orange
  '#26c6da', // cyan
  '#78909c'  // blue grey
];

export const PRESET_USER_COLORS = {
  Adithya: {
    avatarBg: '#ef5350',
    avatarColor: '#ffffff',
    initials: 'AL'
  },
  Tarun: {
    avatarBg: '#9ccc65',
    avatarColor: '#ffffff',
    initials: 'BO'
  },
  Ashish: {
    avatarBg: '#ffa726',
    avatarColor: '#ffffff',
    initials: 'CA'
  },
  Pranav: {
    avatarBg: '#42a5f5',
    avatarColor: '#ffffff',
    initials: 'DE'
  },
  Thapan: {
    avatarBg: '#ec407a',
    avatarColor: '#ffffff',
    initials: 'EE'
  }
};

/**
 * Returns consistent avatar styling and initials for any username (static or dynamically added).
 */
export function getUserMeta(username) {
  if (!username) {
    return { avatarBg: '#94a3b8', avatarColor: '#ffffff', initials: '?' };
  }

  if (PRESET_USER_COLORS[username]) {
    return PRESET_USER_COLORS[username];
  }

  // Deterministic color assignment based on name string
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % AVATAR_PALETTE.length;
  const avatarBg = AVATAR_PALETTE[colorIndex];

  // Generate 1 or 2 letter initials
  const parts = username.trim().split(/\s+/);
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : username.substring(0, Math.min(2, username.length)).toUpperCase();

  return {
    avatarBg,
    avatarColor: '#ffffff',
    initials
  };
}

export const CHANNELS = [
  { id: 'announcements', name: 'Announcements' },
  { id: 'hr_benefits', name: 'HR & Benefits' },
  { id: 'tech_support', name: 'Tech Support' }
];
