"use client";
import React from "react";

const MonthYear = ({ type }: { type: "month" | "year" }) => {
	const date = new Date();
	const Month = date.getMonth();
	const Day = date.getDate();
	const monthArray = [
		"January",
		"Feburary",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const currentMonth = monthArray[Month];
	if (type === "month")
		return (
			<section className="my-4">
				<h2 className="font-bold text-xl">Current Month:{currentMonth}</h2>
				<ul className="flex items-center gap-6 flex-wrap ">
					{[...Array(30)].map((day, index) => {
						const currDay = index + 1;

						return (
							<li
								key={"month" + currDay}
								className={`
							${currDay === Day ? "border rounded p-4 text-white bg-black" : ""} ${
									currDay === 30 ? "bg-red-700 rounded p-2 text-white" : ""
								} ${
									currDay === 30 && currDay === Day
										? "border-red-500 bg-black border-4 rounded p-4 text-white"
										: ""
								}

							`}
							>
								{currDay}
							</li>
						);
					})}
				</ul>
			</section>
		);
	else
		return (
			<section className="my-4">
				<h2 className="font-bold text-xl">Months in this year:</h2>
				<ul className="flex items-center gap-6 flex-wrap ">
					{[...Array(12)].map((day, index) => {
						return (
							<li
								className={`${
									currentMonth === monthArray[index]
										? "border rounded p-4 text-white bg-black "
										: ""
								} `}
								key={`year` + monthArray[index]}
							>
								{monthArray[index]}
								{currentMonth === monthArray[index] ? ` : ${Day} ` : null}
							</li>
						);
					})}
				</ul>
			</section>
		);
};

export default MonthYear;
