import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Sparkles, MapPin } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();

  if (!settings.announcementEnabled || !settings.announcementText) return null;

  return (
    <div className="bg-[#07090C]/90 backdrop-blur-md border-b border-white/[0.05] text-xs py-2 px-4 transition-all relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center text-coolgray-300 font-medium tracking-wide">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime"></span>
          </span>
          <span className="text-white font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
            {settings.announcementText}
          </span>
        </div>
        <div className="flex items-center gap-4 text-coolgray-400 text-[11px] hidden sm:flex">
          <Link to="/contact" className="flex items-center gap-1.5 text-coolgray-300 hover:text-white transition-colors">
            <MapPin className="w-3 h-3 text-lime" />
            <span>Kusumagiri Jn, Kakkanad</span>
          </Link>
          <span className="text-white/20">•</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Store Open Today (10:30 AM - 9:30 PM)
          </span>
        </div>
      </div>
    </div>
  );
};
