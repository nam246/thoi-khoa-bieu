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
import { Input } from "@/components/ui/input";
import axios from "axios";

const FormSchema = z.object({
	semesterTerm: z.string().min(2, {
		message: "Không được để trống.",
	}),
});

export default function AddSemesterForm() {
	const semesterFormData = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			semesterTerm: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			await axios.post("/api/tkb/semester", JSON.stringify(data, null, 2));

			semesterFormData.reset();

			toast("Đã thêm học kỳ mới", {
				description: (
					<pre className="mt-2 w-[320px] rounded-md p-4">
						<code className="text-black">{JSON.stringify(data, null, 2)}</code>
					</pre>
				),
			});

			console.log(JSON.stringify(data, null, 2));
		} catch (error) {
			console.error("Error submitting semester:", error);
			toast("Đã có lỗi xảy ra", {
				description: (
					<pre className="mt-2 w-[320px] rounded-md p-4">
						<code className="text-red-500">error</code>
					</pre>
				),
			});

			console.log(JSON.stringify(data, null, 2));
		}
	}

	return (
		<Form {...semesterFormData}>
			<form
				onSubmit={semesterFormData.handleSubmit(onSubmit)}
				className="space-y-6 border rounded-md p-4 mb-5"
			>
				<h3 className="text-lg font-medium mb-4">Thêm học kỳ mới</h3>
				<FormField
					control={semesterFormData.control}
					name="semesterTerm"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Niên học</FormLabel>
							<FormControl>
								<Input placeholder="ex: 2015 - 2016" {...field} />
							</FormControl>
							<FormDescription>This is your public display name.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">
					{semesterFormData.formState.isSubmitting
						? "Đang thêm học kỳ"
						: "Thêm học kỳ"}
				</Button>
			</form>
		</Form>
	);
}
