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
import { trpc } from "@/utils/trpc";
import { handleLogin } from "@/lib/authorization";
import { useDispatch } from "react-redux";

const SignupForm = () => {
	const signUpSchema = z.object({
		email: z.string(),
		username: z.string(),
		password: z.string(),
	});
	const dispatch = useDispatch();
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
	});
	const userMutate = trpc.users.createUser.useMutation({
		onSuccess: (data) => {
			handleLogin(dispatch, data);
		},
	});
	const handleSignupSubmit = () => {
		userMutate.mutate({ ...form.getValues() });
	};

	return (
		<section className="py-10 px-4 flex-grow">
			<h2 className="text-4xl font-semibold">Signup</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSignupSubmit)}
					className="flex flex-col gap-4 w-full"
				>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="Enter your username." {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
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
					<Button className="w-fit">Signup</Button>
				</form>
			</Form>
		</section>
	);
};

export default SignupForm;
