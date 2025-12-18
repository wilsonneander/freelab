'use client';

import { Conversation, User } from '../types';
import Image from 'next/image';
import { X, Image as ImageIcon, FileText, Link as LinkIcon, MoreHorizontal } from 'lucide-react';

interface ChatInfoSidebarProps {
    conversation: Conversation;
    currentUser: User;
    onClose: () => void;
}

export function ChatInfoSidebar({ conversation, currentUser, onClose }: ChatInfoSidebarProps) {
    const isGroup = conversation.type === 'group';
    const otherUser = !isGroup ? conversation.participants.find(p => p.id !== currentUser.id) : null;

    const name = isGroup ? conversation.name : otherUser?.name;
    const image = isGroup ? conversation.image : otherUser?.avatar;
    const subtitle = isGroup ? `${conversation.participants.length} members` : otherUser?.role || 'User';

    return (
        <div className="flex flex-col w-[300px] h-full bg-white/40 backdrop-blur-xl border-l border-white/60 shrink-0">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/40">
                <span className="font-semibold text-gray-700">Details</span>
                <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-5">

                {/* Profile Block */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg mb-3 overflow-hidden">
                        <Image src={image || ''} alt={name || ''} fill className="object-cover" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                    <p className="text-sm text-gray-500 font-medium">{subtitle}</p>

                    <div className="flex gap-3 mt-5 w-full justify-center">
                        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                                <LinkIcon size={18} />
                            </div>
                            <span className="text-[10px] font-medium">Links</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                                <ImageIcon size={18} />
                            </div>
                            <span className="text-[10px] font-medium">Media</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                                <FileText size={18} />
                            </div>
                            <span className="text-[10px] font-medium">Files</span>
                        </button>
                    </div>
                </div>

                {/* Shared Projects */}
                {conversation.sharedProjects && conversation.sharedProjects.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Shared Projects</h3>
                        <div className="flex flex-col gap-2">
                            {conversation.sharedProjects.map((proj, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 bg-white/60 rounded-xl border border-white/60">
                                    <div className="w-2 h-8 bg-primary rounded-full"></div>
                                    <span className="text-sm font-semibold text-gray-700">{proj}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Shared Media Mock */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Latests Media</h3>
                        <button className="text-[10px] text-primary font-bold hover:underline">View All</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-white">
                                <Image src={`https://picsum.photos/200?random=${i}`} alt="Media" fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
