-- CreateTable
CREATE TABLE "public"."Whiteboard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Whiteboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Line" (
    "id" TEXT NOT NULL,
    "points" JSONB NOT NULL,
    "color" TEXT NOT NULL,
    "strokeWidth" INTEGER NOT NULL,
    "tool" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,

    CONSTRAINT "Line_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Line" ADD CONSTRAINT "Line_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Whiteboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
