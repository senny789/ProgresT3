import { cn } from "@/lib/utils";
import React from "react";

const Body = ({ children }: { children: React.ReactNode }) => {
	return <div className={cn("p-4 w-full")}>{children}</div>;
};

export default Body;
