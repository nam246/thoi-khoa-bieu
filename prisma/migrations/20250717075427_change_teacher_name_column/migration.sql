/*
  Warnings:

  - You are about to drop the column `teacherName` on the `course` table. All the data in the column will be lost.
  - Added the required column `teacher_name` to the `course` table without a default value. This is not possible if the table is not empty.

*/
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
    "teacher_name" TEXT NOT NULL,
    "course_day" INTEGER NOT NULL,
    "course_time" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "semester_id" INTEGER NOT NULL,
    CONSTRAINT "course_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_course" ("course_code", "course_day", "course_name", "course_time", "course_type", "creditNumber", "end_date", "id", "room", "semester_id", "start_date") SELECT "course_code", "course_day", "course_name", "course_time", "course_type", "creditNumber", "end_date", "id", "room", "semester_id", "start_date" FROM "course";
DROP TABLE "course";
ALTER TABLE "new_course" RENAME TO "course";
CREATE TABLE "new_semester" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semester_term" TEXT NOT NULL,
    "on_going" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_semester" ("id", "semester_term") SELECT "id", "semester_term" FROM "semester";
DROP TABLE "semester";
ALTER TABLE "new_semester" RENAME TO "semester";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
