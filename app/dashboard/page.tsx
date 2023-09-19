"use client";
import BodyHeader from "@/components/layout/BodyHeader";
import { selectUserId } from "@/store/AuthReducer";
import { trpc } from "@/utils/trpc";
import { Task } from "@prisma/client";
import { configureStore } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector } from "react-redux";
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
} from "recharts";

type taskResponse = {
	daily: any;
	weekly: any;
	monthly: any;
	yearly: any;
};
export default function Home() {
	const userId = useSelector(selectUserId);
	const { data } = trpc.tasks.getTasks.useQuery({ id: userId });
	const ChartData = Object.keys((data?.tasks as taskResponse) ?? {}).map(
		(tsk) => {
			return {
				name: tsk,
				idle: data?.tasks[tsk as keyof typeof data.tasks].idle.length,
				ongoing: data?.tasks[tsk as keyof typeof data.tasks].ongoing.length,
				finished: data?.tasks[tsk as keyof typeof data.tasks].finished.length,
				halted: data?.tasks[tsk as keyof typeof data.tasks].halted.length,
			};
		}
	);
	const user = useSelector((state: any) => state.auth.user);

	return (
		<main>
			<BodyHeader
				title={`Welcome to Progres ${user?.username}.`}
				description="This is a place where you come to track and manage your progress in Life."
			/>
			<h2 className="font-semibold">
				Here you will see you overall progress for the tasks you have added.
			</h2>
			<section className="h-[60vh] mt-4 ">
				<h3 className="font-semibold">Current Tasks Status:</h3>
				<ResponsiveContainer width="90%" height="100%" className={"m-auto"}>
					<BarChart
						width={500}
						height={300}
						data={ChartData}
						margin={{
							top: 20,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="idle" fill="#3A4454" />
						<Bar dataKey="ongoing" fill="#F5EE9E" />
						<Bar dataKey="finished" fill="#0CCE6B" />
						<Bar dataKey="halted" fill="#FF3E41" />
					</BarChart>
				</ResponsiveContainer>
			</section>
		</main>
	);
}
