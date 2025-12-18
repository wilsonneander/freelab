export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskAttachment {
    id: string;
    name: string;
    type: 'image' | 'pdf' | 'doc' | 'other';
    url: string;
}

export interface TaskComment {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    coverImage?: string;
    collaboratorIds: string[]; // references User.id
    attachments: TaskAttachment[];
    commentsCount: number;
    createdAt: string;
    dueDate?: string;
}

export interface TaskColumnData {
    id: TaskStatus;
    title: string;
    tasks: Task[];
}
