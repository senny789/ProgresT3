"use client";
import TaskAddModal from "@/components/TaskModals/TaskAddModal";
import BodyHeader from "@/components/layout/BodyHeader";
import TaskPage from "@/components/tasks/TaskPage";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Task = () => {
	return (
		<div>
			<TaskPage />
		</div>
	);
};

export default Task;
