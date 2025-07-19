"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

const FormSchema = z.object({
	courseCode: z.string().min(2, {
		message: "Mã môn học phải có ít nhất 2 ký tự.",
	}),
	courseName: z.string().min(1, {
		message: "Tên môn học không được để trống.",
	}),
	courseType: z.enum(["new", "retake"]),
	creditNumber: z.string().min(1, {
		message: "Số tín chỉ không được để trống.",
	}),
	room: z.string().min(1, {
		message: "Phòng học không được để trống.",
	}),
	teacherName: z.string().min(1, {
		message: "Tên giáo viên không được để trống.",
	}),
	courseDay: z.string(), // Đổi từ number sang string để tương thích với Select
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

export default function AddCourseForm({ semesterId }: { semesterId: number }) {
	const courseFormData = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			courseCode: "",
			courseName: "",
			courseType: "new",
			creditNumber: "0",
			room: "",
			teacherName: "",
			courseDay: "2", // Đổi từ number sang string
			courseTime: "",
			startDate: "",
			endDate: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			// Chuyển đổi dữ liệu trước khi gửi API
			const submitData = {
				...data,
				courseDay: parseInt(data.courseDay), // Chuyển về number cho API
				creditNumber: parseInt(data.creditNumber), // Chuyển về number cho API
				semesterId: semesterId,
			};
			console.log("submitted data", submitData);

			// Gọi API để thêm course
			await axios.post("/api/tkb/course", JSON.stringify(submitData));

			toast.success("Thêm môn học thành công!", {
				description: `Đã thêm môn học ${data.courseName}`,
			});

			// Reset form sau khi thêm thành công
			courseFormData.reset();
		} catch (error) {
			console.error("Error adding course:", error);

			let errorMessage = "Có lỗi xảy ra khi thêm môn học";

			if (axios.isAxiosError(error)) {
				errorMessage = error.response?.data?.message || error.message;
			}

			toast.error("Lỗi!", {
				description: errorMessage,
			});
		}
	}

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
								<Input placeholder="ex: IT001" {...field} />
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
								<Input placeholder="ex: Cấu trúc dữ liệu và giải thuật" {...field} />
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
								<Input placeholder="Số tín chỉ môn học" type="number" {...field} />
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
								<Input placeholder="ex: P102" {...field} />
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
								<Input placeholder="ex: Trần Văn A" {...field} />
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
							<Select onValueChange={field.onChange} defaultValue={field.value}>
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
								<Input placeholder="ex: 7:30-9:00" {...field} />
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
					{courseFormData.formState.isSubmitting ? "Đang thêm..." : "Thêm môn học"}
				</Button>
			</form>
		</Form>
	);
}
