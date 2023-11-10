import * as React from "react";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";

export function Email(props: any) {
	return (
		<Html lang="en">
			<a
				href={"https://progres1.netlify.app/"}
				style={{ color: "#61dafb", background: "red" }}
			>
				Click me
			</a>
		</Html>
	);
}

export default Email;
