/*
  Warnings:

  - You are about to drop the `ProjectUpvote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Upvote` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- DropForeignKey
ALTER TABLE "ProjectUpvote" DROP CONSTRAINT "ProjectUpvote_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectUpvote" DROP CONSTRAINT "ProjectUpvote_userId_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_userId_fkey";

-- DropTable
DROP TABLE "ProjectUpvote";

-- DropTable
DROP TABLE "Upvote";

-- CreateTable
CREATE TABLE "Projectvote" (
    "id" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projectvote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Projectvote_userId_projectId_key" ON "Projectvote"("userId", "projectId");

-- AddForeignKey
ALTER TABLE "Projectvote" ADD CONSTRAINT "Projectvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projectvote" ADD CONSTRAINT "Projectvote_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
