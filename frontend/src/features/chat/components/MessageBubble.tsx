'use client';

import { Attachment, Message, User } from '@/features/chat/types';
import Image from 'next/image';
import { Paperclip, Download, Smile, Play } from 'lucide-react';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
    sender?: User;
    showSenderName?: boolean;
}

export default function MessageBubble({ message, isOwn, sender, showSenderName }: MessageBubbleProps) {
    return (
        <div className={`flex w-full ${isOwn ? 'justify-end' : 'justify-start'} mb-4 group`}>
            <div className={`flex max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>

                {/* Avatar (only for received) */}
                {!isOwn && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white shrink-0 shadow-sm mb-1">
                        <Image src={sender?.avatar || ''} alt="" fill className="object-cover" />
                    </div>
                )}

                {/* Bubble */}
                <div className="flex flex-col gap-1">
                    {showSenderName && !isOwn && (
                        <span className="text-xs text-gray-500 ml-1 mb-0.5">{sender?.name}</span>
                    )}

                    <div
                        className={`
                            relative px-5 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                            ${isOwn
                                ? 'bg-white/40 backdrop-blur-md text-gray-800 rounded-[20px] rounded-br-[4px] border border-white/60'
                                : 'bg-white text-gray-800 rounded-[20px] rounded-bl-[4px] border border-gray-100'}
                        `}
                    >
                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                            <div className="flex flex-col gap-2 mb-2">
                                {message.attachments.map(att => (
                                    <div key={att.id} className="rounded-xl overflow-hidden">
                                        {att.type === 'image' ? (
                                            <div className="relative w-full h-40 rounded-xl overflow-hidden mb-1">
                                                <Image src={att.url} alt={att.name} fill className="object-cover" />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100/50">
                                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-500 shadow-sm">
                                                    <Paperclip size={16} />
                                                </div>
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <span className="text-sm font-medium truncate">{att.name}</span>
                                                    <span className="text-[10px] text-gray-400 uppercase">{att.type}</span>
                                                </div>
                                                <button className="p-1.5 hover:bg-black/5 rounded-full transition-colors">
                                                    <Download size={14} className="text-gray-500" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>

                        {/* Timestamp & Checks */}
                        <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end text-gray-500' : 'justify-start text-gray-400'}`}>
                            <span className="text-[10px] font-medium">
                                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>

                    {/* Reactions Bar (Mock) */}
                    {message.reactions && message.reactions.length > 0 && (
                        <div className={`flex gap-1 ${isOwn ? 'justify-end' : 'justify-start'} px-2`}>
                            {message.reactions.map((r, i) => (
                                <span key={i} className="flex items-center gap-1 bg-white/60 border border-white px-1.5 py-0.5 rounded-full text-[10px] shadow-sm cursor-pointer hover:scale-105 transition-transform">
                                    {r.emoji} <span className="text-gray-600 font-semibold">{r.count}</span>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
