import prisma from "../src/prismaClient";

async function main() {
    const charts = await prisma.chart.createMany ({
        data:[{
            chartName: "Flo",
            sourceUrl: "https://api.music-flo.com/display/v1/browser/chart/1/list?mixYn=N"
        },
        {
            chartName: "Genie",
            sourceUrl: "https://app.genie.co.kr/chart/j_RealTimeRankSongList.json"
        },
        {
            chartName: "Vibe",
            sourceUrl: "https://apis.naver.com/vibeWeb/musicapiweb/vibe/v1/chart/track/total.json"
        },
        {
            chartName: "Melon",
            sourceUrl: "https://www.melon.com/chart/index.htm"
        },
        ]
    })

    console.log(`Inserido ${charts.count} Charts`)
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });