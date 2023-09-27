import Link from "next/link";
import React from "react";

const NotAuthorized = () => {
	return (
		<div className="h-screen w-screen flex justify-center items-center text-xl font-bold">
			<span>
				Not Authorized ,Visit{" "}
				<a
					href={"/login"}
					className="underline underline-offset-4 cursor-pointer hover:50"
				>
					{" "}
					Login page
				</a>{" "}
				to Login.
			</span>
		</div>
	);
};

export default NotAuthorized;
