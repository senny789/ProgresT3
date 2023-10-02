"use client";
import NotFound from "@/app/not-found";
import PageRenderer from "@/components/tasks/PageRenderer";
import { TaskType } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const TaskPage = ({
	params,
}: {
	params: { name?: string; type: TaskType };
}) => {
	function isTaskType(taskType: string): taskType is TaskType {
		return ["daily", "weekly", "monthly", "yearly"].includes(taskType);
	}
	const groupId = useSearchParams()?.get("id");

	const router = useRouter();
	useEffect(() => {
		if (!isTaskType(params.type)) {
			router.push("/not-found");
		}
	}, []);
	if (!isTaskType(params.type)) {
		return <NotFound />;
	}
	return (
		<PageRenderer
			type={params.type}
			key={params.type}
			group={{ name: params.name || "", id: Number(groupId) || 0 } || undefined}
		/>
	);
};

export default TaskPage;
