"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const semester = z.object({
	semesterTerm: z.string().transform((val) => val.replaceAll(" ", "")),
});

const prisma = new PrismaClient();

export async function GET() {
	try {
		const semesters = await prisma.semester.findMany();

		return NextResponse.json(semesters, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const data = semester.parse(body);

		await prisma.semester.create({
			data: data,
		});

		return NextResponse.json({
			created: data,
			status: 201,
		});
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
