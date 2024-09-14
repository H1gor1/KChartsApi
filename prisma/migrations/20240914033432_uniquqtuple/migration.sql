/*
  Warnings:

  - A unique constraint covering the columns `[chartId,musicId]` on the table `chart_musics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chart_musics_chartId_musicId_key" ON "chart_musics"("chartId", "musicId");
