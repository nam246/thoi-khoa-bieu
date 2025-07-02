"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Fixed import
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Trash2, Plus } from "lucide-react";

// Type definitions
import { CourseType } from "@prisma/client";

interface Semester {
	id: number;
	semesterTerm: string;
}

interface Course {
	id: number;
	courseCode: string;
	courseName: string;
	creditNumber: number;
	courseType: CourseType;
	room: string;
	teacherName: string;
	courseDay: string;
	courseTime: string;
	startDate: string;
	endDate: string;
	semesterId: number;
}

interface SemesterFormData {
	year: string;
}

interface CourseFormData {
	courseCode: string;
	courseName: string;
	creditNumber: number;
	courseType: CourseType;
	room: string;
	teacherName: string;
	courseDay: string;
	courseTime: string;
	startDate: string;
	endDate: string;
	semesterId: number | null;
}

export default function Tkb() {
	const [semesters, setSemesters] = useState<Semester[]>([]);
	const [courses, setCourses] = useState<Course[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [semesterFormData, setSemesterFormData] = useState<SemesterFormData>({
		year: "",
	});

	const [courseFormData, setCourseFormData] = useState<CourseFormData>({
		courseCode: "",
		courseName: "",
		creditNumber: 0,
		courseType: CourseType.new,
		room: "",
		teacherName: "",
		courseDay: "",
		courseTime: "",
		startDate: "",
		endDate: "",
		semesterId: null,
	});

	// Fetch data on component mount
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const [semestersRes, coursesRes] = await Promise.all([
					axios.get("/api/tkb/semester"),
					axios.get("/api/tkb"),
				]);

				setSemesters(semestersRes.data);
				setCourses(coursesRes.data);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	// Input handlers
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "year") {
			setSemesterFormData((prev) => ({ ...prev, [name]: value }));
		} else {
			setCourseFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	// Form submission handlers
	const handleSemesterFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!semesterFormData.year.trim()) {
			return; // Prevent empty submission
		}

		try {
			setIsLoading(true);
			await axios.post("/api/tkb/semester", semesterFormData);

			// Refresh data
			const res = await axios.get("/api/tkb/semester");
			setSemesters(res.data);

			// Reset form
			setSemesterFormData({ year: "" });
		} catch (error) {
			console.error("Error submitting semester:", error);
			setError("Không thể tạo học kỳ mới. Vui lòng thử lại.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleCourseFormSubmit = async (
		e: React.FormEvent,
		semesterId: number
	) => {
		e.preventDefault();

		// Form validation
		if (!courseFormData.courseName.trim() || !courseFormData.courseCode.trim()) {
			return; // Prevent incomplete submission
		}

		try {
			setIsLoading(true);
			const reqData = { ...courseFormData, semesterId };
			await axios.post("/api/tkb", reqData);

			// Refresh course data
			const res = await axios.get("/api/tkb");
			setCourses(res.data);

			// Reset form
			setCourseFormData({
				courseCode: "",
				courseName: "",
				creditNumber: 0,
				courseType: CourseType.new,
				room: "",
				teacherName: "",
				courseDay: "",
				courseTime: "",
				startDate: "",
				endDate: "",
				semesterId: null,
			});
		} catch (error) {
			console.error("Error submitting course:", error);
			setError("Không thể thêm môn học. Vui lòng thử lại.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteCourse = async (courseId: number) => {
		try {
			setIsLoading(true);
			await axios.delete(`/api/tkb/${courseId}`);

			// Update local state to reflect deletion
			setCourses((prev) => prev.filter((course) => course.id !== courseId));
		} catch (error) {
			console.error("Error deleting course:", error);
			setError("Không thể xóa môn học. Vui lòng thử lại.");
		} finally {
			setIsLoading(false);
		}
	};

	// Filter courses by semester
	const getCoursesBySemester = (semesterId: number) => {
		return courses.filter((course) => course.semesterId === semesterId);
	};

	// Render loading state
	if (isLoading && semesters.length === 0) {
		return <div className="p-5">Đang tải dữ liệu...</div>;
	}

	// Render error state
	if (error && semesters.length === 0) {
		return <div className="p-5 text-red-500">{error}</div>;
	}

	return (
		<Tabs className="p-5" defaultValue="tkb">
			<TabsList className="mb-4">
				<TabsTrigger value="tkb">Thời khóa biểu</TabsTrigger>
				<TabsTrigger value="todo-list">Todo list</TabsTrigger>
				<TabsTrigger value="take-note">Take note</TabsTrigger>
			</TabsList>

			<TabsContent value="tkb">
				<div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
					<div className="lg:col-span-2">
						<form
							onSubmit={handleSemesterFormSubmit}
							className="flex flex-col border rounded-md p-4 mb-5"
						>
							<h3 className="text-lg font-medium mb-4">Thêm học kỳ mới</h3>
							<div className="mb-4">
								<Label htmlFor="year-course-tab">Niên học</Label>
								<Input
									id="year-course-tab"
									type="text"
									name="year"
									placeholder="Nhập niên học"
									value={semesterFormData.year}
									onChange={handleInputChange}
								/>
							</div>
							<Button className="mt-2" type="submit" disabled={isLoading}>
								{isLoading ? "Đang xử lý..." : "Thêm học kỳ"}
							</Button>
						</form>
					</div>

					<div className="lg:col-span-6">
						{error && (
							<div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{error}</div>
						)}

						{semesters.length > 0 ? (
							semesters.map((semester) => {
								const semesterCourses = getCoursesBySemester(semester.id);

								return (
									<Table key={semester.id} className="mb-8 border">
										<TableCaption>
											Thông tin học phần học kỳ {semester.semesterTerm}
										</TableCaption>
										<TableHeader>
											<TableRow>
												<TableHead className="w-[50px]">STT</TableHead>
												<TableHead>Mã lớp học</TableHead>
												<TableHead>Tên môn học</TableHead>
												<TableHead>Số tín chỉ</TableHead>
												<TableHead>Giáo viên</TableHead>
												<TableHead>Thứ</TableHead>
												<TableHead>Giờ</TableHead>
												<TableHead>Thời gian bắt đầu</TableHead>
												<TableHead>Thời gian kết thúc</TableHead>
												<TableHead>
													<Popover>
														<PopoverTrigger asChild>
															<Button variant="outline" size="sm">
																<Plus className="h-4 w-4" />
															</Button>
														</PopoverTrigger>
														<PopoverContent className="w-80">
															<form
																onSubmit={(e) => handleCourseFormSubmit(e, semester.id)}
																className="space-y-4"
															>
																<h3 className="font-medium">Thêm môn học mới</h3>

																<div>
																	<Label htmlFor="courseCode">Mã môn học</Label>
																	<Input
																		id="courseCode"
																		type="text"
																		name="courseCode"
																		placeholder="Nhập mã môn học"
																		value={courseFormData.courseCode}
																		onChange={handleInputChange}
																	/>
																</div>
																<div>
																	<Label htmlFor="courseName">Tên môn học</Label>
																	<Input
																		id="courseName"
																		type="text"
																		name="courseName"
																		placeholder="Nhập tên môn học"
																		value={courseFormData.courseName}
																		onChange={handleInputChange}
																	/>
																</div>
																<div>
																	<Label htmlFor="courseType">Loại</Label>
																	<Select
																		onValueChange={(value: CourseType) =>
																			setCourseFormData((prev) => ({ ...prev, courseType: value }))
																		}
																	>
																		<SelectTrigger>
																			<SelectValue placeholder="Loại học" />
																		</SelectTrigger>
																		<SelectContent>
																			<SelectItem value="new">Học mới</SelectItem>
																			<SelectItem value="retake">Học lại</SelectItem>
																		</SelectContent>
																	</Select>
																</div>
																<div>
																	<Label htmlFor="creditNumber">Số tín chỉ</Label>
																	<Input
																		id="creditNumber"
																		type="number"
																		name="creditNumber"
																		placeholder="Nhập số tín chỉ"
																		value={courseFormData.creditNumber}
																		onChange={handleInputChange}
																	/>
																</div>
																<div>
																	<Label htmlFor="room">Phòng học</Label>
																	<Input
																		id="room"
																		type="text"
																		name="room"
																		placeholder="Nhập phòng học"
																		value={courseFormData.room}
																		onChange={handleInputChange}
																	/>
																</div>

																<div>
																	<Label htmlFor="teacherName">Giáo viên</Label>
																	<Input
																		id="teacherName"
																		type="text"
																		name="teacherName"
																		placeholder="Nhập tên giáo viên"
																		value={courseFormData.teacherName}
																		onChange={handleInputChange}
																	/>
																</div>
																<div>
																	<Label htmlFor="courseDay">Thứ</Label>
																	<Select
																		onValueChange={(value) =>
																			setCourseFormData((prev) => ({ ...prev, courseDay: value }))
																		}
																	>
																		<SelectTrigger>
																			<SelectValue placeholder="Chọn thứ" />
																		</SelectTrigger>
																		<SelectContent>
																			<SelectItem value="2">Thứ 2</SelectItem>
																			<SelectItem value="3">Thứ 3</SelectItem>
																			<SelectItem value="4">Thứ 4</SelectItem>
																			<SelectItem value="5">Thứ 5</SelectItem>
																			<SelectItem value="6">Thứ 6</SelectItem>
																			<SelectItem value="7">Thứ 7</SelectItem>
																		</SelectContent>
																	</Select>
																</div>
																<div>
																	<Label htmlFor="courseTime">Giờ học</Label>
																	<Input
																		id="courseTime"
																		type="text"
																		name="courseTime"
																		placeholder="VD: 7:30-9:00"
																		value={courseFormData.courseTime}
																		onChange={handleInputChange}
																	/>
																</div>
																<div>
																	<Label htmlFor="startDate">Thời gian bắt đầu</Label>
																	<Input
																		id="startDate"
																		type="date"
																		name="startDate"
																		value={courseFormData.startDate}
																		onChange={handleInputChange}
																	/>
																</div>
																<div>
																	<Label htmlFor="endDate">Thời gian kết thúc</Label>
																	<Input
																		id="endDate"
																		type="date"
																		name="endDate"
																		value={courseFormData.endDate}
																		onChange={handleInputChange}
																	/>
																</div>
																<Button className="w-full" type="submit" disabled={isLoading}>
																	{isLoading ? "Đang xử lý..." : "Thêm môn học"}
																</Button>
															</form>
														</PopoverContent>
													</Popover>
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{semesterCourses.length > 0 ? (
												semesterCourses.map((course, index) => (
													<TableRow key={course.id}>
														<TableCell className="font-medium">{index + 1}</TableCell>
														<TableCell>{course.courseCode}</TableCell>
														<TableCell>{course.courseName}</TableCell>
														<TableCell>{course.creditNumber}</TableCell>
														<TableCell>{course.teacherName}</TableCell>
														<TableCell>
															{course.courseDay ? `Thứ ${course.courseDay}` : ""}
														</TableCell>
														<TableCell>{course.courseTime}</TableCell>
														<TableCell>
															{course.startDate
																? new Date(course.startDate).toLocaleDateString("vi-VN")
																: ""}
														</TableCell>
														<TableCell>
															{course.endDate
																? new Date(course.endDate).toLocaleDateString("vi-VN")
																: ""}
														</TableCell>
														<TableCell>
															<Button
																className="bg-red-500 hover:bg-red-400"
																size="sm"
																onClick={() => handleDeleteCourse(course.id)}
																disabled={isLoading}
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</TableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<TableCell colSpan={10} className="text-center">
														Chưa có môn học nào trong học kỳ này
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								);
							})
						) : (
							<div className="text-center p-8 border rounded">
								<p>Chưa có học kỳ nào. Vui lòng thêm học kỳ trước.</p>
							</div>
						)}
					</div>
				</div>
			</TabsContent>

			<TabsContent value="todo-list">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					<span className="animate-pulse">Tính năng todo list kiểu bảng kanban (Trello, Jira) On going...</span>
				</div>
			</TabsContent>

			<TabsContent value="take-note">
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
					<span className="animate-pulse">Tính năng tạo note, theo Course. Mỗi Course là 1 Note theo từng buổi. Note bằng định dạng markdown.</span>
				</div>
			</TabsContent>
		</Tabs>
	);
}
