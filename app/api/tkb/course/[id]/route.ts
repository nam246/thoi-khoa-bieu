"use server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const courseId = z.preprocess(
	(val) => (typeof val === "string" ? parseInt(val, 10) : val),
	z.number().int().min(0)
);

const courseSchema = z.object({
	id: z.preprocess(
		(val) => (typeof val === "string" ? parseInt(val, 10) : val),
		z.number().int().min(0)
	),
	courseCode: z.string(),
	courseName: z.string(),
	creditNumber: z.preprocess(
		(val) => (typeof val === "string" ? parseInt(val, 10) : val),
		z.number().int().min(0)
	),
	courseType: z.enum(["new", "retake"]),
	room: z.string(),
	teacherName: z.string(),
	courseDay: z.preprocess(
		(val) => (typeof val === "string" ? parseInt(val, 10) : val),
		z.number().int().min(1).max(7)
	),
	courseTime: z.string(),
	startDate: z
		.string()
		.refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" })
		.transform((val) => new Date(val).toISOString()),
	endDate: z
		.string()
		.refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" })
		.transform((val) => new Date(val).toISOString()),
	semesterId: z.number().int(),
});

const prisma = new PrismaClient();

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const body = await req.json();
		const { id } = await params;

		console.log(body);

		const deleteCourse = await prisma.course.delete({
			where: {
				id: courseId.parse(id),
			},
		});

		return NextResponse.json({
			message: "deleted",
			deleted: deleteCourse,
			status: 203,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: error });
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const body = await req.json();
		const data = courseSchema.parse(body);

		const updatedData = await prisma.course.update({
			where: {
				id: data.id,
			},
			data: data,
		});

		if (updatedData) {
			console.log(data);
			console.log("success updated data");
		}

		return NextResponse.json({ message: "success" });
	} catch (error) {
		return NextResponse.json({ error: error });
	}
}
