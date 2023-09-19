import PageRenderer from "@/components/tasks/PageRenderer";
import { TaskType } from "@prisma/client";
import React from "react";

const Task = ({ params }: { params: { type: TaskType } }) => {
	return <PageRenderer type={params.type} />;
};

export default Task;
