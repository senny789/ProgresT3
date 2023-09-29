"use client";
import NotFound from "@/app/not-found";
import PageRenderer from "@/components/tasks/PageRenderer";
import { TaskType } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const TaskPage = ({
	params,
	group,
}: {
	params: { type: TaskType };
	group?: { name: string; id: number };
}) => {
	function isTaskType(taskType: string): taskType is TaskType {
		return ["daily", "weekly", "monthly", "yearly"].includes(taskType);
	}
	const router = useRouter();
	useEffect(() => {
		if (!isTaskType(params.type)) {
			router.push("/not-found");
		}
	}, []);
	if (!isTaskType(params.type)) {
		return <NotFound />;
	}
	return <PageRenderer type={params.type} key={params.type} group={group} />;
};

export default TaskPage;
