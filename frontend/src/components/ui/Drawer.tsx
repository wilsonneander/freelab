'use client';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string; // Optional header title
    children: React.ReactNode;
    width?: string;
}

export function Drawer({ isOpen, onClose, title, children, width = 'w-[500px]' }: DrawerProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
        }
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`
                    fixed inset-0 z-[100] bg-black/10 backdrop-blur-sm transition-opacity duration-300
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`
                    fixed top-2 bottom-2 right-2 z-[101] flex flex-col
                    ${width} bg-white/80 backdrop-blur-2xl border border-white/60 
                    rounded-[32px] shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                    ${isOpen ? 'translate-x-0' : 'translate-x-[110%]'}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100/50 shrink-0">
                    <h3 className="text-xl font-semibold text-gray-800 tracking-tight">{title || 'Details'}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {children}
                </div>
            </div>
        </>
    );
}
