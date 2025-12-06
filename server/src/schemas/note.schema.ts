import { z } from 'zod';

export const createNoteSchema = z.object({
	title: z
		.string()
		.min(1, 'Title is required')
		.max(200, 'Title cannot exceed 200 characters')
		.trim(),
	content: z
		.string()
		.min(1, 'Content is required')
		.max(10000, 'Content cannot exceed 10000 characters'),
	tags: z.array(z.string().trim()).optional().default([]),
});

export const updateNoteSchema = z.object({
	title: z
		.string()
		.min(1, 'Title is required')
		.max(200, 'Title cannot exceed 200 characters')
		.trim()
		.optional(),
	content: z
		.string()
		.min(1, 'Content is required')
		.max(10000, 'Content cannot exceed 10000 characters')
		.optional(),
	tags: z.array(z.string().trim()).optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
