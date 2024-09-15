import cron from 'node-cron';
import fetchFloMusicData from './Services/Flo/floService';
import fetchGenieMusicData from './Services/Genie/genieService';
import fetchVibeMusicData from './Services/Vibe/vibeService';
import fetchMelonMusicData from './Services/Melon/melonService';
import prisma from './prismaClient';

// Função para executar as três chamadas sequencialmente
async function fetchAllMusicDataSequentially() {
    try {
        await prisma.chartMusics.deleteMany(); //temporary fix
        await fetchGenieMusicData();
        await fetchVibeMusicData();
        await fetchFloMusicData();
        await fetchMelonMusicData();
    } catch (error) {
        console.error('Erro ao buscar os dados de música:', error);
    }
}

// Executa imediatamente na inicialização
fetchAllMusicDataSequentially();

// Agenda o cron job para rodar a cada hora
cron.schedule('0 * * * *', async () => {
    console.log('Executando o cron job de busca de dados de música...');
    await fetchAllMusicDataSequentially();
});