import { z } from "zod";
import { procedure, router } from "@/backend/trpc";
import { prisma } from "@/utils/prisma";
import { TRPCError } from "@trpc/server";
import { Task } from "@prisma/client";
function generateResponseObject(ListofTask: Task[]) {
	const TaskResponseObject = new Map();
	TaskResponseObject.set(
		"idle",
		ListofTask.filter((dat) => dat.status === "idle")
	);
	TaskResponseObject.set(
		"ongoing",
		ListofTask.filter((dat) => dat.status === "ongoing")
	);
	TaskResponseObject.set(
		"finished",
		ListofTask.filter((dat) => dat.status === "finished")
	);
	TaskResponseObject.set(
		"halted",
		ListofTask.filter((dat) => dat.status === "halted")
	);
	return Object.fromEntries(TaskResponseObject);
}
const queryRoutes = {
	getTasks: procedure
		.input(
			z.object({
				id: z.number(),
				groupId: z.number().optional(),
			})
		)
		.query(async (opts) => {
			const { input } = opts;
			//update tasks to halted whose deadline passes the specified time.
			const updateTasks = await prisma.task.updateMany({
				where: {
					deadline: {
						lt: new Date(new Date().getTime() + 10 * 60 * 60 * 1000),
					},
					userId: input.id,
				},
				data: {
					status: "halted",
				},
			});

			const [daily, weekly, monthly, yearly] = await Promise.all([
				prisma.task.findMany({
					where: { type: "daily", userId: input.id },
				}),
				prisma.task.findMany({
					where: { type: "weekly", userId: input.id },
				}),
				prisma.task.findMany({
					where: { type: "monthly", userId: input.id },
				}),
				prisma.task.findMany({
					where: { type: "yearly", userId: input.id },
				}),
			]);
			const resposeObject = {
				daily: generateResponseObject(daily),
				weekly: generateResponseObject(weekly),
				monthly: generateResponseObject(monthly),
				yearly: generateResponseObject(yearly),
			};
			return {
				tasks: resposeObject,
			};
		}),
	getDailyTasks: procedure
		.input(
			z.object({
				id: z.number(),
				groupId: z.number().nullable(),
			})
		)
		.query(async (opts) => {
			const { input } = opts;
			const tasks = await prisma.task.findMany({
				where: {
					type: "daily",
					userId: input.id,
					groupId: input.groupId ? input.groupId : null,
				},
			});
			return {
				tasks,
			};
		}),
	getWeeklyTasks: procedure
		.input(
			z.object({
				id: z.number(),
				groupId: z.number().nullable(),
			})
		)
		.query(async (opts) => {
			const { input } = opts;
			const tasks = await prisma.task.findMany({
				where: {
					type: "weekly",
					userId: input.id,
					groupId: input.groupId ? input.groupId : null,
				},
			});
			return {
				tasks,
			};
		}),
	getMonthlyTasks: procedure
		.input(
			z.object({
				id: z.number(),
				groupId: z.number().nullable(),
			})
		)
		.query(async (opts) => {
			const { input } = opts;
			const tasks = await prisma.task.findMany({
				where: {
					type: "monthly",
					userId: input.id,
					groupId: input.groupId ? input.groupId : null,
				},
			});
			return {
				tasks,
			};
		}),
	getYearlyTasks: procedure
		.input(
			z.object({
				id: z.number(),
				groupId: z.number().nullable(),
			})
		)
		.query(async (opts) => {
			const { input } = opts;
			const tasks = await prisma.task.findMany({
				where: {
					type: "yearly",
					userId: input.id,
					groupId: input.groupId ? input.groupId : null,
				},
			});
			return {
				tasks,
			};
		}),
};
const murationRoutes = {
	deleteTask: procedure.input(z.number()).mutation(async (opts) => {
		const { input } = opts;
		const taskToDelete = await prisma.task.findUnique({
			where: {
				id: input,
			},
		});
		if (!taskToDelete) {
			return { status: 400, message: "task not found" };
		}
		const deleted = await prisma.task.delete({
			where: {
				id: input,
			},
		});
		if (deleted) return { status: 200, message: `Deleted Task .` };
	}),

	addTask: procedure
		.input(
			z.object({
				type: z.enum(["daily", "weekly", "monthly", "yearly"]),
				status: z.enum(["idle", "ongoing", "finished", "halted"]),
				deadline: z.date(),
				groupId: z.number().optional(),
				title: z.string(),
				description: z.string(),
				userId: z.number(),
			})
		)
		.mutation(async (opts) => {
			const { input } = opts;
			const existingProduct = await prisma.task.findFirst({
				where: {
					type: input.type,
					title: input.title,
					groupId: input.groupId,
				},
			});
			if (existingProduct) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Task already exisits",
				});
			}
			const today = new Date();
			const tomorrow = new Date(today);
			tomorrow.setDate(today.getDate() + 1);

			const task = await prisma.task.create({
				data: {
					...input,
					deadline: input.type === "daily" ? tomorrow : input.deadline,
				},
			});
			return { task, status: 200 };
		}),
	updateTaskStatus: procedure
		.input(
			z.object({
				id: z.number(),
				status: z.enum(["idle", "ongoing", "finished", "halted"]),
			})
		)
		.mutation(async (opts) => {
			const { input } = opts;
			const product = await prisma.task.findUnique({
				where: {
					id: input.id,
				},
			});
			if (!product) {
				return { status: 400, message: "Task not found" };
			}
			const updatedTask = await prisma.task.update({
				where: {
					id: input.id,
				},
				data: {
					status: input.status,
				},
			});
			if (updatedTask) {
				return { message: "Task Updated", updatedTask: updatedTask };
			}
		}),
};
export const taskRouter = router({
	...queryRoutes,
	...murationRoutes,
});
