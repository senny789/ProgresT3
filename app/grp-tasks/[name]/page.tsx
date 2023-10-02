import TaskPage from "@/components/tasks/TaskPage";

import React from "react";

const GroupTasks = ({ params }: { params: { name: string } }) => {
	return <TaskPage groupName={params.name} />;
};

export default GroupTasks;
