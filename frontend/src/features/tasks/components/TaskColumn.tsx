'use client';

import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { TaskColumn as ITaskColumn, Task } from '@/types/tasks';
import { Plus } from 'lucide-react';

interface TaskColumnProps {
    column: ITaskColumn;
    onTaskClick: (task: Task) => void;
}

export default function TaskColumn({ column, onTaskClick }: TaskColumnProps) {
    return (
        <div className="flex flex-col min-w-[320px] w-[320px] h-full shrink-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pl-1 pr-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-[#2D3436] font-semibold text-[17px] tracking-tight">{column.title}</h2>
                    <span className="bg-white/40 text-gray-500 text-xs px-2.5 py-1 rounded-full font-medium border border-white/40 shadow-sm backdrop-blur-sm">
                        {column.tasks.length}
                    </span>
                </div>
                <button className="text-gray-400 hover:text-primary transition-colors p-1 rounded-md hover:bg-orange-50">
                    <Plus size={18} />
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
