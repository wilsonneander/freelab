'use client';

import React, { useState, useEffect } from 'react';
import { Filter, Plus, ChevronRight, Search, ListFilter } from 'lucide-react';
import TaskBoard from '@/features/tasks/components/TaskBoard';
import NewTaskModal from '@/features/tasks/components/NewTaskModal';
import TaskDetailDrawer from '@/features/tasks/components/TaskDetailDrawer';
import { initialColumns, initialTasks } from '@/features/tasks/data/initialData';
import { TaskColumn, Task } from '@/types/tasks';

export default function TasksPage() {
    const [columns, setColumns] = useState<TaskColumn[]>([]);
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // Initialize Data
    useEffect(() => {
        const cols = initialColumns.map(col => ({
            ...col,
            tasks: initialTasks.filter(task => task.status === col.id)
        }));
        setColumns(cols);
    }, []);

    const handleAddTask = (taskData: any) => {
        const newTask: Task = {
            id: `t-${Date.now()}`,
            ...taskData
        };

        const newColumns = columns.map(col => {
            if (col.id === newTask.status) {
                return { ...col, tasks: [newTask, ...col.tasks] };
            }
            return col;
        });

        setColumns(newColumns);
        setIsNewTaskOpen(false);
    };

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
    };

    return (
        <div className="flex flex-col h-full gap-4 pt-2">
            {/* Header Section */}
            <header className="flex flex-col gap-6 shrink-0 z-10 w-full">
                {/* Max-width to avoid overlapping with Global Header if Absolute, 
                    OR just rely on layout. If Layout is Flex Column, this is below header. 
                    If Layout is Absolute Header, this needs to not overlap. 
                    I'll assume Absolute Header in Layout, so I leave space or just flow normally if Title is Left. */}

                {/* Top Bar (Breadcrumb) - Using absolute negative top margin to align with "Global Header" area if needed, 
                    OR just normal flow if we want it below. 
                    User wanted "Page Title" (H2) and Breadcrumb. */}

                <div className="flex items-center text-sm text-gray-500 font-medium tracking-wide">
                    <span className="hover:text-primary cursor-pointer transition-colors">Projeto Avoice</span>
                    <ChevronRight size={14} className="mx-2 text-gray-400" />
                    <span className="text-gray-800">Tasks Board</span>
                </div>

                {/* Controls Bar */}
                <div className="flex items-center justify-between bg-white/40 backdrop-blur-md p-4 rounded-[24px] border border-white/60 shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-800 px-2">Tasks</h1>

                    <div className="flex items-center gap-3">
                        {/* Local Task Search */}
                        <div className="flex items-center gap-2 bg-white/60 border border-white/60 rounded-xl px-4 py-2 w-[240px] shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Filtrar tarefas..."
                                className="bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 w-full text-sm font-medium"
                            />
                        </div>

                        <div className="h-8 w-px bg-gray-300/50 mx-1" />

                        {/* Filters */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/60 border border-white/60 rounded-xl text-gray-600 font-medium hover:bg-white hover:text-primary transition-all shadow-sm">
                            <ListFilter size={18} />
                            <span className="text-sm">Filtros</span>
                        </button>

                        {/* Add Button */}
                        <button
                            onClick={() => setIsNewTaskOpen(true)}
                            className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all"
                        >
                            <Plus size={20} />
                            <span>Nova Tarefa</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Kanban Board Area */}
            <div className="flex-1 overflow-hidden mt-2">
                <TaskBoard
                    columns={columns}
                    setColumns={setColumns}
                    onTaskClick={handleTaskClick}
                />
            </div>

            {/* Modals & Drawers */}
            <NewTaskModal
                isOpen={isNewTaskOpen}
                onClose={() => setIsNewTaskOpen(false)}
                onAddTask={handleAddTask}
            />

            <TaskDetailDrawer
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                task={selectedTask}
            />
        </div>
    );
}
