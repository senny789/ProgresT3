import { z } from "zod";
import { authorizedProcedure, procedure, router } from "@/backend/trpc";
import { prisma } from "@/utils/prisma";
import { TRPCError } from "@trpc/server";

export const groupRouter = router({
	createGroup: procedure
		.input(
			z.object({
				name: z.string(),
				users: z.array(z.string().email()),
			})
		)
		.mutation(async (opts) => {
			const { input } = opts;

			const newGroup = await prisma.group.create({
				data: {
					...input,
				},
			});
			const users = await prisma.user.updateMany({
				where: {
					email: { in: input.users },
				},
				data: {
					group: { push: newGroup.id },
				},
			});
			return {
				message: "Successfully created group",
				users: users,
				status: 200,
			};
		}),
	getGroups: procedure
		.input(
			z.object({
				id: z.number(),
			})
		)
		.query(async (opts) => {
			const { input } = opts;
			const user = await prisma.user.findFirst({
				where: {
					id: input.id,
				},
			});
			const groups = await prisma.group.findMany({
				where: {
					id: {
						in: user?.group,
					},
				},
			});
			return { groups };
		}),
});
