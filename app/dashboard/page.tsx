"use client";
import BodyHeader from "@/components/layout/BodyHeader";
import { selectUserId } from "@/store/AuthReducer";
import { trpc } from "@/utils/trpc";

import { useSelector } from "react-redux";
import React, { PureComponent } from "react";

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
import { useIsSmall } from "@/hooks/useMatchMedia";

type taskResponse = {
	daily: any;
	weekly: any;
	monthly: any;
	yearly: any;
};
const vertdata = [
	{
		name: "Page A",
		uv: 590,
		pv: 800,
		amt: 1400,
	},
	{
		name: "Page B",
		uv: 868,
		pv: 967,
		amt: 1506,
	},
	{
		name: "Page C",
		uv: 1397,
		pv: 1098,
		amt: 989,
	},
	{
		name: "Page D",
		uv: 1480,
		pv: 1200,
		amt: 1228,
	},
	{
		name: "Page E",
		uv: 1520,
		pv: 1108,
		amt: 1100,
	},
	{
		name: "Page F",
		uv: 1400,
		pv: 680,
		amt: 1700,
	},
];
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
	const isSmallWindow = useIsSmall();
	return (
		<main>
			<BodyHeader
				title={`Welcome to Progres ${user?.username}.`}
				description="This is a place where you come to track and manage your progress in Life."
			/>
			<h2 className="font-semibold">
				Here you will see you overall progress for the tasks you have added.
			</h2>
			<section className="h-[70vh] mt-4 ">
				<h3 className="font-semibold">Current Tasks Status:</h3>
				<ResponsiveContainer className={""}>
					<BarChart
						width={500}
						height={300}
						data={ChartData}
						layout={!isSmallWindow ? "vertical" : "horizontal"}
						margin={{
							top: 20,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						{!isSmallWindow ? (
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
			</section>
		</main>
	);
}
