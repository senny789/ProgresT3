"use client";
import React from "react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { trpc } from "@/utils/trpc";

import { useDispatch } from "react-redux";
import { loginUser } from "@/store/AuthReducer";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/lib/authorization";
const LoginForm = () => {
	const loginSchema = z.object({
		email: z.string(),
		password: z.string(),
	});
	const dispatch = useDispatch();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	});
	const router = useRouter();
	const loginMutate = trpc.users.loginUser.useMutation({
		onSuccess: (data) => {
			handleLogin(dispatch, data);
		},
	});
	const handleLoginSubmit = () => {
		loginMutate.mutate({
			...form.getValues(),
		});
	};

	return (
		<section className="py-10 px-4 flex-grow">
			<h2 className="text-4xl font-semibold">Login</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleLoginSubmit)}
					className="flex flex-col gap-4 w-full"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Enter your email address." {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your password."
										type="password"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-fit">Login</Button>
				</form>
			</Form>
			<p>
				Dont have an account?{" "}
				<Link href={"/signup"} className="hover:opacity-50">
					Create an account
				</Link>
			</p>
		</section>
	);
};

export default LoginForm;
