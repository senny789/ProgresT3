"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import TaskAddModal from "../TaskModals/TaskAddModal";
import BodyHeader from "../layout/BodyHeader";
import { usePathname, useSearchParams } from "next/navigation";

const TaskPage = ({ groupName }: { groupName?: string }) => {
	const [open, setOpen] = useState(false);
	const groupId = useSearchParams()?.get("id");
	const pathname = usePathname();
	console.log(groupName);
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
			<TaskAddModal
				groupId={Number(groupId) ?? undefined}
				open={open}
				handleOpen={setOpen}
			/>

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

export default TaskPage;
