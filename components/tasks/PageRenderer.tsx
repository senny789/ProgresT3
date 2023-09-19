"use client";
import { selectUserId } from "@/store/AuthReducer";
import React from "react";
import { useSelector } from "react-redux";
import BodyHeader from "../layout/BodyHeader";
import Time from "../TaskPageComponents/Time";
import TaskList from "./TaskList";
import { trpc } from "@/utils/trpc";
import { TaskType } from "@prisma/client";
import DayoftheWeek from "../TaskPageComponents/DayoftheWeek";
import MonthYear from "../TaskPageComponents/DayoftheMonth";

const PageRenderer = ({ type }: { type: TaskType }) => {
	const userId = useSelector(selectUserId);
	const getTaskQueryMethod = () => {
		switch (type) {
			case "daily":
				return "getDailyTasks";
			case "weekly":
				return "getWeeklyTasks";
			case "monthly":
				return "getMonthlyTasks";
			case "yearly":
				return "getYearlyTasks";
			default:
				return "getDailyTasks";
		}
	};
	const taskQueryMethod = getTaskQueryMethod();

	const { data } = trpc.tasks[taskQueryMethod as "getDailyTasks"].useQuery({
		id: userId,
	});
	const tasks = data ? data.tasks : [];
	const pageRenderDetailList = [
		{
			type: "daily",
			title: "Daily tasks",
			description:
				"Here you can see your daily.The tasks you add here get expired at the end of the day , so add the task you want to complete within today.",
			components: <Time />,
			tasks: tasks,
		},
		{
			type: "weekly",
			title: "Weekly tasks",
			description:
				"Here you can see your weekly tasks. The tasks you add here get expired in the end of this week , so add the task you want to complete within this week.",
			components: <DayoftheWeek />,
			tasks: tasks,
		},
		{
			type: "monthly",
			title: "Monthly tasks",
			description:
				"Here you can see your monthly tasks.The tasks you add here get expired in the end of this month , so add the task you want to complete within this month.",
			components: <MonthYear type="month" />,
			tasks: tasks,
		},
		{
			type: "yearly",
			title: "Yearly tasks",
			description:
				"Here you can see your yearly tasks.The tasks you add here get expired in the end of this year , so add the task you want to complete within this year.",
			components: (
				<>
					<MonthYear type="year" />
				</>
			),
			tasks: tasks,
		},
	];
	const CurrentPageDetails = pageRenderDetailList.find(
		(detail) => detail.type === type
	);
	return (
		<>
			<BodyHeader
				title={CurrentPageDetails?.title || ""}
				description={CurrentPageDetails?.description}
			/>
			{CurrentPageDetails?.components}
			<TaskList taskList={tasks} type={type} />
		</>
	);
};

export default PageRenderer;
