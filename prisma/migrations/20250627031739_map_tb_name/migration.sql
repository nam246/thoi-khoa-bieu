/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Semester` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Course";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Semester";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "semester" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semester_term" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "course_code" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "creditNumber" INTEGER NOT NULL,
    "course_type" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "teacherName" TEXT NOT NULL,
    "course_day" INTEGER NOT NULL,
    "course_time" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "semesterId" INTEGER NOT NULL,
    CONSTRAINT "course_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
