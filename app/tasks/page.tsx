"use client";
import TaskAddModal from "@/components/TaskModals/TaskAddModal";
import BodyHeader from "@/components/layout/BodyHeader";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Task = ({
	groupName,
	groupId,
}: {
	groupName?: string;
	groupId?: number;
}) => {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	console.log(pathname);
	return (
		<div>
			<BodyHeader
				title={`${groupName ? groupName : ""} Tasks`}
				description="Here you can see your tasks by going on to each links below where you will be provided to add and edit tasks."
			/>
			<Button onClick={() => setOpen(true)}>
				<PlusIcon />
				Add Tasks
			</Button>
			<TaskAddModal groupId={groupId} open={open} handleOpen={setOpen} />

			<main className="mt-10">
				<ul className="text-3xl flex flex-col gap-10 justify-center list-disc">
					<li className="link">
						<Link href={`${pathname}/daily${groupId ? "?id=" + groupId : ""}`}>
							Daily
						</Link>
					</li>
					<li className="link">
						<Link href={`${pathname}/weekly${groupId ? "?id=" + groupId : ""}`}>
							Weekly
						</Link>
					</li>
					<li className="link">
						<Link
							href={`${pathname}/monthly${groupId ? "?id=" + groupId : ""}`}
						>
							Monthly
						</Link>
					</li>
					<li className="link">
						<Link href={`${pathname}/yearly${groupId ? "?id=" + groupId : ""}`}>
							Yearly
						</Link>
					</li>
				</ul>
			</main>
		</div>
	);
};

export default Task;
