"use client";
import Task from "@/app/tasks/page";
import BodyHeader from "@/components/layout/BodyHeader";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const GroupTasks = ({ params }: { params: { name: string } }) => {
	const groupId = useSearchParams()?.get("id");

	return (
		<div>
			<Task groupId={Number(groupId)} groupName={params.name} />
		</div>
	);
};

export default GroupTasks;
