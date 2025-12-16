import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
    title: string;
    icon: LucideIcon;
    value: string | number;
    subtitle: string;
    tags?: string[];
    variant?: 'white' | 'orange' | 'highlight';
    iconColorClass?: string;
    trend?: 'up' | 'down' | 'neutral';
}
