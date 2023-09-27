"use client";
import {
	authorizeUser,
	logoutUser,
	selectUserId,
	updateUser,
} from "@/store/AuthReducer";
import { trpc } from "@/utils/trpc";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import NotAuthorized from "./NotAuthorized";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const AuthChecker = ({
	children,
	renderAuth,
}: {
	children: React.ReactNode;
	renderAuth: React.ReactNode;
}) => {
	const isAuthorized = trpc.users.testAuth.useQuery();
	const getUser = trpc.users.getUser.useQuery();
	const pathName = usePathname();
	const router = useRouter();
	const authorized = useSelector((state: any) => state.auth.authorized);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isAuthorized.isSuccess) {
			dispatch(authorizeUser());
			// console.log("test");
			if (pathName === "/login" || pathName === "/signup") {
				location.href = "/dashboard";
			} else if (pathName === "/") {
				location.href = "/dashboard";
			}
		}
		if (
			pathName !== "/" &&
			pathName !== "/login" &&
			pathName !== "/signup" &&
			isAuthorized.isError
		) {
			dispatch(logoutUser());
		}
	}, [pathName, isAuthorized.data]);
	useEffect(() => {
		if (getUser.isSuccess) {
			dispatch(updateUser({ user: getUser.data }));
		}
	}, [getUser.data]);

	const AuthRender = authorized ? (
		children
	) : pathName !== "/" && pathName !== "/login" && pathName !== "/signup" ? (
		isAuthorized.isLoading ? (
			<Loading />
		) : (
			<>
				<NotAuthorized />
			</>
		)
	) : (
		renderAuth
	);
	return <>{AuthRender}</>;
};

export default AuthChecker;
