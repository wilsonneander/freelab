'use client';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }: ModalProps) {
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm transition-all text-[#2D3436]">
            <div
                className={`flex flex-col w-full ${maxWidth} max-h-[90vh] bg-[#FDFDFD]/80 backdrop-blur-2xl border border-white/60 rounded-[32px] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
            >
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100/50 shrink-0">
                    <h3 className="text-xl font-semibold text-gray-800 tracking-tight">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
}
