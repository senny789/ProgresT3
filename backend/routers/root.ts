import { z } from 'zod';
import { procedure, router } from '@/backend/trpc';
import { taskRouter } from './taskRouter';
import connectDB from '@/utils/prisma';
connectDB();
export const appRouter = router({
  tasks:taskRouter,
 
});
// export type definition of API
export type AppRouter = typeof appRouter;