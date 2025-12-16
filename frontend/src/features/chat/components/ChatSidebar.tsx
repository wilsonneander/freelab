'use client';

import { Search, Edit, Plus } from 'lucide-react';
import { Conversation, User } from '@/features/chat/types';
import Image from 'next/image';

interface ChatSidebarProps {
    conversations: Conversation[];
    currentUser: User;
    onSelectConversation: (id: string) => void;
    activeConversationId?: string;
}

const getConversationName = (conv: Conversation, currentUserId: string) => {
    if (conv.type === 'group') return conv.name;
    const otherUser = conv.participants.find(p => p.id !== currentUserId);
    return otherUser?.name || 'Unknown User';
};

const getConversationImage = (conv: Conversation, currentUserId: string) => {
    if (conv.type === 'group') return conv.image;
    const otherUser = conv.participants.find(p => p.id !== currentUserId);
    return otherUser?.avatar;
};

const getStatusColor = (status?: string) => {
    switch (status) {
        case 'online': return 'bg-green-500';
        case 'busy': return 'bg-red-500';
        case 'meeting': return 'bg-red-500'; // Or generic red
        case 'offline': return 'bg-gray-400';
        default: return 'bg-gray-400';
    }
};

export default function ChatSidebar({ conversations, currentUser, onSelectConversation, activeConversationId }: ChatSidebarProps) {
    return (
        <div className="flex flex-col w-full md:w-[320px] h-full bg-[#FFF5F0]/40 backdrop-blur-xl border-r border-white/60 shrink-0">
            {/* Header */}
            <div className="flex flex-col gap-4 p-5 shrink-0">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Messages</h2>
                    <button className="p-2 bg-white/60 hover:bg-white rounded-xl shadow-sm hover:text-primary transition-all">
                        <Edit size={20} />
                    </button>
                </div>

                <div className="relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full pl-10 pr-4 py-3 bg-white/60 rounded-xl border border-white/60 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm placeholder-gray-400 transition-all font-medium"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-3">
                <div className="flex flex-col gap-1 pb-4">
                    {conversations.map(conv => {
                        const name = getConversationName(conv, currentUser.id);
                        const image = getConversationImage(conv, currentUser.id);
                        const isActive = conv.id === activeConversationId;
                        const otherUser = conv.type === 'individual' ? conv.participants.find(p => p.id !== currentUser.id) : null;

                        return (
                            <div
                                key={conv.id}
                                onClick={() => onSelectConversation(conv.id)}
                                className={`
                                    flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200
                                    ${isActive
                                        ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] scale-[1.02]'
                                        : 'hover:bg-white/40 hover:scale-[1.01]'}
                                `}
                            >
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                        <Image src={image || ''} alt={name || ''} fill className="object-cover" />
                                    </div>
                                    {/* Status Indicator (Only for individual mostly, or logic for group) */}
                                    {conversations.length > 0 && conv.type === 'individual' && otherUser && (
                                        <span className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(otherUser.status)} border-2 border-white rounded-full`}></span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`text-[15px] font-semibold truncate ${isActive ? 'text-primary' : 'text-gray-800'}`}>
                                            {name}
                                        </h3>
                                        <span className="text-[11px] text-gray-400 font-medium">
                                            {new Date(conv.lastMessage?.timestamp || conv.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[13px] text-gray-500 truncate pr-2 font-medium">
                                            {conv.lastMessage?.senderId === currentUser.id ? 'You: ' : ''}
                                            {conv.lastMessage?.content || 'Started a conversation'}
                                        </p>
                                        {conv.unreadCount > 0 && (
                                            <div className="flex items-center justify-center w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full shadow-sm">
                                                {conv.unreadCount}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
