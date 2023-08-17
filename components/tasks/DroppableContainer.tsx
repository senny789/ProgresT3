import React from "react";
import { useDroppable } from "@dnd-kit/core";

function DroppableContainer(props: any) {
	const { isOver, setNodeRef } = useDroppable({
		id: props.id,
	});
	const style = {
		color: isOver ? "green" : undefined,
		opacity: isOver ? 0.7 : undefined,

		borderColor: props.id === "delete" && isOver ? "red" : "",
	};

	return (
		<div ref={setNodeRef} style={style} className={props.className}>
			{props.children}
		</div>
	);
}
export default DroppableContainer;
