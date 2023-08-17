"use client";

import { Button } from "@/components/ui/button";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
type TaskType = {
	type: "daily" | "weekly" | "monthly" | "yearly";
	status: "idle" | "ongoing" | "finished" | "halted";
};
const TaskAddModal = ({
	type,
	open,
	handleOpen,
}: {
	type?: TaskType;
	open: boolean;
	handleOpen: (val: boolean) => void;
}) => {
	const utils = trpc.useContext();

	const formSchema = z.object({
		type: z.enum(["daily", "monthly", "weekly", "yearly"]),
		status: z.enum(["idle", "ongoing", "finished", "halted"]),
		title: z.string({ required_error: "Please enter Title " }),
		description: z.string({ required_error: "Please enter Description " }),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			type: typeof type !== undefined ? type?.type : "daily",
			status: typeof type !== undefined ? type?.status : "idle",
		},
		resolver: zodResolver(formSchema),
	});
	const { toast } = useToast();
	const taskMutation = trpc.tasks.addTask.useMutation({
		onSuccess() {
			toast({
				title: "Task created successfully",
			});
			utils.tasks.getTasks.invalidate();
			utils.tasks.getDailyTasks.invalidate();
			utils.tasks.getWeeklyTasks.invalidate();
			utils.tasks.getMonthlyTasks.invalidate();
			utils.tasks.getYearlyTasks.invalidate();

			handleOpen(false);
		},
		onError() {
			toast({
				title: "Something went wrong",
			});
		},
	});
	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		const taskType = typeof type !== undefined ? { ...type } : {};
		taskMutation.mutate({
			...values,
			...(taskType as any),
		});
	};

	return (
		<>
			<Dialog open={open} onOpenChange={handleOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Task</DialogTitle>
						<DialogDescription>
							Add Tasks that you want to track
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleSubmit)}
							className="space-y-8"
						>
							{type !== undefined ? null : (
								<>
									<FormField
										control={form.control}
										name="type"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Type</FormLabel>

												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select Type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="daily">Daily</SelectItem>
														<SelectItem value="weekly">Weekly</SelectItem>
														<SelectItem value="monthly">Monthly</SelectItem>
														<SelectItem value="yearly">Yearly</SelectItem>
													</SelectContent>
												</Select>
												<FormDescription>
													Select the category of task
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="status"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Status</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select Status" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="idle">Idle</SelectItem>
														<SelectItem value="ongoing">Ongoing</SelectItem>
														<SelectItem value="finished">Finished</SelectItem>
														<SelectItem value="halted">Halted</SelectItem>
													</SelectContent>
												</Select>
												<FormDescription>
													This is your public display name.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							)}
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input placeholder="Enter Title" {...field} />
										</FormControl>
										<FormDescription>
											This is title of your task.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input placeholder="Enter Description" {...field} />
										</FormControl>
										<FormDescription>
											This is your description of the task
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default TaskAddModal;
