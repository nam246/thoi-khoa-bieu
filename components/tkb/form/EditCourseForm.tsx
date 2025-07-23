// import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
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
import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FormSchema = z.object({
	id: z.number(),
	courseCode: z.string().min(2, {
		message: "Mã môn học phải có ít nhất 2 ký tự.",
	}),
	courseName: z.string().min(1, {
		message: "Tên môn học không được để trống.",
	}),
	courseType: z.enum(["new", "retake"]),
	creditNumber: z.number().min(1, {
		message: "Số tín chỉ không được để trống.",
	}),
	room: z.string().min(1, {
		message: "Phòng học không được để trống.",
	}),
	teacherName: z.string().min(1, {
		message: "Tên giáo viên không được để trống.",
	}),
	courseDay: z.number(), // Đổi từ number sang string để tương thích với Select
	courseTime: z.string().min(1, {
		message: "Giờ học không được để trống.",
	}),
	startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Ngày bắt đầu không hợp lệ",
	}),
	endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Ngày kết thúc không hợp lệ",
	}),
});

export default function EditCourseForm({
	initialData,
}: {
	initialData: Course;
}) {
	const router = useRouter();

	const courseFormData = useForm({
		// resolver: zodResolver(FormSchema),
		defaultValues: {
			...initialData,
			startDate: initialData.startDate.toISOString().split("T")[0],
			endDate: initialData.endDate.toISOString().split("T")[0],
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		const submitData = JSON.stringify({
			...data,
		});
		const res = await axios.patch(
			`/api/tkb/course/${initialData.id}`,
			submitData
		);
		console.log(res.data);
		if (res.data.message === "success") {
			toast.success("Thêm môn học thành công!", {
				description: (
					<pre className="mt-2 w-[320px] rounded-md p-4">
						<code className="text-black">
							Đã sửa thành công
						</code>
					</pre>
				),
			});
			router.refresh();
		}
	};

	return (
		<Form {...courseFormData}>
			<form className="space-y-4" onSubmit={courseFormData.handleSubmit(onSubmit)}>
				<FormField
					control={courseFormData.control}
					name="courseCode"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mã môn học</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={courseFormData.control}
					name="courseName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên môn học</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={courseFormData.control}
					name="courseType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Loại học</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Chọn loại học" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="new">Học mới</SelectItem>
									<SelectItem value="retake">Học lại</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={courseFormData.control}
					name="creditNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Số tín chỉ</FormLabel>
							<FormControl>
								<Input type="number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={courseFormData.control}
					name="room"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phòng học</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={courseFormData.control}
					name="teacherName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Giáo viên</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={courseFormData.control}
					name="courseDay"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ngày học</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value.toString()}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Học vào thứ mấy?" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="2">Thứ 2</SelectItem>
									<SelectItem value="3">Thứ 3</SelectItem>
									<SelectItem value="4">Thứ 4</SelectItem>
									<SelectItem value="5">Thứ 5</SelectItem>
									<SelectItem value="6">Thứ 6</SelectItem>
									<SelectItem value="7">Thứ 7</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={courseFormData.control}
					name="courseTime"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Giờ học</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={courseFormData.control}
					name="startDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ngày bắt đầu</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={courseFormData.control}
					name="endDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ngày kết thúc</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					disabled={courseFormData.formState.isSubmitting}
					className="w-full"
				>
					{courseFormData.formState.isSubmitting ? "Đang lưu..." : "Lưu lại"}
				</Button>
			</form>
		</Form>
	);
}
