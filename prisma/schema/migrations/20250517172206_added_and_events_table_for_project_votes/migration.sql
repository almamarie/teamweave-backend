-- CreateTable
CREATE TABLE "ProjectvoteEvents" (
    "id" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectvoteEvents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectvoteEvents_userId_projectId_key" ON "ProjectvoteEvents"("userId", "projectId");

-- AddForeignKey
ALTER TABLE "ProjectvoteEvents" ADD CONSTRAINT "ProjectvoteEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectvoteEvents" ADD CONSTRAINT "ProjectvoteEvents_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
