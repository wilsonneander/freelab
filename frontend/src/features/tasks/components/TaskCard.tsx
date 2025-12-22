'use client';

import { Task } from '../types';
import { Draggable } from '@hello-pangea/dnd';
import { Paperclip, MessageSquare, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

interface TaskCardProps {
    task: Task;
    index: number;
    onClick: (task: Task) => void;
}

// Mock user data for avatars (In a real app, this would come from a store or context)
const getUserAvatar = (id: string) => {
    return `https://i.pravatar.cc/150?u=${id}`;
};

export function TaskCard({ task, index, onClick }: TaskCardProps) {
    const getAreaStyles = (area: string) => {
        const areas: Record<string, { bg: string, text: string }> = {
            'UX Design': { bg: 'bg-blue-100/80', text: 'text-blue-700' },
            'Desenvolvimento': { bg: 'bg-purple-100/80', text: 'text-purple-700' },
            'Social Media': { bg: 'bg-pink-100/80', text: 'text-pink-700' },
            'Dados': { bg: 'bg-teal-100/80', text: 'text-teal-700' },
            'Atendimento': { bg: 'bg-orange-100/80', text: 'text-orange-700' },
            'Marketing': { bg: 'bg-yellow-100/80', text: 'text-yellow-700' },
            'Business Intelligence': { bg: 'bg-indigo-100/80', text: 'text-indigo-700' },
            'Outros': { bg: 'bg-gray-100/80', text: 'text-gray-700' },
        };
        return areas[area] || areas['Outros'];
    };

    const areaStyle = getAreaStyles(task.area);

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onClick(task)}
                    className={`
                        group relative w-full p-4 mb-4 rounded-[16px]
                        bg-white border border-transparent
                        shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                        hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5
                        cursor-pointer
                        ${snapshot.isDragging ? 'z-50 !shadow-[0_20px_40px_rgba(0,0,0,0.12)] !bg-white' : 'transition-all duration-200'}
                    `}
                    style={{
                        ...provided.draggableProps.style,
                    }}
                >
                    {/* Cover Image */}
                    {task.coverImage && (
                        <div className="relative w-full h-36 mb-4 rounded-xl overflow-hidden shadow-sm">
                            <Image
                                src={task.coverImage}
                                alt={task.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    )}

                    {/* Category / Area Badge */}
                    <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-[8px] text-[11px] font-bold tracking-tight uppercase ${areaStyle.bg} ${areaStyle.text}`}>
                            {task.area}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-400' : task.priority === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-black font-black mb-2 text-[15px] leading-tight group-hover:text-primary transition-colors">
                        {task.title}
                    </h3>

                    {/* Description (slightly muted) */}
                    <p className="text-[#4B4B4B] text-xs line-clamp-2 leading-relaxed mb-4 font-semibold">
                        {task.description}
                    </p>

                    {/* Footer: Metadata & Avatars */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-gray-400">
                                <MessageSquare size={14} className="group-hover:text-gray-600 transition-colors" />
                                <span className="text-[11px] font-bold">{task.commentsCount}</span>
                            </div>
                            {task.attachments.length > 0 && (
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <Paperclip size={14} className="group-hover:text-gray-600 transition-colors" />
                                    <span className="text-[11px] font-bold">{task.attachments.length}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex -space-x-2">
                            {task.collaboratorIds.slice(0, 2).map((uid) => (
                                <div key={uid} className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-sm" title={`User ${uid}`}>
                                    <Image
                                        src={getUserAvatar(uid)}
                                        alt={uid}
                                        fill
                                        sizes="28px"
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                            {task.collaboratorIds.length > 2 && (
                                <div className="w-7 h-7 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[10px] text-gray-400 font-bold">
                                    +{task.collaboratorIds.length - 2}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
