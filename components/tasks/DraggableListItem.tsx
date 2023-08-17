import { useDraggable } from "@dnd-kit/core";
import React from "react";

const DraggableListItem = (props: any) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: props.id,
		data: props.data,
	});

	return (
		<div
			ref={setNodeRef}
			className={props.className}
			{...listeners}
			{...attributes}
		>
			{props.children}
		</div>
	);
};

export default DraggableListItem;
