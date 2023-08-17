"use client";
import BodyHeader from "@/components/layout/BodyHeader";
import TaskList from "@/components/tasks/TaskList";
import { trpc } from "@/utils/trpc";
import React from "react";

const page = () => {
	const tasks = trpc.tasks.getYearlyTasks.useQuery();

	return (
		<div>
			{" "}
			<BodyHeader
				title="Yearly tasks"
				description="Here you can see your tasks by going on to each links below where you will be provided to add and edit tasks."
			/>
			<TaskList taskList={tasks} type="yearly" />
		</div>
	);
};

export default page;
