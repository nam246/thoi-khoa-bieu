"use client";
import axios from "axios";
import { toast } from "sonner";
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
import { Trash2 } from "lucide-react";

export default function DeleteCourseButton({ courseId }: { courseId: number }) {
	const handleDeleteCourse = async (courseId: number) => {
		try {
			await axios.delete(`/api/tkb/course/${courseId}`);
			console.log("deleted", courseId);
			toast("You submitted the following values", {
				description: (
					<div className="mt-2 w-[320px] rounded-md p-4">
						<p>Deleted {courseId}</p>
					</div>
				),
			});
		} catch (error) {
			console.error("Error deleting course:", error);
			toast("You submitted the following values", {
				description: (
					<div className="mt-2 w-[320px] rounded-md p-4">
						<p>Error deleting course</p>
					</div>
				),
			});
		} finally {
		}
	};
	return (
		<Dialog>
			<DialogTrigger>
				<div className="p-1 rounded text-white cursor-pointer transition-all bg-red-500 hover:bg-red-400">
					<Trash2 className="h-4 w-4" />
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your current
						course in this semester and remove your data from database.
					</DialogDescription>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								className="cursor-pointer text-white bg-red-500 hover:bg-red-400"
								size="sm"
								onClick={() => handleDeleteCourse(courseId)}
								// disabled={isLoading}
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
