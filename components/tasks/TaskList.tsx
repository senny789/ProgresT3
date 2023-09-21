"use client";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import DroppableContainer from "./DroppableContainer";
import DraggableListItem from "./DraggableListItem";
import TaskAddModal from "../TaskModals/TaskAddModal";

import { trpc } from "@/utils/trpc";
import { createPortal } from "react-dom";

import { Task, TaskType } from "@prisma/client";
export type Status = "idle" | "ongoing" | "finished" | "halted";
const ListItem = ({ tsk, type, isVisible }: any) => {
	if (tsk !== undefined)
		return (
			<DraggableListItem
				className={
					" bg-white p-2 z-10 h-fit min-w-fit   rounded-md border-2 shadow-md "
				}
				id={tsk.id}
				data={type}
			>
				<h1 className="font-bold">
					{tsk.title.length > 15 ? tsk.title.slice(0, 15) + "..." : tsk.title}
				</h1>
				<span>{tsk.description}</span>
			</DraggableListItem>
		);
};
const DragedItem = ({ tsk }: any) => {
	if (tsk !== undefined)
		return (
			<div
				className={
					" bg-white p-2 z-10 min-w-fit  rounded-md border-2 shadow-md "
				}
			>
				<h1 className="font-bold">{tsk.title}</h1>
				<span>{tsk.description}</span>
			</div>
		);
};

const TaskList = ({ taskList, type }: { taskList: Task[]; type: TaskType }) => {
	const [tasks, setTasks] = useState({
		ongoing: [] as any,
		idle: [] as any,
		finished: [] as any,
		halted: [] as any,
	});

	const status = ["idle", "ongoing", "finished", "halted"];
	const [deleteDragged, setDeleteDragged] = useState<any>();
	useEffect(() => {
		setTasks({
			ongoing: taskList?.filter((tsk) => {
				return tsk.status === "ongoing";
			}),
			idle: taskList?.filter((tsk) => {
				return tsk.status === "idle";
			}),
			finished: taskList?.filter((tsk) => {
				return tsk.status === "finished";
			}),
			halted: taskList?.filter((tsk) => {
				return tsk.status === "halted";
			}),
		});
	}, [taskList]);
	const [isDragging, setIsDragging] = useState(false);
	const [modal, setModal] = useState({
		status: "idle",
		open: false,
	});
	const [draggedTask, setDraggedTask] = useState<any>();
	const handleModalOpen = (val: boolean) => {
		setModal({
			...modal,
			open: val,
		});
	};
	const handleModalChange = (stat: string) => {
		setModal({ status: stat, open: true });
	};

	const [updateModal, setUpdateModal] = useState({
		isOpen: false,
		id: 0,
	});
	const [deleteModal, setDeleteModal] = useState({
		isOpen: false,
		id: 0,
	});
	const mutateTask = trpc.tasks.updateTaskStatus.useMutation({
		onSuccess: () => {
			utils.tasks.getTasks.invalidate();
			utils.tasks.getDailyTasks.invalidate();
			utils.tasks.getWeeklyTasks.invalidate();
			utils.tasks.getMonthlyTasks.invalidate();
			utils.tasks.getYearlyTasks.invalidate();
			setUpdateModal({
				id: 0,
				isOpen: false,
			});
		},
	});
	const deleteTask = trpc.tasks.deleteTask.useMutation({
		onSuccess: () => {
			utils.tasks.getTasks.invalidate();
			utils.tasks.getDailyTasks.invalidate();
			utils.tasks.getWeeklyTasks.invalidate();
			utils.tasks.getMonthlyTasks.invalidate();
			utils.tasks.getYearlyTasks.invalidate();
			setDeleteModal({
				id: 0,
				isOpen: false,
			});
		},
	});
	const handleUpdate = (stat: any) => {
		mutateTask.mutate({
			id: updateModal.id,
			status: stat,
		});
	};
	const handleDelete = () => {
		deleteTask.mutate(deleteModal.id);
	};
	const taskRenderer = (type: string) => {
		let currentTasks;
		switch (type) {
			case "idle":
				currentTasks = tasks.idle;
				break;
			case "ongoing":
				currentTasks = tasks.ongoing;
				break;
			case "finished":
				currentTasks = tasks.finished;
				break;
			case "halted":
				currentTasks = tasks.halted;
				break;
			default:
				return;
		}
		return currentTasks?.map((tsk: any, index: number) => {
			return <ListItem key={type + tsk.id + index} tsk={tsk} type={type} />;
		});
	};

	const cardColor = {
		idle: {
			border: " border-[#3A4454] ",
			title: "  ",
		},
		ongoing: {
			border: "border-[#F5CE9E] ",
			title: "text-orange-500  ",
		},
		finished: {
			border: "border-[#0CCE6B] ",
			title: "text-green-500  ",
		},
		halted: {
			border: "border-[#FF3E41] ",
			title: "text-red-500  ",
		},
	};

	function handleDragOver(event: any) {
		let activeCard = event.active.data.current;
		let overCard = event.over.id;

		if (!activeCard || !overCard || activeCard === overCard) return;
		if (event.over.id !== "delete") {
			setTasks((curr: any) => {
				return {
					...curr,
					[activeCard]: [
						...curr[activeCard].filter(
							(tsk: any) => tsk.id !== draggedTask?.id
						),
					],
					[overCard]: [...curr[overCard], draggedTask],
				};
			});

			setDeleteDragged(undefined);
		} else if (event.over.id === "delete") {
			setDeleteDragged(draggedTask);
		}
	}
	function handleDragEnd(event: any) {
		const { over } = event;
		if (over.id === "delete") {
			handleDelete();
		} else {
			handleUpdate(over.id);
		}
		setIsDragging(false);
		setDeleteDragged(undefined);
	}
	function handleDragStart(event: any) {
		setIsDragging(true);
		setDraggedTask(
			tasks[event.active.data.current as keyof typeof tasks].find(
				(tsk: any) => tsk.id === event.active.id
			)
		);

		setDeleteModal({
			...deleteModal,
			id: event.active.id,
		});
		setUpdateModal({
			...updateModal,
			id: event.active.id,
		});
	}

	const utils = trpc.useContext();
	const renderTaskList = status.map((stat) => {
		return (
			<DroppableContainer
				key={stat}
				id={stat}
				className={cn(
					"border-2 w-full h-[30vh] md:h-[70vh] md:w-1/4 flex-grow rounded-3xl text-xl p-5 shadow-2xl relative overflow-hidden "
					// cardColor[stat as keyof typeof cardColor].border
				)}
			>
				<h2
					className={cn(
						"text-center font-bold capitalize after:content-[':'] ",
						cardColor[stat as keyof typeof cardColor].title
					)}
				>
					{stat}
				</h2>

				<ul className="mt-4  h-[75%] flex flex-col gap-4 max-w-full overflow-y-scroll">
					{taskRenderer(stat)}
				</ul>
				<button
					className="absolute bottom-0 left-0 right-0 p-4  rounded-[inherit] bg-slate-200 hover:opacity-50 z-20"
					onClick={() => {
						handleModalChange(stat);
					}}
				>
					<PlusIcon className="m-auto" />
				</button>
			</DroppableContainer>
		);
	});
	return (
		<div>
			<DndContext
				onDragEnd={handleDragEnd}
				collisionDetection={closestCenter}
				onDragOver={handleDragOver}
				onDragStart={handleDragStart}
			>
				<div className="flex flex-col md:flex-row gap-8 w-full  ">
					{renderTaskList}
				</div>
				{isDragging ? (
					<DroppableContainer
						key={"delete"}
						id={"delete"}
						className={cn(
							"border-2 rounded-3xl text-xl p-2  absolute top-0 right-10 h-[20vh]  w-[30vw] bg-white"
						)}
					>
						<h2
							className={cn("text-center font-bold capitalize", "text-red-400")}
						>
							Delete item
						</h2>
						<DragedItem tsk={deleteDragged} />
					</DroppableContainer>
				) : null}

				{createPortal(
					<DragOverlay>
						{isDragging && draggedTask !== undefined ? (
							<DragedItem tsk={draggedTask} />
						) : null}
					</DragOverlay>,
					document.body
				)}
			</DndContext>

			<TaskAddModal
				type={{
					type: type as any,
					status: modal.status as any,
				}}
				open={modal.open}
				handleOpen={handleModalOpen}
			/>
		</div>
	);
};

export default TaskList;
