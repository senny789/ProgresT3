import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
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
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { trpc } from "@/utils/trpc";
import { useSelector } from "react-redux";
import { selectUser, selectUserId } from "@/store/AuthReducer";

const GroupAddModal = ({
	open,
	handleOpen,
}: {
	open: boolean;
	handleOpen: (val: boolean) => void;
}) => {
	const [emailArray, setEmailAray] = useState<string[] | []>([]);

	const utils = trpc.useContext();

	const formSchema = z.object({
		name: z.string(),
		email: z.string().email().nullable(),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const { toast } = useToast();
	const handleEmailAdd = () => {
		const email = form.getValues("email");
		if (
			email !== undefined &&
			email !== null &&
			email !== "" &&
			!form.getFieldState("email").error
		) {
			setEmailAray([...emailArray, email]);
			form.resetField("email");
		}
	};
	const user = useSelector(selectUser);

	const createGroup = trpc.groups.createGroup.useMutation({
		onSuccess: () => {
			toast({
				title: "Group created successfully",
				variant: "success",
			});
			utils.groups.invalidate();
			handleOpen(false);
			setEmailAray([]);
		},
		onError(err) {
			toast({
				title: err.message,
				variant: "destructive",
			});
		},
	});
	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		createGroup.mutate({
			name: values.name,
			users: [user.email, ...emailArray],
		});
	};
	return (
		<Dialog open={open} onOpenChange={handleOpen}>
			<DialogContent className="min-w-fit">
				<DialogHeader>
					<DialogTitle>Create Group</DialogTitle>
					<DialogDescription>
						Create a new group to collaborate with collegues to complete tasks
						together.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Group Name</FormLabel>

									<FormControl>
										<Input placeholder="Enter group name." {...field} />
									</FormControl>
									<FormMessage />

									<FormDescription>Select the category of task</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Group Members</FormLabel>

									<FormControl>
										<span className="flex flex-col gap-4">
											<span className="flex">
												<Input
													placeholder="Enter the email of your collegue ."
													type="email"
													{...field}
												></Input>

												<Button
													className="bg-slate-500"
													type="button"
													onClick={handleEmailAdd}
												>
													<Plus />
												</Button>
											</span>
											<FormMessage />

											<span className="flex flex-wrap gap-2 w-4/5">
												{emailArray.map((em) => (
													<span
														key={em}
														className="border-gray-400 border-2 rounded-sm p-2"
													>
														{em}
													</span>
												))}
											</span>
										</span>
									</FormControl>

									<FormDescription>
										Enter the email address of the users you want to add to the
										group.
									</FormDescription>
									<Button>
										{createGroup.isLoading ? "Loading..." : "Create"}
									</Button>
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default GroupAddModal;
