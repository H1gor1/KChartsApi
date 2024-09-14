-- CreateTable
CREATE TABLE "musics" (
    "id" TEXT NOT NULL,
    "music_name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "musics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charts" (
    "id" TEXT NOT NULL,
    "chart_name" TEXT NOT NULL,
    "source_url" TEXT NOT NULL,

    CONSTRAINT "charts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chart_musics" (
    "id" TEXT NOT NULL,
    "chartId" TEXT NOT NULL,
    "musicId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chart_musics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chart_musics" ADD CONSTRAINT "chart_musics_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "charts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chart_musics" ADD CONSTRAINT "chart_musics_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "musics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
