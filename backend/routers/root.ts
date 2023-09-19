import { z } from 'zod';
import { procedure, router } from '@/backend/trpc';
import { taskRouter } from './taskRouter';
import connectDB from '@/utils/prisma';
import { userRouter } from './userRouter';
connectDB();
export const appRouter = router({
  tasks:taskRouter,
 users:userRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;