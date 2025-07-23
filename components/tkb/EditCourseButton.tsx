"use client";

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
import { Pencil } from "lucide-react";
import EditCourseForm from "./form/EditCourseForm";
import { Course } from "@prisma/client";

export default function EditCourseButton({
	initialData,
}: {
	initialData: Course;
}) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className="p-1 rounded text-white cursor-pointer transition-all bg-yellow-500 hover:bg-yellow-400">
					<Pencil className="h-4 w-4" />
				</div>
			</SheetTrigger>
			<SheetContent className="overflow-auto">
				<SheetHeader>
					<SheetTitle>Sửa môn học</SheetTitle>
					<SheetDescription>
						Make changes to your course here. Click save when you&apos;re done.
					</SheetDescription>
				</SheetHeader>
				<div className="px-4">
					<EditCourseForm initialData={initialData} />
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
