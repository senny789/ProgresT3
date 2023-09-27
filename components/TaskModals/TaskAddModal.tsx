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
import { CalendarIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { useSelector } from "react-redux";
import { selectUserId } from "@/store/AuthReducer";
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
		deadline: z.date({ required_error: "Please enter deadline " }).optional(),
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
		onError(err) {
			toast({
				title: err.message,
				variant: "destructive",
			});
		},
	});
	const userId = useSelector(selectUserId);

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		const taskType = typeof type !== undefined ? { ...type } : {};

		taskMutation.mutate({
			...values,
			...(taskType as any),
			deadline: type?.type === "daily" ? new Date() : values.deadline,
			userId: userId,
		});
	};
	const getDeadLine = (date: Date, type: string) => {
		const newDate = new Date();
		const currDate = new Date(newDate.getTime() - 24 * 60 * 60 * 1000);

		switch (type) {
			case "weekly":
				return (
					date < currDate ||
					date >
						new Date(
							newDate.getTime() + (6 - newDate.getDay()) * 24 * 60 * 60 * 1000
						)
				);
			case "monthly":
				return (
					date < currDate ||
					date >
						new Date(
							newDate.getTime() + (30 - newDate.getDay()) * 24 * 60 * 60 * 1000
						)
				);
			case "yearly":
				return (
					date < currDate ||
					date >
						new Date(
							newDate.getTime() +
								((11 - newDate.getMonth()) * 30 - newDate.getDay()) *
									24 *
									60 *
									60 *
									1000
						)
				);
			default:
				return false;
		}
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
						<form onSubmit={form.handleSubmit(handleSubmit)}>
							<span className="grid grid-cols-2 gap-10">
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
								{type?.type !== "daily" ? (
									<FormField
										control={form.control}
										name="deadline"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Deadline</FormLabel>

												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant={"outline"}
																className={cn(
																	" w-full pl-3 text-left font-normal",
																	!field.value && "text-muted-foreground"
																)}
															>
																{field.value ? (
																	format(field.value, "PPP")
																) : (
																	<span>Pick a date</span>
																)}
																<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className="w-auto p-0" align="start">
														<Calendar
															mode="single"
															className="bg-white shadow-xl"
															selected={field.value}
															onSelect={field.onChange}
															disabled={(date) =>
																getDeadLine(date, type?.type || "")
															}
															initialFocus
														/>
													</PopoverContent>
												</Popover>

												<FormDescription>
													This is the deadline you wish to finish the task .
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								) : null}
								<span className="col-span-2">
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Enter Description"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													This is your description of the task
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</span>
							</span>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default TaskAddModal;
