'use client';

import { Droppable } from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';
import { TaskColumnData, Task } from '../types';
import { Plus } from 'lucide-react';

interface TaskColumnProps {
    column: TaskColumnData;
    onTaskClick: (task: Task) => void;
}

export function TaskColumn({ column, onTaskClick }: TaskColumnProps) {
    const getStatusColor = (statusId: string) => {
        switch (statusId) {
            case 'todo': return '#FF4785'; // Rosa
            case 'in-progress': return '#FF9F1C'; // Amarelo/Laranja claro
            case 'review': return '#F15BB5'; // Laranja/Rosa choque
            case 'done': return '#00C49A'; // Verde
            default: return '#cbd5e1';
        }
    };

    const getStatusBG = (statusId: string) => {
        switch (statusId) {
            case 'todo': return 'bg-[#FF4785]';
            case 'in-progress': return 'bg-[#FF9F1C]';
            case 'review': return 'bg-[#F15BB5]';
            case 'done': return 'bg-[#00C49A]';
            default: return 'bg-gray-400';
        }
    };

    return (
        <div className="flex flex-col min-w-[340px] w-[340px] h-full shrink-0">
            {/* Header - Status Pill */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-2 px-4 py-2 border border-white rounded-full bg-white/10 backdrop-blur-sm shadow-sm transition-all hover:bg-white/20">
                    <span className={`w-2.5 h-2.5 rounded-full ${getStatusBG(column.id)} ring-4 ring-white/20`} />
                    <h2 className="text-black font-black text-sm tracking-tight capitalize">{column.title}</h2>
                    <span className="ml-1 text-[#4B4B4B] text-xs font-bold bg-white/40 px-2 py-0.5 rounded-full border border-white/40">
                        {column.tasks.length}
                    </span>
                </div>
                <button className="btn-plus">
                    <Plus size={20} />
                </button>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`
                            flex-1 rounded-2xl transition-all duration-300
                            ${snapshot.isDraggingOver ? 'bg-primary/5 ring-1 ring-primary/20 p-2' : ''}
                            overflow-y-auto no-scrollbar scroll-smooth
                       `}
                    >
                        <div className="flex flex-col pb-24">
                            {column.tasks.map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    index={index}
                                    onClick={onTaskClick}
                                />
                            ))}
                            {provided.placeholder}

                            {/* Empty State placeholder if needed, or just invisible spacer */}
                            {column.tasks.length === 0 && !snapshot.isDraggingOver && (
                                <div className="flex flex-col items-center justify-center py-10 opacity-40 border-2 border-dashed border-gray-300/50 rounded-2xl m-2">
                                    <p className="text-sm font-medium text-gray-400">Sem tarefas</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Droppable>
        </div>
    );
}
