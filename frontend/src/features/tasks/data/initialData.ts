import { Task, TaskColumn } from "@/types/tasks";

export const initialTasks: Task[] = [
    {
        id: 't-1',
        title: 'Design System Update',
        description: 'Update the color palette and typography in the global CSS to match the new brand guidelines.',
        status: 'todo',
        priority: 'high',
        collaboratorIds: ['u-1'],
        attachments: [],
        commentsCount: 2,
        createdAt: '2023-10-25T10:00:00Z',
    },
    {
        id: 't-2',
        title: 'Kanban Board Logic',
        description: 'Implement drag and drop functionality using @hello-pangea/dnd library.',
        status: 'in-progress',
        priority: 'high',
        coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        collaboratorIds: ['u-2', 'u-3'],
        attachments: [],
        commentsCount: 5,
        createdAt: '2023-10-26T14:30:00Z',
    },
    {
        id: 't-3',
        title: 'Client Meeting Preparation',
        description: 'Prepare slides and gathering metrics for the monthly review with Acme Corp.',
        status: 'review',
        priority: 'medium',
        collaboratorIds: ['u-1'],
        attachments: [
            { id: 'a-1', name: 'Slides.pdf', type: 'pdf', url: '#' }
        ],
        commentsCount: 0,
        createdAt: '2023-10-27T09:15:00Z',
    },
    {
        id: 't-4',
        title: 'Fix Navigation Bug',
        description: 'Mobile menu not closing when clicking outside the drawer.',
        status: 'done',
        priority: 'low',
        collaboratorIds: ['u-2'],
        attachments: [],
        commentsCount: 1,
        createdAt: '2023-10-24T16:45:00Z',
    },
    {
        id: 't-5',
        title: 'Optimize Images',
        description: 'Compress all hero images to improve LCP score.',
        status: 'todo',
        priority: 'medium',
        collaboratorIds: ['u-3'],
        attachments: [],
        commentsCount: 3,
        createdAt: '2023-10-28T11:00:00Z',
    }
];

export const initialColumns: TaskColumn[] = [
    { id: 'todo', title: 'A Fazer', tasks: [] },
    { id: 'in-progress', title: 'Em Progresso', tasks: [] },
    { id: 'review', title: 'Em Revisão', tasks: [] },
    { id: 'done', title: 'Concluída', tasks: [] },
];
