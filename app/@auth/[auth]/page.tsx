"use client";
import React from "react";
import Clock from "@/assets/clock.jpg";
import Image from "next/image";

import { notFound } from "next/navigation";
import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";
const LoginSignup = ({ params }: { params: { auth: string } }) => {
	if (!(params.auth === "login" || params.auth === "signup")) {
		notFound();
	}
	const Auth = params.auth === "login" ? <LoginForm /> : <SignupForm />;
	return (
		<section>
			<nav className="flex justify-between">
				<h1 className="italic font-bold text-5xl">Progres</h1>
			</nav>
			<article className="flex w-full ">
				<span className="w-1/2 flex justify-center items-center">
					<Image
						src={Clock.src}
						height={300}
						width={300}
						alt="Watch Image"
						className="w-3/5 self-center"
					></Image>
				</span>
				{Auth}
			</article>
		</section>
	);
};

export default LoginSignup;
