import { Chart } from "@prisma/client";
import prisma from "../prismaClient";

export class ChartRepository{
    async getChartByName(name: string): Promise<Chart | null>{
        const chart = await prisma.chart.findFirst({
            where: { chartName: name },
        })

        return chart;
    }
}