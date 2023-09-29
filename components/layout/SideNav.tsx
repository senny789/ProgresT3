"use client";
import { logoutUser } from "@/store/AuthReducer";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const SideNav = () => {
	const dispatch = useDispatch();

	return (
		<section className="h-[50px]  w-screen   md:h-screen md:w-[250px] md:border-r-[1px] shadow-[0px_0px_8px_0px_black] md:shadow-[0px_0px_8px_0px_#aaa] p-8 flex flex-row justify-between items-center md:flex-col gap-4">
			<h1 className="font-bold text-xl md:text-4xl ">Progres</h1>
			<ul className="flex items-center md:items-start md:flex-col gap-4 md:mt-10 text-md md:text-xl">
				<li className="cursor-pointer hover:underline underline-offset-4">
					<Link href={"/dashboard"}>Dashboard</Link>
				</li>
				<li className="cursor-pointer hover:underline underline-offset-4">
					<Link href={"/tasks"}>Tasks</Link>
				</li>
				<li className="cursor-pointer hover:underline underline-offset-4">
					<Link href={"/grp-tasks"}>Group Tasks</Link>
				</li>
			</ul>
			<span
				className="hover:underline cursor-pointer md:mt-auto mt-0 flex font-semibold text-sm"
				onClick={() => dispatch(logoutUser())}
			>
				<LogOutIcon /> Logout
			</span>
		</section>
	);
};

export default SideNav;
