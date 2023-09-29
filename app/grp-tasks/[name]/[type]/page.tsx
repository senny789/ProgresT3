"use client";
import TaskPage from "@/app/tasks/[type]/page";
import { TaskType } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React from "react";

const GroupTaskType = ({
	params,
}: {
	params: { name: string; type: TaskType };
}) => {
	const groupId = useSearchParams()?.get("id");
	console.log(params, groupId);

	return (
		<div>
			<TaskPage
				params={params}
				group={{ name: params.name, id: Number(groupId) }}
			/>
		</div>
	);
};

export default GroupTaskType;
