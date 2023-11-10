"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import TaskAddModal from "../TaskModals/TaskAddModal";
import BodyHeader from "../layout/BodyHeader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { trpc } from "@/utils/trpc";
import { useToast } from "../ui/use-toast";

const TaskPage = ({ groupName }: { groupName?: string }) => {
	const [open, setOpen] = useState(false);
	const [deleteGrp, setDeleteGrp] = useState(false);
	const utils = trpc.useContext();
	const router = useRouter();
	const { toast } = useToast();
	const deleteGroupMutation = trpc.groups.deleteGroup.useMutation({
		onSuccess: () => {
			utils.groups.invalidate();
			setDeleteGrp(false);
			toast({
				variant: "success",
				description: "Group Deleted Successfully",
			});
			router.back();
		},
	});

	const groupId = useSearchParams()?.get("id");
	const pathname = usePathname();
	const handleDelete = () => {
		deleteGroupMutation.mutate(Number(groupId));
	};
	return (
		<div>
			<BodyHeader
				title={`${groupName ? groupName : ""} Tasks`}
				description="Here you can see your tasks by going on to each links below where you will be provided to add and edit tasks."
			/>
			<span className="flex items-center gap-4">
				<Button onClick={() => setOpen(true)}>
					<PlusIcon />
					Add Tasks
				</Button>
				{groupId ? (
					<Button className="bg-red-500" onClick={() => setDeleteGrp(true)}>
						Delete Group
					</Button>
				) : null}
			</span>
			<TaskAddModal
				groupId={groupId !== null ? Number(groupId) : undefined}
				open={open}
				handleOpen={setOpen}
			/>
			<Dialog open={deleteGrp} onOpenChange={() => setDeleteGrp(false)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Group?</DialogTitle>
						<DialogDescription>
							Do you want to delete the selected group?
						</DialogDescription>
					</DialogHeader>
					<span className="flex gap-4 justify-end">
						<Button className="bg-red-500 w-fit" onClick={handleDelete}>
							Delete
						</Button>
						<DialogClose>
							<Button>Cancel</Button>
						</DialogClose>
					</span>
				</DialogContent>
			</Dialog>
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
