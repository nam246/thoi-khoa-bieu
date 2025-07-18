// Type definitions
import { CourseType } from "@prisma/client";

export interface Semester {
	id: number;
	semesterTerm: string;
}

export interface Course {
	id: number;
	courseCode: string;
	courseName: string;
	creditNumber: number;
	courseType: CourseType;
	room: string;
	teacherName: string;
	courseDay: number;
	courseTime: string;
	startDate: Date;
	endDate: Date;
	semesterId: number;
}

export interface SemesterFormData {
	year: string;
}

export interface CourseFormData {
	courseCode: string;
	courseName: string;
	creditNumber: number;
	courseType: CourseType;
	room: string;
	teacherName: string;
	courseDay: string;
	courseTime: string;
	startDate: string;
	endDate: string;
	semesterId: number | null;
}
