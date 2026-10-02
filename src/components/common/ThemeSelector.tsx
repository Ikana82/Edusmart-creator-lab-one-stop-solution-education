import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { THEME_CONFIGS, ColorTheme } from '../../types/theme';
import { Palette, Check } from 'lucide-react';

interface ThemeSelectorProps {
  compact?: boolean;
  showLabel?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  compact = false,
  showLabel = true,
}) => {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
    <div className="flex items-center gap-1.5 p-1 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-2xs">
      {showLabel && (
        <div className="flex items-center gap-1.5 px-2 text-[11px] font-bold text-slate-500 hidden sm:flex">
          <Palette className="w-3.5 h-3.5 text-slate-400" />
          <span>Tema:</span>
        </div>
      )}

      <div className="flex items-center gap-1">
        {availableThemes.map((tKey) => {
          const cfg = THEME_CONFIGS[tKey];
          const isActive = currentTheme === tKey;
          return (
            <button
              key={tKey}
              onClick={() => setTheme(tKey)}
              title={`Ubah ke Tema ${cfg.name}`}
              className={`relative flex items-center justify-center rounded-xl transition-all duration-200 ${
                compact ? 'w-6 h-6' : 'px-2.5 py-1 text-xs'
              } ${
                isActive
                  ? `${cfg.primary} font-bold shadow-xs scale-105 ring-2 ring-offset-1 ring-slate-400`
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {/* Color swatch dot */}
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  isActive ? 'bg-white shadow-2xs' : ''
                }`}
                style={{ backgroundColor: isActive ? '#ffffff' : cfg.colorHex }}
              />

              {!compact && (
                <span className="ml-1.5 text-[11px] capitalize hidden md:inline">
                  {cfg.name}
                </span>
              )}

              {isActive && compact && (
                <Check className="w-3 h-3 text-white absolute" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
