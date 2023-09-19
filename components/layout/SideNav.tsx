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
		<section className="h-screen w-[250px] border-r-[1px] shadow-[0px_0px_8px_0px_black] p-8 flex flex-col gap-4">
			<h1 className="font-bold text-4xl ">Progres</h1>
			<ul className="flex flex-col gap-4 mt-10 text-xl">
				<li className="cursor-pointer hover:underline underline-offset-4">
					<Link href={"/dashboard"}>Dashboard</Link>
				</li>
				<li className="cursor-pointer hover:underline underline-offset-4">
					<Link href={"/tasks"}>Tasks</Link>
				</li>
			</ul>
			<span
				className="hover:underline cursor-pointer mt-auto flex font-semibold"
				onClick={() => dispatch(logoutUser())}
			>
				<LogOutIcon /> Logout
			</span>
		</section>
	);
};

export default SideNav;
