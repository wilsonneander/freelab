"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutGrid,
    Folder,
    MessageCircle,
    CheckSquare,
    Wallet,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';

const NAV_ITEMS: NavItem[] = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/' },
    { icon: Folder, label: 'Projetos', path: '/projects' },
    { icon: MessageCircle, label: 'Chat', path: '/chat' },
    { icon: CheckSquare, label: 'Tarefas', path: '/tasks' },
    { icon: Wallet, label: 'Financeiro', path: '/finance' },
];

const MOCK_COLLABORATORS = [
    { name: 'Erik Gunsel', avatar: 'https://ui-avatars.com/api/?name=Erik+Gunsel&background=random' },
    { name: 'Emily Smith', avatar: 'https://ui-avatars.com/api/?name=Emily+Smith&background=random' },
    { name: 'Arthur Adelk', avatar: 'https://ui-avatars.com/api/?name=Arthur+Adelk&background=random' },
];

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "relative flex flex-col gap-6 py-6 transition-all duration-300 ease-in-out shrink-0 m-6 rounded-[32px] border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.05)] bg-[#FFF5F0]/55 backdrop-blur-[20px]",
                "h-[calc(100vh-48px)]",
                isCollapsed ? "w-[88px] items-center px-2" : "w-[280px] px-5"
            )}
        >
            <ToggleButton isCollapsed={isCollapsed} toggle={() => setIsCollapsed(!isCollapsed)} />
            <CompanySwitcher isCollapsed={isCollapsed} />

            <div className="flex-1 flex flex-col justify-between gap-8 overflow-y-auto overflow-x-hidden w-full no-scrollbar">
                <NavigationSection isCollapsed={isCollapsed} pathname={pathname} />
                <MessagesSection isCollapsed={isCollapsed} collaborators={MOCK_COLLABORATORS} />
            </div>

            <UserProfile isCollapsed={isCollapsed} />
        </aside>
    );
}

// Sub-components for cleaner file (Atomic Design within organism)

function ToggleButton({ isCollapsed, toggle }: { isCollapsed: boolean; toggle: () => void }) {
    return (
        <button
            onClick={toggle}
            className="absolute top-100 -right-3 w-6 h-6 bg-white border border-black/10 rounded-full flex items-center justify-center cursor-pointer z-10 text-orange-500 hover:scale-110 hover:text-orange-500 transition-all shadow-sm"
        >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
    );
}

function CompanySwitcher({ isCollapsed }: { isCollapsed: boolean }) {
    return (
        <div className={cn(
            "flex items-center gap-3 p-3 rounded-[20px] cursor-pointer transition-colors hover:bg-white/40 bg-white/20 active:bg-white/60 border border-white/30 p-3",
            isCollapsed && "justify-center p-0 hover:bg-transparent"
        )}>
            <div className="w-8 h-8 flex items-center justify-center bg-[#000] text-white rounded-lg font-bold text-xs shrink-0">
                AV
            </div>
            {!isCollapsed && (
                <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap animate-in fade-in slide-in-from-left-1 duration-300 ">
                    <span className="font-semibold text-sm text-[#000]">Avoice Company</span>
                    <ChevronDown size={16} className="text-gray-800" />
                </div>
            )}
        </div>
    );
}

function NavigationSection({ isCollapsed, pathname }: { isCollapsed: boolean; pathname: string }) {
    return (
        <div className="flex flex-col gap-2">
            {!isCollapsed && <p className="text-[12px] font-medium text-[#242220] uppercase tracking-wider pl-4 mb-2 opacity-50 whitespace-nowrap animate-in fade-in slide-in-from-left-1 duration-300">HOME</p>}
            <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                "group relative flex items-center gap-3.5 h-[52px] px-4 rounded-2xl text-[#242220] transition-all duration-200",
                                isActive ? "bg-white font-medium shadow-[0_4px_12px_rgba(0,0,0,0.05)]" : "hover:bg-white/40 hover:text-[#2D3436]",
                                isCollapsed && "justify-center px-0"
                            )}
                        >
                            <div className="flex items-center justify-center w-6">
                                <item.icon size={24} strokeWidth={1.5} />
                            </div>

                            {!isCollapsed && (
                                <span className="text-base font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-1 duration-300">
                                    {item.label}
                                </span>
                            )}

                            {isCollapsed && <Tooltip label={item.label} />}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

function MessagesSection({ isCollapsed, collaborators }: { isCollapsed: boolean; collaborators: any[] }) {
    return (
        <div className="flex flex-col gap-2">
            {!isCollapsed && (
                <div className="flex justify-between items-center pr-2 animate-in fade-in slide-in-from-left-1 duration-300">
                    <p className="text-[12px] font-medium text-[#242220] uppercase tracking-wider pl-4 opacity-50 whitespace-nowrap">MESSAGES</p>
                    <button className="p-1 rounded hover:bg-black/5 text-gray-600 hover:text-orange-500 transition-colors">
                        <Plus size={16} />
                    </button>
                </div>
            )}

            <div className={cn("flex flex-col gap-3", isCollapsed ? "items-center pl-0" : "pl-2")}>
                {collaborators.map((user, idx) => (
                    <div key={idx} className="group relative flex items-center gap-3 cursor-pointer">
                        <div className="relative shrink-0">
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                            <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#00B894] border border-white rounded-full"></span>
                        </div>
                        {!isCollapsed && <span className="text-sm text-[#2D3436] whitespace-nowrap animate-in fade-in slide-in-from-left-1 duration-300">{user.name}</span>}
                        {isCollapsed && <Tooltip label={user.name} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

function UserProfile({ isCollapsed }: { isCollapsed: boolean }) {
    return (
        <div className="mt-auto flex items-center gap-3 p-3 bg-white/30 rounded-3xl cursor-pointer hover:bg-white/50 transition-all relative group border border-white/30 p-1">
            <img
                src="https://ui-avatars.com/api/?name=Wendell+Neander&background=000"
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-white shrink-0"
            />
            {!isCollapsed && (
                <div className="flex flex-col animate-in fade-in slide-in-from-left-1 duration-300">
                    <small className="text-[13px] text-gray-500">Desenvolvedor Backend</small>
                    <span className="text-base font-semibold text-[#2D3436]">Wendell Neander</span>
                </div>
            )}
            {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-white px-3 py-2 rounded-xl shadow-xl whitespace-nowrap text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
                    <div className="flex flex-col">
                        <span className="font-bold">Wendell Neander</span>
                        <span className="text-xs font-normal text-gray-500">Dev Backend</span>
                    </div>
                </div>
            )}
        </div>
    );
}

function Tooltip({ label }: { label: string }) {
    return (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-white px-3 py-2 rounded-xl shadow-xl whitespace-nowrap text-sm font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none">
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
            {label}
        </div>
    );
}
