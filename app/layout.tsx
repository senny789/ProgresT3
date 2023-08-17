"use client";
import { trpc } from "@/utils/trpc";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import SideNav from "@/components/layout/SideNav";
import { cn } from "@/lib/utils";
import Body from "@/components/layout/Body";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Progres",
	description: "Track your progress in life.",
};

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn(inter.className, "flex gap-8")}>
				<SideNav />
				<Body>{children}</Body>
				<Toaster />
			</body>
		</html>
	);
}
export default trpc.withTRPC(RootLayout);
