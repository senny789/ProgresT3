"use client";
import React, { useEffect, useState } from "react";

const Time = () => {
	const [time, setTime] = useState({
		hour: "",
		minute: "",
		second: "",
	});
	useEffect(() => {
		let interval: any;
		interval = setInterval(() => {
			const date = new Date();
			const seconds = date.getSeconds();
			const hours = date.getHours();
			const minutes = date.getMinutes();
			setTime({
				hour: hours < 10 ? "0" + hours : hours.toString(),
				minute: minutes < 10 ? "0" + minutes : minutes.toString(),
				second: seconds < 10 ? "0" + seconds : seconds.toString(),
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<span className="text-xl my-4 block">
			Current Time of the day:
			<span className=" font-semibold">
				{time.hour}:{time.minute}:{time.second}
			</span>
		</span>
	);
};

export default Time;
