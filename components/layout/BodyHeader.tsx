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
			<h1 className="page-title">{title}</h1>
			<p>{description ?? ""}</p>
		</header>
	);
};

export default BodyHeader;
