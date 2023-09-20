import React from "react";
import Link from "next/link";
const Home = () => {
	return (
		<main className=" h-full flex flex-col">
			<nav className="flex justify-between">
				<Link href="/" className="italic font-bold text-5xl">
					Progres
				</Link>
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
				<p className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide w-full  font-light text-slate-900 ">
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
