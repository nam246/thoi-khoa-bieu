"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@/lib/types";
import axios from "axios";

const FormSchema = z.object({
	courseId: z.string(),
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	description: z.string(),
});

export default function TodoForm({ courses }: { courses: Course[] }) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			courseId: "",
			title: "",
			description: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(JSON.stringify(data, null, 2));
		const submitData = {
			...data,
			courseId: parseInt(data.courseId),
		};
		await axios.post("/api/tkb/todo", JSON.stringify(submitData, null, 2));

		toast("You submitted the following values", {
			description: (
				<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 border rounded-md p-4 mb-5"
			>
				<h3 className="text-lg font-medium mb-4">Danh sách việc cần làm</h3>
				<FormField
					control={form.control}
					name="courseId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Việc cần làm của môn?</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Chọn môn học" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{courses.map((course, index) => (
										<SelectItem key={index} value={course.id.toString()}>
											{course.courseName}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tiêu đề</FormLabel>
							<FormControl>
								<Input placeholder="Công việc bạn cần làm là?" {...field} />
							</FormControl>
							<FormDescription>This is your public display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mô tả</FormLabel>
							<FormControl>
								<Textarea placeholder="Mô tả chi tiết công việc" {...field} />
							</FormControl>
							<FormDescription>This is your public display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
