import { z } from 'zod';

export const taskStatusSchema = z.enum(['todo', 'in-progress', 'review', 'done']);
export const taskPrioritySchema = z.enum(['low', 'medium', 'high']);

export const createTaskSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório').max(100),
  description: z.string().max(1000),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  collaboratorIds: z.array(z.string()),
  attachments: z.array(z.any()),
  commentsCount: z.number(),
  createdAt: z.string().optional(),
});


export type CreateTaskInput = z.infer<typeof createTaskSchema>;
