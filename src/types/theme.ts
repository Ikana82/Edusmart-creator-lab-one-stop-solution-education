export type ColorTheme = 'biru' | 'hijau' | 'navy' | 'lilac' | 'pink' | 'orange';

export interface ThemeConfig {
  id: ColorTheme;
  name: string;
  label: string;
  colorHex: string;
  primary: string;
  primaryHover: string;
  text: string;
  border: string;
  ring: string;
  bgLight: string;
  bgLighter: string;
  badge: string;
  gradient: string;
  heroGradient: string;
}

export const THEME_CONFIGS: Record<ColorTheme, ThemeConfig> = {
  biru: {
    id: 'biru',
    name: 'Biru',
    label: 'Biru (Ocean & Sky)',
    colorHex: '#2563eb',
    primary: 'bg-blue-600 text-white',
    primaryHover: 'hover:bg-blue-700',
    text: 'text-blue-600',
    border: 'border-blue-500',
    ring: 'ring-blue-400',
    bgLight: 'bg-blue-50',
    bgLighter: 'bg-blue-50/40',
    badge: 'bg-blue-100 text-blue-800 border border-blue-200',
    gradient: 'from-blue-600 via-sky-600 to-indigo-600',
    heroGradient: 'from-blue-900 via-indigo-950 to-slate-900',
  },
  hijau: {
    id: 'hijau',
    name: 'Hijau',
    label: 'Hijau (Emerald & Mint)',
    colorHex: '#059669',
    primary: 'bg-emerald-600 text-white',
    primaryHover: 'hover:bg-emerald-700',
    text: 'text-emerald-600',
    border: 'border-emerald-500',
    ring: 'ring-emerald-400',
    bgLight: 'bg-emerald-50',
    bgLighter: 'bg-emerald-50/40',
    badge: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    gradient: 'from-emerald-600 via-teal-600 to-emerald-700',
    heroGradient: 'from-emerald-950 via-teal-950 to-slate-900',
  },
  navy: {
    id: 'navy',
    name: 'Navy',
    label: 'Navy (Midnight & Slate)',
    colorHex: '#0f172a',
    primary: 'bg-slate-900 text-white',
    primaryHover: 'hover:bg-slate-800',
    text: 'text-slate-900',
    border: 'border-slate-800',
    ring: 'ring-slate-500',
    bgLight: 'bg-slate-100',
    bgLighter: 'bg-slate-100/50',
    badge: 'bg-slate-200 text-slate-900 border border-slate-300',
    gradient: 'from-slate-900 via-indigo-950 to-slate-950',
    heroGradient: 'from-slate-950 via-slate-900 to-indigo-950',
  },
  lilac: {
    id: 'lilac',
    name: 'Lilac',
    label: 'Lilac (Lavender & Purple)',
    colorHex: '#9333ea',
    primary: 'bg-purple-600 text-white',
    primaryHover: 'hover:bg-purple-700',
    text: 'text-purple-600',
    border: 'border-purple-500',
    ring: 'ring-purple-400',
    bgLight: 'bg-purple-50',
    bgLighter: 'bg-purple-50/40',
    badge: 'bg-purple-100 text-purple-800 border border-purple-200',
    gradient: 'from-purple-600 via-violet-600 to-fuchsia-600',
    heroGradient: 'from-purple-950 via-indigo-950 to-slate-900',
  },
  pink: {
    id: 'pink',
    name: 'Pink',
    label: 'Pink (Rose & Peach)',
    colorHex: '#e11d48',
    primary: 'bg-rose-500 text-white',
    primaryHover: 'hover:bg-rose-600',
    text: 'text-rose-500',
    border: 'border-rose-400',
    ring: 'ring-rose-400',
    bgLight: 'bg-rose-50',
    bgLighter: 'bg-rose-50/40',
    badge: 'bg-rose-100 text-rose-800 border border-rose-200',
    gradient: 'from-rose-500 via-pink-500 to-rose-600',
    heroGradient: 'from-rose-950 via-slate-900 to-purple-950',
  },
  orange: {
    id: 'orange',
    name: 'Orange',
    label: 'Orange (Amber & Tangerine)',
    colorHex: '#ea580c',
    primary: 'bg-orange-500 text-white',
    primaryHover: 'hover:bg-orange-600',
    text: 'text-orange-500',
    border: 'border-orange-400',
    ring: 'ring-orange-400',
    bgLight: 'bg-orange-50',
    bgLighter: 'bg-orange-50/40',
    badge: 'bg-orange-100 text-orange-800 border border-orange-200',
    gradient: 'from-orange-500 via-amber-500 to-orange-600',
    heroGradient: 'from-orange-950 via-slate-900 to-amber-950',
  }
};
