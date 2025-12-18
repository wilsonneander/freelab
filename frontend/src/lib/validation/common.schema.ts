import { z } from 'zod';

export const searchSchema = z.object({
    query: z.string().max(100, 'A busca é muito longa').optional().or(z.literal('')),
});

export type SearchInput = z.infer<typeof searchSchema>;
