"use client";
import TaskAddModal from "@/components/TaskModals/TaskAddModal";
import BodyHeader from "@/components/layout/BodyHeader";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Task = () => {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<BodyHeader
				title="Tasks"
				description="Here you can see your tasks by going on to each links below where you will be provided to add and edit tasks."
			/>
			<Button onClick={() => setOpen(true)}>
				<PlusIcon />
				Add Tasks
			</Button>
			<TaskAddModal open={open} handleOpen={setOpen} />

			<main className="mt-10">
				<ul className="text-3xl flex flex-col gap-10 justify-center list-disc">
					<li className="link">
						<Link href="/tasks/daily">Daily</Link>
					</li>
					<li className="link">
						<Link href="/tasks/weekly">Weekly</Link>
					</li>
					<li className="link">
						<Link href="/tasks/monthly">Monthly</Link>
					</li>
					<li className="link">
						<Link href="/tasks/yearly">Yearly</Link>
					</li>
				</ul>
			</main>
		</div>
	);
};

export default Task;
