import { z } from 'zod';
import { authorizedProcedure, procedure, router } from '@/backend/trpc';
import { prisma } from '@/utils/prisma';
import { TRPCError } from '@trpc/server';

import { decodeToken,signTokens } from '../services/user.service';
import { verifyJwt } from '@/utils/jwt';


export const userRouter = router({
    createUser:procedure.input(z.object({
        username:z.string(),
        password:z.string(),
        email:z.string().email()
    }))
    .mutation(async(opts)=>{
            const {input} =opts;
            const newUser=await prisma.user.create({data:input})
            if(newUser){
                const {access_token,refresh_token}=await signTokens(newUser);
            return {status:'Success',access_token,user:{id:newUser.id,username:newUser.username}}

            }
            else{
                throw new TRPCError({
                    code:'INTERNAL_SERVER_ERROR',
                    message:'Something went wrong'
                  })
            }
    }),
    loginUser:procedure.input(z.object({
        email:z.string().email(),
        password:z.string()
    })).mutation(async (opts)=>{
        const {input}=opts;
        const findUser=await prisma.user.findUnique({
            where:{email:input.email}
        })
        if(!findUser){
            throw new TRPCError({
                code:'BAD_REQUEST',
                message:'User does not exist'
              })
        }

        if(findUser.password===input.password){
            const {access_token,refresh_token}=await signTokens(findUser);

            return {status:'Success',access_token,user:{id:findUser.id,username:findUser.username}}
        }
    }),
    getUser:authorizedProcedure.query(async (opts)=>{
      const decoded=decodeToken(opts)
        const findUser= await prisma.user.findUnique({
            where:{
                email:decoded?.sub
            }
        })
     if(findUser)
        return {id:findUser.id,username:findUser.username}
    }),
 testAuth:authorizedProcedure.query(()=>{
    return 'Authorized'
 })
})