import React from "react";
import { VscLoading } from "react-icons/vsc";
const Loading = () => {
	return (
		<div className="h-screen w-screen flex justify-center items-center text-xl font-bold">
			<span className="loading text-3xl">
				<VscLoading />
			</span>{" "}
			Loading...
		</div>
	);
};

export default Loading;
