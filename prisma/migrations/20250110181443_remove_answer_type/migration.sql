/*
  Warnings:

  - You are about to drop the column `letter` on the `Option` table. All the data in the column will be lost.
  - Changed the type of `answer` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "letter";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answer",
ADD COLUMN     "answer" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AnswerOption";
