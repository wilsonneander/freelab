import { z } from 'zod';

export const chatMessageSchema = z.object({
    message: z.string().min(1, 'A mensagem não pode estar vazia').max(2000, 'A mensagem é muito longa'),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
