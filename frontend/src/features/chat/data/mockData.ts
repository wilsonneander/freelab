import { Conversation, Message, User } from "../types";

export const MOCK_USERS: User[] = [
    { id: 'u-1', name: 'Wendell Neander', avatar: 'https://ui-avatars.com/api/?name=Wendell+Neander&background=random', status: 'online', role: 'Backend Dev' },
    { id: 'u-2', name: 'Erik Gunsel', avatar: 'https://ui-avatars.com/api/?name=Erik+Gunsel&background=random', status: 'meeting', role: 'Designer' },
    { id: 'u-3', name: 'Emily Smith', avatar: 'https://ui-avatars.com/api/?name=Emily+Smith&background=random', status: 'offline', role: 'Product Owner' },
    { id: 'u-4', name: 'Arthur Adelk', avatar: 'https://ui-avatars.com/api/?name=Arthur+Adelk&background=random', status: 'busy', role: 'Frontend Dev' },
];

export const MOCK_MESSAGES: Message[] = [
    {
        id: 'm-1',
        conversationId: 'c-1',
        senderId: 'u-2',
        content: 'Hey Wendell, did you check the latest designs?',
        timestamp: '2023-10-26T10:30:00Z',
        isRead: true,
    },
    {
        id: 'm-2',
        conversationId: 'c-1',
        senderId: 'u-1',
        content: 'Yes! They look amazing. Especially the glassmorphism effects.',
        timestamp: '2023-10-26T10:32:00Z',
        isRead: true,
        reactions: [{ emoji: '🔥', count: 1, userReacted: false }]
    },
    {
        id: 'm-3',
        conversationId: 'c-1',
        senderId: 'u-2',
        content: 'Great! Can we implement the chat page next?',
        timestamp: '2023-10-26T10:33:00Z',
        isRead: true,
    },
    {
        id: 'm-4',
        conversationId: 'c-1',
        senderId: 'u-1',
        content: 'Sure, I am starting it right now.',
        timestamp: '2023-10-26T10:35:00Z',
        isRead: true,
    },
    {
        id: 'm-5',
        conversationId: 'c-2', // Group chat
        senderId: 'u-3',
        content: 'Team, quick sync in 10 mins?',
        timestamp: '2023-10-26T09:00:00Z',
        isRead: true,
    },
    {
        id: 'm-6',
        conversationId: 'c-2',
        senderId: 'u-4',
        content: 'I am in.',
        timestamp: '2023-10-26T09:05:00Z',
        isRead: false,
    }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 'c-1',
        type: 'individual',
        participants: [MOCK_USERS[0], MOCK_USERS[1]],
        lastMessage: MOCK_MESSAGES[3],
        unreadCount: 0,
        createdAt: '2023-01-01T00:00:00Z',
        sharedProjects: ['Avoice Web', 'Mobile App']
    },
    {
        id: 'c-2',
        type: 'group',
        name: 'Product Team',
        image: 'https://ui-avatars.com/api/?name=Product+Team&background=000',
        participants: [MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[2], MOCK_USERS[3]],
        lastMessage: MOCK_MESSAGES[5],
        unreadCount: 3,
        createdAt: '2023-02-15T00:00:00Z',
        sharedProjects: ['Avoice Web']
    },
    {
        id: 'c-3',
        type: 'individual',
        participants: [MOCK_USERS[0], MOCK_USERS[3]],
        unreadCount: 0,
        createdAt: '2023-03-10T00:00:00Z',
        lastMessage: {
            id: 'm-10',
            conversationId: 'c-3',
            senderId: 'u-4',
            content: 'Sent you the logs.',
            timestamp: '2023-10-25T14:00:00Z',
            attachments: [{ id: 'a-1', name: 'logs.txt', type: 'doc', url: '#' }],
            isRead: true
        }
    }
];
