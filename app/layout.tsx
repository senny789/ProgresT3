"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import SideNav from "@/components/layout/SideNav";
import { cn } from "@/lib/utils";
import Body from "@/components/layout/Body";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import AuthChecker from "@/components/AuthChecker";
import { trpc } from "@/utils/trpc";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Progres",
	description: "Track your progress in life.",
};

function RootLayout({
	children,
	auth,
}: {
	children: React.ReactNode;
	auth: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={cn(inter.className, "flex gap-8 min-h-screen")}>
				<Provider store={store}>
					<AuthChecker
						renderAuth={
							<>
								<Body>{auth}</Body>
							</>
						}
					>
						<SideNav />
						<Body>{children}</Body>

						<Toaster />
					</AuthChecker>
				</Provider>
			</body>
		</html>
	);
}
export default trpc.withTRPC(RootLayout);
