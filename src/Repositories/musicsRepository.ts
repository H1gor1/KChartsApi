import { Music, Chart, ChartMusics } from "@prisma/client";
import BaseRepository from "./BaseRepository/baseRepository";
import prisma from "../prismaClient";

export class MusicsRepository extends BaseRepository<Music> {
    constructor() {
        super(prisma.music);
    }

    async findMusicByTitle(title: string): Promise<Music | null> {
        return await this.model.findUnique({
            where: { musicName: title }
        });
    }

    async verifyIfMusicExists(title: string): Promise<boolean> {
        return await this.model.count({ where: { musicName: title } }) > 0;
    }

    async createMultipleMusics(musics: Music[], chartId: string): Promise<void> {
        // Verificar se as músicas já existem
        const existingTitles = await Promise.all(
            musics.map(music => this.verifyIfMusicExists(music.musicName))
        );

        // Filtrar músicas que não existem
        const newMusics = musics.filter((_, index) => !existingTitles[index]);

        // Criar as novas músicas no banco de dados
        if (newMusics.length > 0) {
            await this.model.createMany({
                data: newMusics
            });
        }

        // Atualizar ChartMusics
        await this.updateChartMusics(musics, chartId);
    }

    private async updateChartMusics(musics: Music[], chartId: string): Promise<void> {
        const currentMusicIds = new Set(musics.map(m => m.id));
    
        // Atualizar ou inserir músicas no ChartMusics
        for (const music of musics) {
            await prisma.chartMusics.upsert({
                where: {
                    chartId_musicId: {
                        chartId,
                        musicId: music.id
                    }
                },
                update: {
                    position: musics.findIndex(m => m.id === music.id) + 1,  // Atualizar a posição conforme a ordem na trackList
                    entryDate: new Date()
                },
                create: {
                    chartId,
                    musicId: music.id,
                    position: musics.findIndex(m => m.id === music.id) + 1,  // Criar com a posição correta
                    entryDate: new Date()
                }
            });
        }
    
        // Excluir músicas do ChartMusics que não estão nas novas músicas
        await prisma.chartMusics.deleteMany({
            where: {
                chartId,
                musicId: {
                    notIn: Array.from(currentMusicIds)
                }
            }
        });
    }
}

export default MusicsRepository;