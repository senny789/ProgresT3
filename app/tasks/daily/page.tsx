"use client";
import BodyHeader from "@/components/layout/BodyHeader";
import TaskList from "@/components/tasks/TaskList";
import { trpc } from "@/utils/trpc";
import React from "react";

const page = () => {
	const tasks = trpc.tasks.getDailyTasks.useQuery();

	return (
		<>
			{" "}
			<BodyHeader
				title="Daily tasks"
				description="Here you can see your tasks by going on to each links below where you will be provided to add and edit tasks."
			/>
			<TaskList taskList={tasks} type="daily" />
		</>
	);
};

export default page;
