import axios from 'axios';
import * as cheerio from 'cheerio';
import MusicsRepository from '../../Repositories/musicsRepository';
import { ChartRepository } from '../../Repositories/chartRepository';

interface Music {
  musicName: string;
  artist: string;
  album: string | null;
  imageUrl: string;
}

// Substitua pela URL real do Melon
const url = 'https://www.melon.com/chart/hot100/index.htm'; 

export async function fetchMelonMusicData(): Promise<void> {
  try {
    const musicsRepository = new MusicsRepository();
    const chartRepository = new ChartRepository();

    // Faça a requisição HTTP para obter o HTML do site
    const { data } = await axios.get(url);

    // Carregue o HTML no cheerio
    const $ = cheerio.load(data);

    // Obtenha o ID do gráfico (ajuste conforme necessário)
    const chart = await chartRepository.getChartByName('Melon'); // Ajuste o nome do gráfico
    if (!chart) {
      throw new Error('Chart not found');
    }

    // Extraia dados das linhas <tr> com as classes 'lst50' e 'lst100'
    const musicList: Music[] = [];
    $('.lst50, .lst100').each((index, element) => {
      const $element = $(element);

      // Extraia as informações corretas usando os seletores do XPath fornecido
      const musicName = $element.find('.wrap_song_info .rank01 span a').text().trim();
      const artistName = $element.find('.wrap_song_info .rank02 span').text().trim();
      const albumName = $element.find('.wrap_song_info .rank03 a').text().trim() || null;
      const imageUrl = $element.find('.image_typeAll img').attr('src') || '';

      // Adicione à lista de músicas
      musicList.push({
        musicName,
        artist: artistName,
        album: albumName,
        imageUrl: imageUrl,
      });
    });

    // Armazene as músicas no banco de dados
    await musicsRepository.createMultipleMusics(musicList, chart.id);
    console.log("Musics of melon added to DB!");

  } catch (error) {
    console.error("Error fetching and storing melon music data: ", error);
    throw error;
  }
}

export default fetchMelonMusicData;