'use client';

import { Paperclip, Mic, Send, Smile } from 'lucide-react';

export default function ChatInput() {
    return (
        <div className="p-4 bg-white/40 backdrop-blur-md border-t border-white/60 shrink-0">
            <div className="relative flex items-end gap-2 bg-white/70 border border-white/80 p-2 rounded-[24px] shadow-sm">
                {/* Actions Left */}
                <div className="flex gap-1 pb-1 pl-1">
                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
                        <Paperclip size={20} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
                        <Smile size={20} />
                    </button>
                </div>

                {/* Text Area */}
                <textarea
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 py-3 px-2 max-h-[120px] resize-none overflow-y-auto min-h-[48px] custom-scrollbar text-[15px]"
                    rows={1}
                    style={{ height: 'auto' }}
                />

                {/* Actions Right */}
                <div className="flex gap-1 pb-1 pr-1">
                    {/* If text empty show Mic, else Send */}
                    <button className="p-2 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all">
                        <Send size={18} className="translate-x-0.5 translate-y-0.5" />
                    </button>
                    {/* <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                        <Mic size={20} />
                    </button> */}
                </div>
            </div>
            <div className="text-center mt-2">
                <p className="text-[10px] text-gray-400">Press <span className="font-semibold">Enter</span> to send, <span className="font-semibold">Shift + Enter</span> for new line</p>
            </div>
        </div>
    );
}
