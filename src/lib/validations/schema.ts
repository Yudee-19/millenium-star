import { z } from "zod";

export const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    label: z.string(),
    priority: z.string(),
    due_date: z.date(),
});

export type TaskType = z.infer<typeof taskSchema>;
