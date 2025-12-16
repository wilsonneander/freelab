import { MoreVertical } from 'lucide-react';
import { Collaborator } from '@/types';

interface CollaboratorsListProps {
    items: Collaborator[];
}

export function CollaboratorsList({ items }: CollaboratorsListProps) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-[#2D3436] mb-4">Colaboradores</h3>
            <div className="flex flex-col gap-3">
                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-3 flex items-center gap-4 shadow-sm backdrop-blur-sm bg-opacity-90">
                        <div className="flex items-center gap-2 min-w-[140px]">
                            <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full" />
                            <span className="text-sm font-semibold text-[#2D3436]">{item.name}</span>
                        </div>
                        <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#2D3436] rounded-full" style={{ width: `${item.progress}%` }}></div>
                        </div>
                        <span className="bg-[#FEF9E7] text-[#F1C40F] px-2 py-1 rounded-lg text-[10px] font-bold">+{item.tier}</span>
                        <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
                    </div>
                ))}
            </div>
        </div>
    );
}
