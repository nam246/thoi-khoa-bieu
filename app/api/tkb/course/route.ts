"use server";

import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const courseSchema = z.object({
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

export async function GET() {
	try {
		const courses = await prisma.course.findMany();
		return NextResponse.json(courses, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const data = courseSchema.parse(body);

		const course = await prisma.course.create({ data: data });

		NextResponse.json({ course: course }, { status: 201 });
		return NextResponse.json({ status: 201 });
	} catch (error) {
		console.log(error);

		return NextResponse.json({ error: error }, { status: 500 });
	}
}
