import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './createContext';
import superJSON from 'superjson';
import { verifyJwt } from '@/utils/jwt';
 
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
export const middleware=t.middleware;
export const procedure = t.procedure;
const isAuthorized=middleware(async(opts)=>{
  
  const { ctx } = opts;
  const token=ctx.req.headers.authorization?.split(' ')[1]??'';
  const verifyToken=verifyJwt(token,'accessTokenPublicKey')
  if (!verifyToken) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({ctx});
})
export const authorizedProcedure=procedure.use(isAuthorized)