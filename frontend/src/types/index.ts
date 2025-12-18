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
