import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatCardProps } from '../../types';

export function StatCard({
    title,
    icon: Icon,
    value,
    subtitle,
    tags = [],
    variant = 'white',
    iconColorClass,
}: StatCardProps) {
    const isOrange = variant === 'orange';

    return (
        <div className={cn(
            "rounded-[20px] p-4 flex flex-col relative transition-transform hover:-translate-y-1 shadow-sm",
            isOrange
                ? "bg-gradient-to-br from-[#FFB66D] to-[#FFA045] text-white shadow-[0_10px_20px_rgba(255,159,67,0.3)]"
                : "bg-white text-[#2D3436]"
        )}>
            <div className="flex justify-between mb-3">
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    isOrange ? "bg-white/30 text-white" : iconColorClass
                )}>
                    <Icon size={20} />
                </div>
                <span className={isOrange ? "text-white" : "text-gray-400"}>↗</span>
            </div>

            <h3 className="text-sm font-semibold mb-1">{title}</h3>
            <small className={cn("text-[10px] mb-3 block", isOrange ? "opacity-80" : "text-gray-400")}>{subtitle}</small>

            <div className="flex gap-1.5 mb-4">
                {tags.map((tag, i) => (
                    <span key={i} className={cn(
                        "text-[9px] px-2 py-1 rounded-xl",
                        isOrange
                            ? "bg-white/20 text-white border border-white/40"
                            : "bg-gray-100 text-gray-500"
                    )}>
                        {tag}
                    </span>
                ))}
            </div>

            <div className="text-3xl font-bold">
                {value} <span className={cn("text-[11px] font-normal ml-1", isOrange ? "text-white" : "text-gray-400")}>applications</span>
            </div>
        </div>
    );
}
