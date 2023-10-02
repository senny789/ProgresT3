import TaskPage from "@/app/tasks/[type]/page";
import { TaskType } from "@prisma/client";

import React from "react";

const GroupTaskType = ({
	params,
}: {
	params: { name: string; type: TaskType };
}) => {
	return <TaskPage params={params} />;
};

export default GroupTaskType;
