/*
  Warnings:

  - You are about to drop the column `category` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `financial_goal` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `projects` table. All the data in the column will be lost.
  - Added the required column `image` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedin` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ods` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "category",
DROP COLUMN "deadline",
DROP COLUMN "financial_goal",
DROP COLUMN "location",
DROP COLUMN "status",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT NOT NULL,
ADD COLUMN     "ods" TEXT NOT NULL;
