'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { TaskPriority, TaskStatus } from '@/types/tasks';
import { User, Calendar, Tag, Image as ImageIcon } from 'lucide-react';

interface NewTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: any) => void;
}

export default function NewTaskModal({ isOpen, onClose, onAddTask }: NewTaskModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<TaskPriority>('medium');
    const [status, setStatus] = useState<TaskStatus>('todo');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask({
            title,
            description,
            priority,
            status,
            collaboratorIds: ['u-1'], // Mock default
            attachments: [],
            commentsCount: 0,
            createdAt: new Date().toISOString(),
        });
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setStatus('todo');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={resetForm} title="Nova Tarefa">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Title */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Título da Tarefa</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Redesign da Homepage"
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                        required
                        autoFocus
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Descrição Detalhada</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descreva os detalhes da tarefa..."
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[120px] resize-none"
                    />
                </div>

                {/* Meta Fields Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Prioridade</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as TaskPriority)}
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
                        >
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Status Inicial</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as TaskStatus)}
                            className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
                        >
                            <option value="todo">A Fazer</option>
                            <option value="in-progress">Em Progresso</option>
                            <option value="review">Em Revisão</option>
                        </select>
                    </div>
                </div>

                {/* Mock Actions (Upload, Assign) */}
                <div className="flex items-center gap-2 pt-2 pb-4">
                    <button type="button" className="flex items-center gap-2 px-3 py-2 bg-gray-100/50 hover:bg-gray-100 rounded-lg text-sm text-gray-600 transition-colors">
                        <User size={16} /> Assignar
                    </button>
                    <button type="button" className="flex items-center gap-2 px-3 py-2 bg-gray-100/50 hover:bg-gray-100 rounded-lg text-sm text-gray-600 transition-colors">
                        <ImageIcon size={16} /> Capa
                    </button>
                    <button type="button" className="flex items-center gap-2 px-3 py-2 bg-gray-100/50 hover:bg-gray-100 rounded-lg text-sm text-gray-600 transition-colors">
                        <Tag size={16} /> Tags
                    </button>
                    <button type="button" className="flex items-center gap-2 px-3 py-2 bg-gray-100/50 hover:bg-gray-100 rounded-lg text-sm text-gray-600 transition-colors">
                        <Calendar size={16} /> Data
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100/50">
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-2.5 text-gray-600 font-medium hover:bg-black/5 rounded-xl transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-2.5 bg-primary text-white font-medium rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all"
                    >
                        Criar Tarefa
                    </button>
                </div>
            </form>
        </Modal>
    );
}
