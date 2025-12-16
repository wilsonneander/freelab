'use client';

import React, { useState } from 'react';
import ChatSidebar from '@/features/chat/components/ChatSidebar';
import ChatInput from '@/features/chat/components/ChatInput';
import MessageBubble from '@/features/chat/components/MessageBubble';
import ChatInfoSidebar from '@/features/chat/components/ChatInfoSidebar';
import { MOCK_CONVERSATIONS, MOCK_MESSAGES, MOCK_USERS } from '@/features/chat/data/mockData';
import { Phone, Video, Info, MoreVertical } from 'lucide-react';
import Image from 'next/image';

export default function ChatPage() {
    // State
    const [currentUser] = useState(MOCK_USERS[0]); // Logged in as Wendell
    const [selectedConversationId, setSelectedConversationId] = useState<string>(MOCK_CONVERSATIONS[0].id);
    const [isInfoOpen, setIsInfoOpen] = useState(true);

    // Derived
    const selectedConversation = MOCK_CONVERSATIONS.find(c => c.id === selectedConversationId);
    const messages = MOCK_MESSAGES.filter(m => m.conversationId === selectedConversationId);

    // Helpers for Header
    const getHeaderInfo = () => {
        if (!selectedConversation) return { name: '', image: '', status: '' };
        if (selectedConversation.type === 'group') {
            return {
                name: selectedConversation.name,
                image: selectedConversation.image,
                status: `${selectedConversation.participants.length} participants`
            };
        }
        const other = selectedConversation.participants.find(p => p.id !== currentUser.id);
        return {
            name: other?.name,
            image: other?.avatar,
            status: other?.status === 'online' ? 'Online' : 'Offline'
        };
    };

    const headerInfo = getHeaderInfo();

    return (
        <div className="flex h-[calc(100%-20px)] mt-[60px] w-full overflow-hidden rounded-[32px] bg-white/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/40 glass-container">

            {/* Left Sidebar */}
            <div className={`${selectedConversationId ? 'hidden md:flex' : 'flex'} md:flex shrink-0 h-full`}>
                <ChatSidebar
                    conversations={MOCK_CONVERSATIONS}
                    currentUser={currentUser}
                    activeConversationId={selectedConversationId}
                    onSelectConversation={setSelectedConversationId}
                />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#FFF5F0]/55 backdrop-blur-3xl relative">

                {/* Chat Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/60 bg-white/40 backdrop-blur-md shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white shadow-sm">
                            <Image src={headerInfo.image || ''} alt={headerInfo.name || ''} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-base font-bold text-gray-800 leading-tight">{headerInfo.name}</h2>
                            <div className="flex items-center gap-1.5">
                                {headerInfo.status === 'Online' && <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
                                <span className="text-xs text-gray-500 font-medium">{headerInfo.status}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <button className="p-2 text-gray-400 hover:text-primary hover:bg-white/60 rounded-xl transition-colors">
                            <Phone size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-primary hover:bg-white/60 rounded-xl transition-colors">
                            <Video size={20} />
                        </button>
                        <div className="w-px h-6 bg-gray-300/40 mx-1"></div>
                        <button
                            onClick={() => setIsInfoOpen(!isInfoOpen)}
                            className={`p-2 rounded-xl transition-colors ${isInfoOpen ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-primary hover:bg-white/60'}`}
                        >
                            <Info size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar flex flex-col">
                    {/* Date Divider Mock */}
                    <div className="flex justify-center mb-6">
                        <span className="bg-white/50 text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full border border-white/60 uppercase tracking-widest">
                            Today
                        </span>
                    </div>

                    {messages.map((msg, i) => {
                        const isOwn = msg.senderId === currentUser.id;
                        const sender = MOCK_USERS.find(u => u.id === msg.senderId);
                        return (
                            <MessageBubble
                                key={msg.id}
                                message={msg}
                                isOwn={isOwn}
                                sender={sender}
                                showSenderName={selectedConversation?.type === 'group'}
                            />
                        );
                    })}
                </div>

                {/* Input Area */}
                <ChatInput />
            </div>

            {/* Right Info Sidebar */}
            {isInfoOpen && selectedConversation && (
                <ChatInfoSidebar
                    conversation={selectedConversation}
                    currentUser={currentUser}
                    onClose={() => setIsInfoOpen(false)}
                />
            )}
        </div>
    );
}
