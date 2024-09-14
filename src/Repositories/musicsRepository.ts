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

    async createMultipleMusics(musics: Omit<Music, "id">[], chartId: string): Promise<void> {
        // Verificar se as músicas já existem
        const existingTitles = await Promise.all(
            musics.map(music => this.verifyIfMusicExists(music.musicName))
        );
    
        // Filtrar músicas que não existem
        const newMusics = musics.filter((_, index) => !existingTitles[index]);
    
        // Criar as novas músicas no banco de dados
        if (newMusics.length > 0) {
            await this.model.createMany({
                data: newMusics.map(({ musicName, artist, album, imageUrl }) => ({
                    musicName,
                    artist,
                    album,
                    imageUrl,
                })),
            });
        }
    
        // Recuperar todas as músicas (novas e existentes) com os ids
        const allMusicsWithIds = await this.model.findMany({
            where: {
                musicName: {
                    in: musics.map(m => m.musicName),
                },
            },
        });
    
        // Atualizar ChartMusics com as músicas que agora têm seus ids
        await this.updateChartMusics(allMusicsWithIds, chartId);
    }

    private async updateChartMusics(musics: Music[], chartId: string): Promise<void> {
        // Definir o tipo correto de Set para garantir que seja um Set<string>
        const currentMusicIds = new Set<string>(musics.map(m => m.id));
        
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
                    notIn: Array.from(currentMusicIds)  // Certifique-se de que currentMusicIds seja um array de string[]
                }
            }
        });
    }
}

export default MusicsRepository;