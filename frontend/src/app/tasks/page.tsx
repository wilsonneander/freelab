'use client';

import React, { useState, useEffect } from 'react';
import { Filter, Plus, ChevronRight, Search, ListFilter } from 'lucide-react';
import {
    TaskBoard,
    NewTaskModal,
    TaskDetailModal,
    initialColumns,
    initialTasks,
    Task,
    TaskColumnData
} from '@/features/tasks';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchSchema, type SearchInput } from '@/lib/validation/common.schema';

export default function TasksPage() {
    const [columns, setColumns] = useState<TaskColumnData[]>([]);
    const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const { register, watch } = useForm<SearchInput>({
        resolver: zodResolver(searchSchema),
        defaultValues: { query: '' }
    });

    const searchQuery = watch('query');

    // Initialize Data
    useEffect(() => {
        const cols = initialColumns.map(col => ({
            ...col,
            tasks: initialTasks.filter(task => task.status === col.id)
        }));
        setColumns(cols);
    }, []);

    // Filter tasks based on searchQuery
    const filteredColumns = columns.map(col => ({
        ...col,
        tasks: col.tasks.filter(task =>
            task.title.toLowerCase().includes((searchQuery ?? '').toLowerCase()) ||
            task.description.toLowerCase().includes((searchQuery ?? '').toLowerCase())
        )
    }));

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
        <div className="flex flex-col h-full gap-5 pt-8">
            {/* Header Section */}
            <header className="flex flex-col shrink-0 z-10 w-full mb-2">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-[#fff] font-semibold tracking-wide mb-4">
                    <span className="hover:text-primary cursor-pointer transition-colors">CreativeSync Hub</span>
                    <ChevronRight size={14} className="mx-2 text-black" />
                    <span className="text-black font-black">Tarefas</span>
                </div>

                {/* Main Glass Header */}
                <div className="flex items-center justify-between bg-white border border-white p-5 rounded-[24px] shadow-sm">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-black text-black">Tarefas</h1>
                        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full px-3 py-1 gap-2">
                            <span className="flex w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-xs font-bold text-[#4B4B4B] uppercase tracking-wider">Live Board</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Status Pills Visualization (Filter/List switcher) */}
                        <div className="flex bg-gray-100/50 p-1 rounded-xl mr-2">
                            <button className="flex items-center gap-2 px-4 py-1.5 bg-white shadow-sm rounded-lg text-sm font-bold text-black transition-all">
                                <Search size={16} />
                                <span>Kanban</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-[#4B4B4B] hover:text-black transition-all">
                                <ListFilter size={16} />
                                <span>Lista</span>
                            </button>
                        </div>

                        {/* Local Task Search */}
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-[240px] focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-inner">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                {...register('query')}
                                placeholder="Filtrar tarefas..."
                                className="bg-transparent border-none outline-none text-black placeholder-gray-400 w-full text-sm font-bold"
                            />
                        </div>

                        <div className="h-8 w-px bg-gray-200 mx-1" />

                        {/* Add Button */}
                        <button
                            onClick={() => setIsNewTaskOpen(true)}
                            className="btn-primary"
                        >
                            <Plus size={20} />
                            <span>Nova Tarefa</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Kanban Board Area - Container Pai (Glass) */}
            <main className="flex-1 bg-white/60 rounded-[32px] border border-white p-6 overflow-hidden shadow-xl shadow-black/5">
                <TaskBoard
                    columns={filteredColumns}
                    setColumns={setColumns}
                    onTaskClick={handleTaskClick}
                />
            </main>

            {/* Modals & Drawers */}
            <NewTaskModal
                isOpen={isNewTaskOpen}
                onClose={() => setIsNewTaskOpen(false)}
                onAddTask={handleAddTask}
            />

            <TaskDetailModal
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                task={selectedTask}
            />
        </div>
    );
}
