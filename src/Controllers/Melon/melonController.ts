import { Music } from "@prisma/client";
import prisma from "../../prismaClient";
import { ChartRepository } from "../../Repositories/chartRepository";

export async function getMusicsMelon(): Promise<Music[]> {

    const chartRepository = new ChartRepository;

    const chart = await chartRepository.getChartByName("Melon")
    if (!chart) {
        throw new Error('Chart not found');
    }

    const musicsMelon = await prisma.chartMusics.findMany({
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

    return musicsMelon.map((chartMusics) => chartMusics.music);
}

    

export default getMusicsMelon;