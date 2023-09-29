import React from "react";

const BodyHeader = ({
	title,
	description,
}: {
	title: string;
	description?: string;
}) => {
	return (
		<header className="mb-4 flex flex-col gap-4">
			<h1 className="page-title capitalize">{title}</h1>
			<p className="font-semibold">{description ?? ""}</p>
		</header>
	);
};

export default BodyHeader;
