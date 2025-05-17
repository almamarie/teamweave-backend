/*
  Warnings:

  - Added the required column `visibility` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "visibility" "ProjectVisibility" NOT NULL;
