import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatCardProps } from '../types';

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
            "card-base h-full justify-between transition-transform hover:-translate-y-1 !rounded-[24px]",
            isOrange
                ? "bg-gradient-to-br from-[#FFB66D] to-[#FFA045] text-white shadow-[0_10px_20px_rgba(255,159,67,0.3)]  border-none"
                : "bg-[#F5F5F5]/70 border border-white text-[#2D3436]"
        )}>
            <div className="flex justify-between items-start">
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    isOrange ? "bg-white/30 text-white" : iconColorClass
                )}>
                    <Icon size={18} />
                </div>
                <span className={cn("text-xs", isOrange ? "text-white" : "text-gray-400")}>↗</span>
            </div>

            <div>
                <h3 className="text-sm font-semibold mb-0.5">{title}</h3>
                <small className={cn("text-[10px] block leading-tight opacity-80", isOrange ? "text-white" : "text-gray-400")}>{subtitle}</small>
            </div>

            <div className="flex items-end justify-between mt-1">
                <div className="text-2xl font-bold leading-none">
                    {value} <span className={cn("text-[10px] font-normal ml-0.5", isOrange ? "text-white" : "text-gray-400")}>apps</span>
                </div>
                <div className="flex gap-1.5">
                    {tags.map((tag: string, i: number) => (
                        <span key={i} className={cn(
                            "text-[10px] px-3 py-1 rounded-full border font-medium",
                            isOrange
                                ? "bg-white/20 text-white border-white/40"
                                : (i === 0
                                    ? "bg-white text-gray-700 border-[#FF9F43]"
                                    : "bg-transparent text-gray-500 border-[#FF9F43]")
                        )}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
