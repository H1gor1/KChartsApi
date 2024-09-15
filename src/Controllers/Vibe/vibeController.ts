import { Music } from "@prisma/client";
import prisma from "../../prismaClient";
import { ChartRepository } from "../../Repositories/chartRepository";

export async function getMusicsVibe(): Promise<Music[]> {

    const chartRepository = new ChartRepository;

    const chart = await chartRepository.getChartByName("Vibe")
    if (!chart) {
        throw new Error('Chart not found');
    }

    const musics = await prisma.chartMusics.findMany({
        where: {
            chartId: chart.id
        },
        include: {
            music: true,
        },
        orderBy: {
            position: 'asc',
        },
    });

    return musics.map((chartMusics) => chartMusics.music);
}

    

export default getMusicsVibe;