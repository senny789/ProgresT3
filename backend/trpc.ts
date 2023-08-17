import { initTRPC } from '@trpc/server';
import { Context } from './createContext';
import superJSON from 'superjson';
 
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
    transformer: superJSON,
  });
 
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const procedure = t.procedure;