'use client';

import React, { useState, useEffect } from 'react';
import { Filter, Plus, ChevronRight, Search, ListFilter } from 'lucide-react';
import {
    TaskBoard,
    NewTaskModal,
    TaskDetailDrawer,
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
        <div className="flex flex-col h-full gap-4 pt-2">
            {/* Header Section */}
            <header className="flex flex-col gap-6 shrink-0 z-10 w-full">
                <div className="flex items-center text-sm text-gray-500 font-medium tracking-wide">
                    <span className="hover:text-primary cursor-pointer transition-colors">Projeto Avoice</span>
                    <ChevronRight size={14} className="mx-2 text-gray-400" />
                    <span className="text-gray-800">Tasks Board</span>
                </div>

                {/* Controls Bar */}
                <div className="flex items-center justify-between bg-white/40 backdrop-blur-md p-4 rounded-[24px] border border-white/60 shadow-m">
                    <h1 className="text-2xl font-bold text-gray-800 px-2">Tasks</h1>

                    <div className="flex items-center gap-3">
                        {/* Local Task Search */}
                        <div className="flex items-center gap-2 bg-white/60 border border-white/60 rounded-xl px-4 py-2 w-[240px] shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                {...register('query')}
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
                    columns={filteredColumns}
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
