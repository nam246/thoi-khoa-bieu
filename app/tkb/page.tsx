import { prisma } from "@/lib/prisma"; // Import từ file riêng
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import TodoForm from "@/components/tkb/form/TodoForm";
import AddSemesterForm from "@/components/tkb/form/AddSemesterForm";
import AddCourseForm from "@/components/tkb/form/AddCourseForm";
import DeleteCourseButton from "@/components/tkb/DeleteCourseButton";
import { Trash2, Pencil } from "lucide-react";
import EditCourseButton from "@/components/tkb/EditCourseButton";
import { TimeTable } from "@/components/tkb/TimeTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Tkb() {
	const [semesters, courses, todoList] = await Promise.all([
		prisma.semester.findMany(),
		prisma.course.findMany(),
		prisma.todo.findMany(),
	]);

	const getCoursesBySemester = (semesterId: number) => {
		return courses.filter((course) => course.semesterId === semesterId);
	};

	const getCourseById = (id: number) => {
		return courses.find((course) => course.id === id);
	};

	return (
		<Tabs className="p-5" defaultValue="current-tkb">
			<TabsList className="mb-4">
				<TabsTrigger value="current-tkb">Thời khóa biểu</TabsTrigger>
				<TabsTrigger value="add">Thêm môn học</TabsTrigger>
				<TabsTrigger value="todo-list">Todo list</TabsTrigger>
			</TabsList>

			<TabsContent value="current-tkb">
				<TimeTable />
			</TabsContent>

			<TabsContent value="add">
				<div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
					<div className="lg:col-span-2">
						<AddSemesterForm />
					</div>

					<div className="lg:col-span-6">
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
													<Sheet>
														<SheetTrigger asChild>
															<Button variant="outline">Thêm môn học</Button>
														</SheetTrigger>
														<SheetContent className="overflow-auto">
															<SheetHeader>
																<SheetTitle>Thêm môn học cho học kỳ</SheetTitle>
																<SheetDescription>
																	Make changes to your profile here. Click save when you&apos;re
																	done.
																</SheetDescription>
															</SheetHeader>
															<div className="px-4">
																<AddCourseForm semesterId={semester.id} />
															</div>
															<SheetFooter>
																<SheetClose asChild>
																	<Button variant="outline">Close</Button>
																</SheetClose>
															</SheetFooter>
														</SheetContent>
													</Sheet>
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
														<TableCell className="flex justify-center items-center gap-1">
															<DeleteCourseButton courseId={course.id} />
															<EditCourseButton initialData={course} />
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
				<div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
					<div className="lg:col-span-2">
						<TodoForm courses={courses} />
					</div>
					<div className="lg:col-span-6">
						<div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5">
							{todoList.map((todo, index) => {
								const course = getCourseById(todo.courseId);
								return (
									<Card key={todo.id || index}>
										<CardHeader>
											<CardTitle>{todo.title}</CardTitle>
											<CardDescription></CardDescription>
											<CardAction className="space-x-1">
												<Button className="bg-red-500">
													<Trash2 />
												</Button>
												<Button>
													<Pencil />
												</Button>
											</CardAction>
										</CardHeader>
										<CardContent>
											<p>{todo.description}</p>
										</CardContent>
										<CardFooter>{course ? course.courseName : ""}</CardFooter>
									</Card>
								);
							})}
						</div>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}
