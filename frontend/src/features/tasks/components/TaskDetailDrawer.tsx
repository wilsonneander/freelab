'use client';

import Drawer from '@/components/ui/Drawer';
import { Task } from '@/types/tasks';
import { Calendar, Paperclip, MessageSquare, Clock, CheckCircle2, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

interface TaskDetailDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
}

const getUserAvatar = (id: string) => `https://i.pravatar.cc/150?u=${id}`;

export default function TaskDetailDrawer({ isOpen, onClose, task }: TaskDetailDrawerProps) {
    if (!task) return null;

    return (
        <Drawer isOpen={isOpen} onClose={onClose} title="Detalhes da Tarefa">
            <div className="flex flex-col gap-8 pb-10">

                {/* Cover Image */}
                {task.coverImage && (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm">
                        <Image
                            src={task.coverImage}
                            alt={task.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Status & PriorityHeader */}
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${task.status === 'done' ? 'bg-green-100 text-green-700' :
                            task.status === 'review' ? 'bg-purple-100 text-purple-700' :
                                task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                    'bg-gray-100 text-gray-600'}
                    `}>
                        {task.status.replace('-', ' ')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                         ${task.priority === 'high' ? 'bg-red-100 text-red-600' :
                            task.priority === 'medium' ? 'bg-orange-100 text-orange-600' :
                                'bg-gray-100 text-gray-600'}
                    `}>
                        {task.priority} Priority
                    </span>
                </div>

                {/* Main Content */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{task.title}</h1>
                    <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                        <p>{task.description}</p>
                    </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Assignees</span>
                        <div className="flex items-center gap-2">
                            {task.collaboratorIds.map((uid) => (
                                <div key={uid} className="flex items-center gap-2 bg-gray-50 rounded-full pr-3 pl-1 py-1 border border-gray-100">
                                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                        <Image src={getUserAvatar(uid)} alt={uid} fill className="object-cover" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">User {uid}</span>
                                </div>
                            ))}
                            <button className="w-8 h-8 rounded-full border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors">
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Due Date</span>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={18} />
                            <span className="text-sm font-medium">Oct 24, 2024</span>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Attachments */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Attachments</span>
                        <button className="text-primary text-xs font-semibold hover:underline">+ Add File</button>
                    </div>
                    {task.attachments.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {task.attachments.map(att => (
                                <div key={att.id} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-500 shadow-sm border border-gray-100">
                                        <Paperclip size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-800">{att.name}</span>
                                        <span className="text-xs text-gray-400 uppercase">{att.type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-400 italic">No attachments</div>
                    )}
                </div>

                <div className="h-px bg-gray-100" />

                {/* Activity Mock */}
                <div className="flex flex-col gap-4">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Activity</span>
                    <div className="flex gap-4">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                            <Image src={getUserAvatar('u-1')} alt="u-1" fill className="object-cover" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-gray-800"><span className="font-semibold">User 1</span> moved this task to <span className="font-semibold text-blue-600">In Progress</span></p>
                            <span className="text-xs text-gray-400">2 hours ago</span>
                        </div>
                    </div>
                </div>

            </div>
        </Drawer>
    );
}
