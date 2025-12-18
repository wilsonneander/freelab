export type UserStatus = 'online' | 'offline' | 'busy' | 'meeting';

export interface User {
    id: string;
    name: string;
    avatar: string;
    status: UserStatus;
    role?: string;
}

export interface Attachment {
    id: string;
    name: string;
    type: 'image' | 'pdf' | 'doc' | 'audio' | 'other';
    url: string;
    size?: string;
}

export interface Reaction {
    emoji: string;
    count: number;
    userReacted: boolean; // if current user reacted
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    timestamp: string;
    attachments?: Attachment[];
    reactions?: Reaction[];
    replyToId?: string; // ID of the message being replied to
    isRead: boolean;
}

export interface Conversation {
    id: string;
    type: 'individual' | 'group';
    name?: string; // For groups
    image?: string; // For groups
    participants: User[];
    lastMessage?: Message;
    unreadCount: number;
    isPinned?: boolean;
    sharedProjects?: string[]; // IDs or Names
    createdAt: string;
}
