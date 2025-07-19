"use client";
// import axios from "axios";
// import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function EditCourseButton({ courseId }: { courseId: number }) {
	return (
		<Dialog>
			<DialogTrigger>
				<div className="p-1 rounded text-white cursor-pointer transition-all bg-yellow-500 hover:bg-yellow-400">
					<Pencil className="h-4 w-4" />
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Truyền tham số {courseId} để lấy thông tin course truyền vào</DialogTitle>
					<DialogDescription>
						Khi làm tới nút này, sử component này lại thành Sheet component
					</DialogDescription>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								className="cursor-pointer text-white bg-red-500 hover:bg-red-400"
								size="sm"
							>
								Delete
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
