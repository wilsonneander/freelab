'use client';

import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export function Header() {
    return (
        <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 bg-white/20 border border-white/60 rounded-xl px-4 py-2 w-[280px] text-[var(--text-main)] shadow-sm">
                <Search size={18} className="text-white" />
                <input
                    type="text"
                    placeholder="Search here"
                    className="bg-transparent border-none outline-none text-white placeholder-white w-full"
                />
            </div>
            <button className="flex items-center gap-2 bg-white/20 border border-white/60 rounded-xl px-4 py-2 text-white hover:bg-white/30 transition-colors cursor-pointer shadow-sm">
                <span>Clientes</span>
                <ChevronDown size={16} />
            </button>
            <button className="relative p-2.5 bg-white/20 border border-white/60 rounded-xl text-white hover:bg-white/30 transition-colors cursor-pointer shadow-sm">
                <Bell size={20} />
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF9F43] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">21</span>
            </button>
        </div>
    );
}
