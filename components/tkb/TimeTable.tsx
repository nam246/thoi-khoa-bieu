import { prisma } from "@/lib/prisma";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export async function TimeTable() {
	const courses = await prisma.course.findMany({});

	const currentCourses = courses.filter((course) => {
		const currentDate = new Date();
		const endDate = new Date(course.endDate);

		if (endDate >= currentDate) return course;
	});

	function formatTimeRemaining(endDate: Date) {
		const now = new Date();
		const difference = +endDate - +now;

		if (difference <= 0) {
			return "Đã hết hạn";
		}

		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		const hours = Math.floor(
			(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		// const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		// const seconds = Math.floor((difference % (1000 * 60)) / 1000);

		const result = [];
		if (days > 0) result.push(`${days} ngày`);
		if (hours > 0) result.push(`${hours} giờ`);
		// if (minutes > 0) result.push(`${minutes} phút`);
		// if (seconds > 0) result.push(`${seconds} giây`);

		return result.join(" ");
	}

	return (
		<Table>
			<TableCaption>Môn học học kỳ này.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Thứ</TableHead>
					<TableHead>Mã môn học</TableHead>
					<TableHead>Tên môn học</TableHead>
					<TableHead>Giảng viên</TableHead>
					<TableHead>Phòng học</TableHead>
					<TableHead className="text-right">Thời gian kết thúc</TableHead>
					<TableHead className="text-right">Còn lại</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{currentCourses?.map((course) => (
					<TableRow key={course.id}>
						<TableCell className="font-medium">{course.courseDay}</TableCell>
						<TableCell>{course.courseCode}</TableCell>
						<TableCell>{course.courseName}</TableCell>
						<TableCell>{course.courseName}</TableCell>
						<TableCell>{course.room}</TableCell>
						<TableCell className="text-right">
							{course.endDate.toLocaleDateString("en-GB")}
						</TableCell>
						<TableCell className="text-right">
							{course.endDate ? formatTimeRemaining(course.endDate) : ""}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={6}>Học kỳ này có</TableCell>
					<TableCell className="text-right">
						{currentCourses.length} Môn học
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
