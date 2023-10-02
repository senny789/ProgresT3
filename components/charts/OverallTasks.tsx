"use client";
import BodyHeader from "@/components/layout/BodyHeader";
import { selectUserId } from "@/store/AuthReducer";
import { trpc } from "@/utils/trpc";

import { useSelector } from "react-redux";
import React, { PureComponent, useState } from "react";

import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	ComposedChart,
	Line,
	Area,
} from "recharts";
import { useIsMedium, useIsSmall } from "@/hooks/useMatchMedia";
import Loading from "@/components/Loading";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
type taskResponse = {
	daily: any;
	weekly: any;
	monthly: any;
	yearly: any;
};
type DataType = "all" | "individual" | "group";
const OverallTasks = () => {
	const userId = useSelector(selectUserId);

	const [dataType, setDataType] = useState<DataType>("all");
	// const { data, isLoading } = trpc.tasks.getTasks.useQuery({ id: userId });
	const getAllTasks = () => trpc.tasks.getTasks.useQuery({ id: userId });
	const getIndividualTasks = () =>
		trpc.tasks.getTasks.useQuery({
			id: userId,

			type: "individual",
		});
	const getGroupTasks = () =>
		trpc.tasks.getTasks.useQuery({ id: userId, type: "group" });
	const { data, isLoading } = getAllTasks();
	const { data: individualData, isLoading: individualIsLoading } =
		getIndividualTasks();
	const { data: groupData, isLoading: groupIsLoading } = getGroupTasks();
	const currentData = (
		dataType === "all"
			? data
			: dataType === "group"
			? groupData
			: individualData
	)?.tasks;
	const ChartData =
		currentData !== undefined
			? Object.keys((currentData as taskResponse) ?? {}).map((tsk) => {
					return {
						name: tsk,
						idle: currentData[tsk as keyof typeof currentData].idle.length,
						ongoing:
							currentData[tsk as keyof typeof currentData].ongoing.length,
						finished:
							currentData[tsk as keyof typeof currentData].finished.length,
						halted: currentData[tsk as keyof typeof currentData].halted.length,
					};
			  })
			: [];
	const user = useSelector((state: any) => state.auth.user);
	const isMedium = useIsMedium();

	return (
		<>
			{" "}
			<BodyHeader
				title={`Welcome to Progres ${user?.username}.`}
				description="This is a place where you come to track and manage your progress in Life."
			/>
			<h2 className="font-semibold">
				Here you will see you overall progress for the tasks you have added.
			</h2>
			<section className="h-[70vh] mt-4 ">
				<section className="flex gap-4">
					{["all", "individual", "group"].map((typ) => (
						<Button
							className={cn(
								dataType === typ
									? "bg-white text-black  border-2 border-black  hover:bg-inherit"
									: ""
							)}
							key={typ}
							onClick={() => setDataType(typ as DataType)}
						>
							{typ}
						</Button>
					))}
				</section>
				<h3 className="font-semibold capitalize mt-4">
					{dataType} Tasks Status:
				</h3>
				{isLoading || individualIsLoading || groupIsLoading ? (
					<Loading />
				) : (
					<ResponsiveContainer className={""} key={dataType}>
						<BarChart
							width={500}
							height={300}
							data={ChartData}
							layout={!isMedium ? "vertical" : "horizontal"}
							margin={{
								top: 20,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							{!isMedium ? (
								<>
									<XAxis type="number" />

									<YAxis dataKey="name" type="category" scale="band" />
								</>
							) : (
								<>
									<XAxis dataKey="name" />
									<YAxis />
								</>
							)}

							<Tooltip />
							<Legend />
							<Bar dataKey="idle" fill="#3A4454" />
							<Bar dataKey="ongoing" fill="#F5EE9E" />
							<Bar dataKey="finished" fill="#0CCE6B" />
							<Bar dataKey="halted" fill="#FF3E41" />
						</BarChart>
					</ResponsiveContainer>
				)}
			</section>
		</>
	);
};

export default OverallTasks;
