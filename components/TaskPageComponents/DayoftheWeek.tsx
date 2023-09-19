const DayoftheWeek = () => {
	const date = new Date();

	const weekArray = [
		"sunday",
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
	];
	const currentDay = weekArray[date.getDay()];

	return (
		<div className="m-4 text-xl">
			<h2 className="font-bold">Day of the Week:</h2>
			<ul className="flex justify-between flex-wrap capitalize items-center">
				{weekArray.map((week) => {
					return (
						<li
							key={week}
							className={
								currentDay === week
									? " border bg-black text-white shadow-xl rounded p-2"
									: ""
							}
						>
							{week}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default DayoftheWeek;
