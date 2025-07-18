/*
  Warnings:

  - You are about to drop the column `semesterId` on the `course` table. All the data in the column will be lost.
  - Added the required column `semester_id` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,
    CONSTRAINT "todo_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_course" (
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
    "semester_id" INTEGER NOT NULL,
    CONSTRAINT "course_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_course" ("course_code", "course_day", "course_name", "course_time", "course_type", "creditNumber", "end_date", "id", "room", "start_date", "teacherName") SELECT "course_code", "course_day", "course_name", "course_time", "course_type", "creditNumber", "end_date", "id", "room", "start_date", "teacherName" FROM "course";
DROP TABLE "course";
ALTER TABLE "new_course" RENAME TO "course";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
