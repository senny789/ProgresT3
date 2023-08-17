import Link from "next/link";
import React from "react";

const SideNav = () => {
	return (
		<section className="h-screen w-[250px] border-r-[1px] shadow-[0px_0px_8px_0px_black] p-8">
			<h1 className="font-bold text-4xl ">Progres</h1>
			<ul className="flex flex-col gap-4 mt-10 text-xl">
				<li className="cursor-pointer hover:underline underline-offset-4">
					<Link href={"/"}>Dashboard</Link>
				</li>
				<li className="cursor-pointer hover:underline underline-offset-4">
					<Link href={"/tasks"}>Tasks</Link>
				</li>
			</ul>
		</section>
	);
};

export default SideNav;
