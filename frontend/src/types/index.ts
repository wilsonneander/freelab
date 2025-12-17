export interface User {
    id: string;
    name: string;
    role: string;
    avatar: string;
    status: 'online' | 'offline' | 'busy';
}

export interface NavItem {
    icon: React.ElementType;
    label: string;
    path: string;
}

export interface Collaborator {
    id: number;
    name: string;
    avatar: string;
    progress: number;
    tier: 'Gold' | 'Silver' | 'Bronze';
}

export interface CalendarEvent {
    id: number;
    title: string;
    client: string;
    date: string; // ISO or formatted
    day: string;
    weekday: string;
    timeRange: string;
    type: 'dev' | 'meeting' | 'marketing';
}

export interface ChartDataPoint {
    name: string;
    value: number;
}

export interface StatCardProps {
    title: string;
    icon: React.ElementType;
    value: string;
    subtitle: string;
    tags?: string[];
    variant?: 'white' | 'orange';
    iconColorClass?: string;
}
