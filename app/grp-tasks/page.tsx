"use client";

import GroupAddModal from "@/components/GroupAddModal";
import BodyHeader from "@/components/layout/BodyHeader";
import { Button } from "@/components/ui/button";
import { selectUserId } from "@/store/AuthReducer";
import { trpc } from "@/utils/trpc";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const GroupTaskPage = () => {
	const [open, setOpen] = useState(false);
	const userId = useSelector(selectUserId);
	const groups = trpc.groups.getGroups.useQuery({
		id: userId,
	});
	const groupList = groups?.data?.groups || [];
	return (
		<div>
			<BodyHeader
				title="Group Tasks"
				description="Here you can see your groups and group tasks by going on to each links below where you will be provided to add and edit tasks."
			/>
			<Button onClick={() => setOpen(true)}>
				<PlusIcon />
				Create Group.
			</Button>
			<GroupAddModal open={open} handleOpen={setOpen} />
			<main className="mt-10">
				<h2 className="font-bold text-3xl">Groups:</h2>
				<ul className="text-3xl flex flex-col gap-8 mt-4 justify-center list-disc">
					{groupList.length > 0 &&
						groupList?.map(
							(grp: { id: number; name: string; users: string[] }) => {
								return (
									<li className="link text-2xl" key={grp.name + grp.id}>
										<Link
											href={`/grp-tasks/${grp.name.split(" ").join("")}?id=${
												grp.id
											}`}
										>
											{grp.name}
										</Link>
									</li>
								);
							}
						)}
				</ul>
			</main>
		</div>
	);
};

export default GroupTaskPage;
