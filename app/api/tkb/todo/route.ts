import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const todo = z.object({
	courseId: z.number(),
	title: z.string(),
	description: z.string(),
});

export async function GET() {
	try {
		const todos = await prisma.todo.findMany({});
		return NextResponse.json(todos); // ✅ OK: trả về Response
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const data = todo.parse(body);

		await prisma.todo.create({
			data: {
				courseId: data.courseId,
				title: data.title,
				description: data.description,
			},
		});

		return NextResponse.json({ status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
