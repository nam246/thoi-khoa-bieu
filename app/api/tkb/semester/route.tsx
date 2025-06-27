"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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
		const semester = await prisma.semester.create({
			data: {
				semesterTerm: body.year,
			},
		});

		return NextResponse.json({
			created: semester.semesterTerm,
			status: 201,
		});
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
