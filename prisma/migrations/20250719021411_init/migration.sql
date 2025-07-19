-- CreateTable
CREATE TABLE "semester" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semester_term" TEXT NOT NULL,
    "on_going" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "course" (
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

-- CreateTable
CREATE TABLE "todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,
    CONSTRAINT "todo_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
