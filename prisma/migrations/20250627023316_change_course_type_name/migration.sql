/*
  Warnings:

  - You are about to drop the column `coursetype` on the `Course` table. All the data in the column will be lost.
  - Added the required column `course_type` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
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
    CONSTRAINT "Course_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("course_code", "course_day", "course_name", "course_time", "creditNumber", "end_date", "id", "room", "semesterId", "start_date", "teacherName") SELECT "course_code", "course_day", "course_name", "course_time", "creditNumber", "end_date", "id", "room", "semesterId", "start_date", "teacherName" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
