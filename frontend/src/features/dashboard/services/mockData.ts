import { ChartDataPoint, Collaborator, CalendarEvent } from '@/types';

export const DASHBOARD_STATS = [
    { title: "Total Projects", value: "38", subtitle: "Updated 1 week ago", icon: 'Folder', variant: "orange", tags: ['Mobile', '2+ years exp.'] },
    { title: "Clients", value: "38", subtitle: "Updated 1 week ago", icon: 'Users', iconColorClass: "bg-[#581C0C] text-white", tags: ['Remote', '2+ years exp.'] },
    { title: "Total Tasks", value: "38", subtitle: "Updated 1 week ago", icon: 'CheckSquare', iconColorClass: "bg-[#FFCE20] text-white", tags: ['Remote', '2+ years exp.'] },
    { title: "Total income", value: "38", subtitle: "Updated 1 week ago", icon: 'TrendingUp', iconColorClass: "bg-[#75B753] text-white", tags: ['Remote', '2+ years exp.'] },
];

export const REVENUE_CHART_DATA: ChartDataPoint[] = [
    { name: 'Jan', value: 30 },
    { name: 'Fev', value: 40 },
    { name: 'Mar', value: 35 },
    { name: 'Abr', value: 50 },
    { name: 'Mai', value: 45 },
    { name: 'Jun', value: 70 },
    { name: 'Jul', value: 60 },
];

export const COLLABORATORS: Collaborator[] = [
    { id: 1, name: 'Aline Dias', avatar: 'https://ui-avatars.com/api/?name=Aline+Dias&background=random', progress: 70, tier: 'Gold' },
    { id: 2, name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random', progress: 45, tier: 'Silver' },
    { id: 3, name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random', progress: 90, tier: 'Gold' },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
    { id: 1, title: 'Desenvolvimento', client: 'Avoice Company', day: '30', weekday: 'SEX', timeRange: '09:45 am - 10:45 am', type: 'dev', date: '2023-11-30' },
    { id: 2, title: 'Daily', client: 'Mirum Agency', day: '03', weekday: 'SEG', timeRange: '09:45 am - 10:45 am', type: 'meeting', date: '2023-12-03' },
    { id: 3, title: 'Tráfego Pago', client: 'Garden Agency', day: '06', weekday: 'QUA', timeRange: '09:45 am - 10:45 am', type: 'marketing', date: '2023-12-06' },
];
