-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('ongoing', 'finished', 'halted');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('daily', 'weekly', 'monthly', 'yearly');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "type" "TaskType" NOT NULL DEFAULT 'daily',
    "status" "TaskStatus" NOT NULL DEFAULT 'ongoing',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
