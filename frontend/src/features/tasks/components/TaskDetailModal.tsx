'use client';

import { Modal } from '@/components/ui';
import { Task } from '../types';
import {
    Calendar, Paperclip, MessageSquare, Clock, CheckCircle2,
    MoreHorizontal, Send, Share2, Smile, Image as ImageIcon, FileText
} from 'lucide-react';
import Image from 'next/image';

interface TaskDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
}

const getUserAvatar = (id: string) => `https://i.pravatar.cc/150?u=${id}`;

export function TaskDetailModal({ isOpen, onClose, task }: TaskDetailModalProps) {
    if (!task) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Detalhes da Tarefa" maxWidth="max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-10 min-h-[600px] text-black">
                {/* Left Side: Info (Main content) */}
                <div className="flex-[1.5] flex flex-col gap-8">
                    {/* Header Info */}
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-[8px] bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
                                    {task.area}
                                </span>
                                <div className="h-4 w-px bg-gray-200 mx-1" />
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Clock size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Postado em {new Date(task.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <button
                                className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-black transition-all border border-gray-100 active:scale-95"
                                title="Copiar link da tarefa"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copiado!');
                                }}
                            >
                                <Share2 size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Compartilhar</span>
                            </button>
                        </div>

                        <h1 className="text-4xl font-black text-black leading-[1.1] tracking-tight">
                            {task.title}
                        </h1>
                    </div>

                    {/* Cover Image */}
                    {task.coverImage && (
                        <div className="relative w-full h-80 rounded-[24px] overflow-hidden shadow-sm border border-white/40">
                            <Image
                                src={task.coverImage}
                                alt={task.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Description */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Descrição da Tarefa</h3>
                        <div className="p-6 bg-white border border-gray-100 rounded-[20px] shadow-sm min-h-[160px]">
                            <p className="text-[#4B4B4B] leading-relaxed font-semibold text-sm whitespace-pre-wrap">
                                {task.description}
                            </p>
                        </div>
                    </div>

                    {/* Attachments */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Arquivos e Anexos ({task.attachments.length})</h3>
                            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">+ Upload</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {task.attachments.map(att => (
                                <div key={att.id} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-[18px] hover:bg-gray-50 transition-all cursor-pointer shadow-sm group">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:text-primary transition-colors border border-gray-100 shadow-inner">
                                        <FileText size={20} />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-sm font-black text-black truncate">{att.name}</span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{att.type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {task.attachments.length === 0 && (
                            <div className="p-10 border-2 border-dashed border-gray-100 rounded-[20px] flex flex-col items-center justify-center opacity-30">
                                <Paperclip size={28} className="text-gray-300 mb-2" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nenhum arquivo anexado</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Meta & Chat (Vertical focus) */}
                <div className="flex-1 flex flex-col gap-8 shrink-0">
                    {/* Meta Card */}
                    <div className="bg-white/60 backdrop-blur-sm border border-white rounded-[24px] p-6 shadow-sm flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status & Prioridade</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1.5 p-3 bg-white border border-gray-50 rounded-xl shadow-inner border border-gray-100">
                                    <span className="text-[9px] font-black text-gray-300 uppercase">Prioridade</span>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-400' : task.priority === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                                        <span className="text-sm font-black text-black capitalize">{task.priority}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5 p-3 bg-white border border-gray-50 rounded-xl shadow-inner border border-gray-100">
                                    <span className="text-[9px] font-black text-gray-300 uppercase">Fase Atual</span>
                                    <span className="text-sm font-black text-black capitalize">{task.status.replace('-', ' ')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100/50" />

                        <div className="flex flex-col gap-4">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Responsáveis</h3>
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {task.collaboratorIds.map((uid) => (
                                        <div key={uid} className="relative w-10 h-10 rounded-full border-[3px] border-white overflow-hidden shadow-md" title={`User ${uid}`}>
                                            <Image src={getUserAvatar(uid)} alt={uid} fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <button className="w-10 h-10 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary transition-all active:scale-95">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Chat Section - High Focus */}
                    <div className="flex-1 flex flex-col gap-5 bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm overflow-hidden min-h-[400px]">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Atividade & Chat</h3>
                            <div className="px-2 py-0.5 bg-gray-50 rounded-full text-[9px] font-black text-gray-400 border border-gray-100">
                                12 MENSAGENS
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar pr-1 flex flex-col gap-5">
                            {/* Message Sent (According to user request: transparent, white border, black text) */}
                            <div className="flex gap-3 flex-row-reverse">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm border border-white translate-y-1">
                                    <Image src={getUserAvatar('u-2')} alt="u-2" fill className="object-cover" />
                                </div>
                                <div className="flex flex-col gap-1.5 items-end max-w-[85%]">
                                    <div className="bg-transparent border border-gray-100 text-black p-3.5 rounded-[20px] rounded-tr-none shadow-sm relative group overflow-hidden">
                                        <div className="absolute inset-0 bg-gray-50/10 pointer-events-none" />
                                        <p className="text-xs leading-relaxed font-bold relative z-10">
                                            Perfeito! Vou revisar hoje à tarde assim que terminar o projeto da Acme.
                                        </p>
                                    </div>
                                    <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest mr-2">Visto agora</span>
                                </div>
                            </div>

                            {/* Message Received */}
                            <div className="flex gap-3">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm border border-white translate-y-1">
                                    <Image src={getUserAvatar('u-1')} alt="u-1" fill className="object-cover" />
                                </div>
                                <div className="flex flex-col gap-1.5 max-w-[85%]">
                                    <div className="bg-gray-50 border border-gray-100 text-[#4B4B4B] p-3.5 rounded-[20px] rounded-tl-none shadow-inner">
                                        <p className="text-xs leading-relaxed font-bold">
                                            Vou precisar que você ajuste as cores do Design System para bater com o novo logo da Freelab.
                                        </p>
                                    </div>
                                    <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest ml-2">2 horas atrás</span>
                                </div>
                            </div>
                        </div>

                        {/* Chat Controls & Input */}
                        <div className="flex flex-col gap-3 pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-1">
                                <button className="p-2 text-gray-300 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50" title="Upload Documento">
                                    <ImageIcon size={18} strokeWidth={2.5} />
                                </button>
                                <button className="p-2 text-gray-300 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50" title="Upload Arquivo">
                                    <FileText size={18} strokeWidth={2.5} />
                                </button>
                                <button className="p-2 text-gray-300 hover:text-amber-400 transition-colors rounded-lg hover:bg-amber-50" title="Emoji">
                                    <Smile size={18} strokeWidth={2.5} />
                                </button>
                            </div>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Adicionar comentário..."
                                    className="w-full px-5 py-4 pr-14 bg-white border border-gray-100 rounded-[18px] focus:ring-2 focus:ring-primary/20 transition-all font-semibold text-sm shadow-inner placeholder:text-gray-300"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-primary hover:scale-110 active:scale-95 transition-all">
                                    <Send size={24} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
