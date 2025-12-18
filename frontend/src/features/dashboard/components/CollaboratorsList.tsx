import { MoreVertical } from 'lucide-react';
import { Collaborator } from '../types';

interface CollaboratorsListProps {
    items: Collaborator[];
}

export function CollaboratorsList({ items }: CollaboratorsListProps) {
    return (
        <div className="card-base h-full bg-[#F5F5F5]/70 border border-white p-4">
            <h3 className="text-sm font-bold text-[#2D3436] mb-3 shrink-0">Colaboradores</h3>
            <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar pr-1">
                {items.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-2.5 flex items-center gap-3 shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center gap-3 w-[140px] shrink-0">
                            <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover border border-gray-100" />
                            <span className="text-xs font-bold text-[#2D3436] truncate">{item.name}</span>
                        </div>

                        <div className="flex-1 h-1.5 bg-black rounded-full overflow-hidden min-w-[50px]">
                            <div className="h-full bg-[#FF9F43] rounded-full" style={{ width: `${item.progress}%` }}></div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <span className="bg-[#FEF9E7] text-[#F1C40F] px-2 py-0.5 rounded-md text-[9px] font-bold min-w-[40px] text-center">+{item.tier}</span>
                            <button className="text-black hover:text-gray-500"><MoreVertical size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
