import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@/backend/routers/root';
import {createContext} from '@/backend/createContext'
// export API handler
// @see https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});