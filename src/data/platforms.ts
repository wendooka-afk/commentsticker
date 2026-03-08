export type Platform = 'tiktok' | 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'threads' | 'snapchat' | 'discord' | 'linkedin';

export interface PlatformConfig {
  id: Platform;
  name: string;
  color: string;
  bgGradient: string;
  iconBg: string;
  textColor: string;
  accentColor: string;
}

export const platforms: PlatformConfig[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    color: '#000000',
    bgGradient: 'from-gray-900 to-black',
    iconBg: 'bg-black',
    textColor: 'text-white',
    accentColor: '#fe2c55',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#E1306C',
    bgGradient: 'from-purple-600 via-pink-500 to-orange-400',
    iconBg: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
    textColor: 'text-white',
    accentColor: '#E1306C',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    color: '#FF0000',
    bgGradient: 'from-red-600 to-red-700',
    iconBg: 'bg-red-600',
    textColor: 'text-white',
    accentColor: '#FF0000',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    color: '#000000',
    bgGradient: 'from-gray-800 to-black',
    iconBg: 'bg-black',
    textColor: 'text-white',
    accentColor: '#1DA1F2',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    bgGradient: 'from-blue-600 to-blue-700',
    iconBg: 'bg-blue-600',
    textColor: 'text-white',
    accentColor: '#1877F2',
  },
  {
    id: 'threads',
    name: 'Threads',
    color: '#000000',
    bgGradient: 'from-gray-900 to-black',
    iconBg: 'bg-black',
    textColor: 'text-white',
    accentColor: '#000000',
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    color: '#FFFC00',
    bgGradient: 'from-yellow-400 to-yellow-500',
    iconBg: 'bg-yellow-400',
    textColor: 'text-black',
    accentColor: '#FFFC00',
  },
  {
    id: 'discord',
    name: 'Discord',
    color: '#5865F2',
    bgGradient: 'from-indigo-500 to-indigo-600',
    iconBg: 'bg-indigo-500',
    textColor: 'text-white',
    accentColor: '#5865F2',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0A66C2',
    bgGradient: 'from-blue-600 to-blue-700',
    iconBg: 'bg-blue-600',
    textColor: 'text-white',
    accentColor: '#0A66C2',
  },
];

export const defaultAvatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
];

export const sampleUsernames = [
  'user_cool_2024',
  'dark_knight_99',
  'sunshine_vibes',
  'gaming_pro_x',
  'travel_lover',
  'music_fan_01',
  'code_ninja',
  'foodie_world',
  'art_creator',
  'fitness_guru',
];
