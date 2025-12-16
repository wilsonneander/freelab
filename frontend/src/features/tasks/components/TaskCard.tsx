'use client';

import { Task } from '@/types/tasks';
import { Draggable } from '@hello-pangea/dnd';
import { Paperclip, MessageSquare, MoreHorizontal, Calendar } from 'lucide-react';
import Image from 'next/image';

interface TaskCardProps {
    task: Task;
    index: number;
    onClick: (task: Task) => void;
}

// Mock user data for avatars (In a real app, this would come from a store or context)
const getUserAvatar = (id: string) => {
    // Generate a consistent random-ish avatar based on ID
    const num = parseInt(id.replace(/\D/g, '')) || 1;
    return `https://i.pravatar.cc/150?u=${id}`;
};

export default function TaskCard({ task, index, onClick }: TaskCardProps) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onClick(task)}
                    className={`
                        group relative w-full p-5 mb-4 rounded-[24px]
                        bg-white/60 backdrop-blur-md border border-white/60
                        shadow-[0_4px_20px_rgba(0,0,0,0.02)]
                        transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                        hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1
                        active:scale-[0.98]
                        ${snapshot.isDragging ? 'z-50 !shadow-[0_20px_50px_rgba(0,0,0,0.15)] !scale-105 rotate-1 !bg-white/80' : ''}
                        ${task.status === 'done' ? 'opacity-80' : ''}
                    `}
                    style={{
                        ...provided.draggableProps.style,
                    }}
                >
                    {/* Cover Image */}
                    {task.coverImage && (
                        <div className="relative w-full h-32 mb-4 rounded-xl overflow-hidden group-hover:brightness-105 transition-all">
                            <Image
                                src={task.coverImage}
                                alt={task.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Header: Priority & Menu */}
                    <div className="flex justify-between items-start mb-2">
                        <div className={`
                            px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider
                            ${task.priority === 'high' ? 'bg-red-100/80 text-red-600' :
                                task.priority === 'medium' ? 'bg-orange-100/80 text-orange-600' :
                                    'bg-green-100/80 text-green-600'}
                        `}>
                            {task.priority}
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-gray-800 font-semibold mb-1 text-[15px] leading-snug">
                        {task.title}
                    </h3>
                    <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-4 font-normal">
                        {task.description}
                    </p>

                    {/* Footer: Metadata & Avatars */}
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100/50">
                        <div className="flex -space-x-2">
                            {task.collaboratorIds.map((uid) => (
                                <div key={uid} className="relative w-6 h-6 rounded-full border-2 border-white overflow-hidden shadow-sm" title={`User ${uid}`}>
                                    <Image
                                        src={getUserAvatar(uid)}
                                        alt={uid}
                                        fill
                                        sizes="24px"
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                            <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] text-gray-400 shadow-sm hover:bg-gray-200 transition-colors cursor-pointer">
                                +
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-400">
                            {task.attachments.length > 0 && (
                                <div className="flex items-center gap-1 text-xs hover:text-gray-600 transition-colors">
                                    <Paperclip size={12} />
                                    <span>{task.attachments.length}</span>
                                </div>
                            )}
                            {(task.commentsCount > 0) && (
                                <div className="flex items-center gap-1 text-xs hover:text-gray-600 transition-colors">
                                    <MessageSquare size={12} />
                                    <span>{task.commentsCount}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
