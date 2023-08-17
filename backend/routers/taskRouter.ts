import { z } from 'zod';
import { procedure, router } from '@/backend/trpc';
import { prisma } from '@/utils/prisma';
export const taskRouter = router({
  getTasks: procedure 
    .query(async (opts) => {
      const tasks=await prisma.task.findMany()
      return {
        tasks: tasks,
      };
    }),
    deleteTask:procedure.input(z.number()).mutation(async(opts)=>{
      const {input}=opts;
      const taskToDelete=await prisma.task.findUnique({
        where:{
          id:input
        }
      })
      if(!taskToDelete){
        return {status:400,message:'task not found'}
      }
      const deleted=await prisma.task.delete({
        where:{
          id:input
        }
      })
      if(deleted)
      return {status:200,message:`Deleted Task .`}
    }),
    getDailyTasks:procedure.query(async(opts)=>{
      const tasks=await prisma.task.findMany({
        where:{
          type:'daily'
        }
      })
      return{
        tasks
      }
    }),
    getWeeklyTasks:procedure.query(async(opts)=>{
      const tasks=await prisma.task.findMany({
        where:{
          type:'weekly'
        }
      })
      return{
        tasks
      }
    }),
    getMonthlyTasks:procedure.query(async(opts)=>{
      const tasks=await prisma.task.findMany({
        where:{
          type:'monthly'
        }
      })
      return{
        tasks
      }
    }),
    getYearlyTasks:procedure.query(async(opts)=>{
      const tasks=await prisma.task.findMany({
        where:{
          type:'yearly'
        }
      })
      return{
        tasks
      }
    }),
    addTask:procedure.input(
        z.object({
          type:z.enum(['daily','weekly','monthly','yearly']),
          status:z.enum(['idle','ongoing','finished','halted']),
          title:z.string(),
          description:z.string(),

        })
    ).mutation( async (opts)=>{
      const {input}=opts;
      const products= await prisma.task.create({data:input})
      return {products , status:200}
    })
    ,
    updateTaskStatus:procedure.input(
      z.object({
        id:z.number(),
        status:z.enum(['idle','ongoing','finished','halted']),
      })
    ).mutation(async (opts)=>{
      const {input}=opts;
      const product=await prisma.task.findUnique({
        where:{
          id:input.id
        }
      })
      if(!product){
        return {status:400,message:'Task not found'}
      }
      const updatedTask=await prisma.task.update({
        where:{
          id:input.id
        },
        data:{
          status:input.status
        }
      })
      if(updatedTask){
        return {message:'Task Updated',updatedTask:updatedTask}
      }
    })
});
