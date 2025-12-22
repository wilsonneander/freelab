'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui';
import { User, Calendar, Tag, Image as ImageIcon, X, AtSign } from 'lucide-react';
import { createTaskSchema, type CreateTaskInput } from '@/lib/validation/tasks.schema';
import Image from 'next/image';

interface NewTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (task: any) => void;
}

const ALL_COLABORATORS = [
    { id: 'u-1', name: 'Wilson', avatar: 'https://i.pravatar.cc/150?u=u1' },
    { id: 'u-2', name: 'Ana', avatar: 'https://i.pravatar.cc/150?u=u2' },
    { id: 'u-3', name: 'Lucas', avatar: 'https://i.pravatar.cc/150?u=u3' },
    { id: 'u-4', name: 'Maria', avatar: 'https://i.pravatar.cc/150?u=u4' },
];

export function NewTaskModal({ isOpen, onClose, onAddTask }: NewTaskModalProps) {
    const [mentionSearch, setMentionSearch] = useState('');
    const [showMentions, setShowMentions] = useState(false);
    const [selectedColabs, setSelectedColabs] = useState<typeof ALL_COLABORATORS>([]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<CreateTaskInput>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: '',
            description: '',
            priority: 'medium',
            status: 'todo',
            collaboratorIds: [],
            attachments: [],
            commentsCount: 0,
        }
    });

    useEffect(() => {
        setValue('collaboratorIds', selectedColabs.map(c => c.id));
    }, [selectedColabs, setValue]);

    const onSubmit = (data: CreateTaskInput) => {
        onAddTask({
            ...data,
            createdAt: new Date().toISOString(),
        });
        handleClose();
    };

    const handleClose = () => {
        reset();
        setSelectedColabs([]);
        onClose();
    };

    const handleMentionClick = (colab: typeof ALL_COLABORATORS[0]) => {
        if (!selectedColabs.find(c => c.id === colab.id)) {
            setSelectedColabs([...selectedColabs, colab]);
        }
        setMentionSearch('');
        setShowMentions(false);
    };

    const removeColab = (id: string) => {
        setSelectedColabs(selectedColabs.filter(c => c.id !== id));
    };

    const filteredColabs = ALL_COLABORATORS.filter(c =>
        c.name.toLowerCase().includes(mentionSearch.replace('@', '').toLowerCase()) &&
        !selectedColabs.find(sc => sc.id === c.id)
    );

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Criar Nova Tarefa" maxWidth="max-w-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 text-black">
                {/* Title */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Título da Tarefa</label>
                    <input
                        type="text"
                        {...register('title')}
                        placeholder="Ex: Redesign da Homepage"
                        className={`w-full px-5 py-4 bg-white border ${errors.title ? 'border-red-500' : 'border-gray-100'} rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-black text-lg text-black shadow-sm placeholder:text-gray-200`}
                        autoFocus
                    />
                    {errors.title && (
                        <span className="text-[10px] text-red-500 font-bold uppercase tracking-wide">{errors.title?.message}</span>
                    )}
                </div>

                {/* Sub-header Row */}
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Área / Categoria</label>
                        <select
                            {...register('area')}
                            className={`w-full px-5 py-4 bg-white border ${errors.area ? 'border-red-500' : 'border-gray-100'} rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer font-bold text-black shadow-sm`}
                        >
                            <option value="">Selecionar área...</option>
                            <option value="UX Design">UX Design</option>
                            <option value="Desenvolvimento">Desenvolvimento</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Dados">Dados</option>
                            <option value="Atendimento">Atendimento</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Prioridade</label>
                        <select
                            {...register('priority')}
                            className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer font-bold text-black shadow-sm"
                        >
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Descrição</label>
                    <textarea
                        {...register('description')}
                        placeholder="Descreva o que precisa ser feito..."
                        className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all min-h-[120px] resize-none font-semibold text-black shadow-sm placeholder:text-gray-200"
                    />
                </div>

                {/* Mentions / Colaborators Selection */}
                <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Colaboradores</label>

                    <div className="flex flex-wrap gap-2 mb-1">
                        {selectedColabs.map(colab => (
                            <div key={colab.id} className="flex items-center gap-2 pl-1 pr-2 py-1 bg-primary/5 border border-primary/10 rounded-full group transition-all hover:bg-primary/10">
                                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white shadow-sm">
                                    <Image src={colab.avatar} alt={colab.name} fill className="object-cover" />
                                </div>
                                <span className="text-xs font-black text-black">{colab.name}</span>
                                <button
                                    type="button"
                                    onClick={() => removeColab(colab.id)}
                                    className="p-0.5 hover:bg-black/5 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="relative">
                        <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus-within:ring-4 focus-within:ring-primary/5 transition-all shadow-inner">
                            <AtSign size={18} className="text-gray-300" />
                            <input
                                type="text"
                                placeholder="Digite @ para mencionar um colaborador..."
                                value={mentionSearch}
                                onChange={(e) => {
                                    setMentionSearch(e.target.value);
                                    setShowMentions(e.target.value.includes('@'));
                                }}
                                className="bg-transparent border-none outline-none text-black font-bold text-sm w-full placeholder:text-gray-300"
                            />
                        </div>

                        {showMentions && filteredColabs.length > 0 && (
                            <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-100 rounded-[20px] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-2 border-b border-gray-50 bg-gray-50/50">
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-2">Sugestões</span>
                                </div>
                                <div className="max-h-[200px] overflow-y-auto no-scrollbar">
                                    {filteredColabs.map(colab => (
                                        <button
                                            key={colab.id}
                                            type="button"
                                            onClick={() => handleMentionClick(colab)}
                                            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-primary/5 transition-colors text-left group"
                                        >
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white shadow-sm">
                                                <Image src={colab.avatar} alt={colab.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-black group-hover:text-primary transition-colors">{colab.name}</span>
                                                <span className="text-[10px] text-gray-400 font-bold">Equipe Freelab</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-5 pt-8 mt-4 border-t border-gray-50">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-8 py-3 text-gray-400 font-black text-[11px] uppercase tracking-widest hover:text-black transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary min-w-[180px]"
                    >
                        {isSubmitting ? 'Gerando...' : 'Criar Tarefa'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
