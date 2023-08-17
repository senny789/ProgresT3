"use client";
import BodyHeader from "@/components/layout/BodyHeader";
import { trpc } from "@/utils/trpc";
import { configureStore } from "@reduxjs/toolkit";
import { useEffect } from "react";

export default function Home() {
	return (
		<main>
			<BodyHeader title="Welcome to Progres" description="" />
		</main>
	);
}
