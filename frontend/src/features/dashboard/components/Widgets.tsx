import { Pause, Square, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TimerWidget() {
    return (
        <div className="card-base h-full !bg-gradient-to-br !from-[#FFB66D] !to-[#FFA045] !p-6 items-center justify-center text-white !shadow-[0_10px_20px_rgba(255,159,67,0.3)] border border-white">
            <h3 className="text-sm opacity-90 mb-1 font-medium">Timer</h3>
            <h1 className="text-4xl font-medium mb-5 tracking-tight">01:24:08</h1>
            <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-black/10">
                    <Pause size={18} fill="black" className="ml-0.5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#581C0C] text-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-[#581C0C]/40">
                    <Square size={14} fill="white" />
                </button>
            </div>
            <div className="flex gap-1.5 mt-6 opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
            </div>
        </div>
    );
}

export function MeetingCard() {
    return (
        <div className="card-base h-full bg-[#F5F5F5]/70 border border-white p-4">
            <div className="mb-auto">
                <h3 className="text-sm font-bold text-[#2D3436] mb-4">Reuniões</h3>

                <h4 className="font-bold text-lg leading-tight text-[#2D3436] mb-1">
                    Reunião com Mirum Agency
                    <span className="inline-flex align-middle ml-2 gap-1 opacity-80">
                        {/* Icons mock */}
                        <div className="w-5 h-5 bg-[#6C5CE7] rounded-full flex items-center justify-center text-white text-[10px]">T</div>
                        <div className="w-5 h-5 bg-[#00B894] rounded-full flex items-center justify-center text-white text-[10px]">W</div>
                    </span>
                </h4>
                <p className="text-xs text-gray-500 font-medium">Horário: 09:30 pm - 10:30 am</p>
            </div>

            <button className="w-full bg-[#E58E26] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#D35400] transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 mt-4">
                <Video size={16} fill="white" />
                Entrar na Reunião
            </button>
        </div>
    );
}
