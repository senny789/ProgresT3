import { z } from "zod";
import { authorizedProcedure, procedure, router } from "@/backend/trpc";
import { prisma } from "@/utils/prisma";
import { TRPCError } from "@trpc/server";
import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
import { Resend } from "resend";
import { Email } from "@/components/Email";
const resend = new Resend(process.env.RESEND_API_KEY);
function sendMail(from: string, to: string, url: string) {
	resend.emails
		.send({
			from: `Progress <onboarding@resend.dev>`,
			to: to,
			subject: "Group Invitation",
			react: Email(url),
		})
		.catch((err) => console.log(err));
}
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
			input.users.slice(1).forEach((user) => {
				sendMail(input.users[0], user, "");
			});

			return {
				message: "Successfully created group",
				users: users,
				status: 200,
			};
		}),
	deleteGroup: procedure.input(z.number()).mutation(async (opts) => {
		const { input: id } = opts;
		const findGroup = await prisma.group.findFirst({
			where: {
				id: id,
			},
		});
		if (findGroup) {
			await prisma.group.delete({
				where: {
					id: id,
				},
			});
			return { message: "Group deleted successfully" };
		} else {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "Grooup Doesnt exist.",
			});
		}
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
