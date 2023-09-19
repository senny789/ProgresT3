import React from "react";
import Link from "next/link";
const Home = () => {
	return (
		<main className=" h-full flex flex-col">
			<nav className="flex justify-between">
				<h1 className="italic font-bold text-5xl">Progres</h1>
				<ul className="flex gap-4 text-xl font-semibold">
					<li>
						<Link href={"/login"}>Login</Link>
					</li>
					<li>
						<Link href={"/signup"}>Sign Up</Link>
					</li>
				</ul>
			</nav>
			<article className=" flex-grow flex items-center">
				<p className="text-[9rem]  tracking-wide w-3/4  font-light text-slate-900 ">
					<span className="font-semibold text-purple-400">Manage</span> and{" "}
					<span className="font-semibold text-green-400">Track</span> your{" "}
					<span className="font-semibold">tasks</span> in a easy and{" "}
					<span className="font-semibold text-red-400">efficient</span> way.
				</p>
			</article>
		</main>
	);
};

export default Home;
