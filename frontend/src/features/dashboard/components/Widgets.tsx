import { Pause } from 'lucide-react';

export function TimerWidget() {
    return (
        <div className="bg-gradient-to-br from-[#FFB66D] to-[#FFA045] rounded-3xl p-6 text-white text-center mt-auto">
            <h3 className="text-sm opacity-90 mb-2">Timer</h3>
            <h1 className="text-4xl font-bold mb-4 tracking-wider">01:24:08</h1>
            <div className="flex justify-center gap-4">
                <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                    <Pause size={20} fill="black" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#581C0C] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                </button>
            </div>
        </div>
    );
}

export function MeetingCard() {
    return (
        <div className="flex flex-col mb-6">
            <h3 className="text-sm font-medium text-[#2D3436] mb-4">Reuniões</h3>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h4 className="font-semibold text-sm mb-1">Reunião com Mirum Agency 📹🟢</h4>
                <small className="text-xs text-gray-500 block mb-3">Horário: 09:30 pm - 10:30 am</small>
                <button className="w-full bg-[#FF9F43] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#FF8C1A] transition-colors cursor-pointer">
                    📷 Entrar na Reunião
                </button>
            </div>
        </div>
    );
}
