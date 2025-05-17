/*
  Warnings:

  - You are about to drop the column `gitlabbUsername` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EventRecordTypes" AS ENUM ('ProjectUpvote', 'ProjectVote');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "gitlabbUsername",
ADD COLUMN     "gitlabUsername" TEXT;

-- CreateTable
CREATE TABLE "EventRecord" (
    "id" TEXT NOT NULL,
    "entityType" "EventRecordTypes" NOT NULL,
    "entityId" TEXT NOT NULL,

    CONSTRAINT "EventRecord_pkey" PRIMARY KEY ("id")
);
