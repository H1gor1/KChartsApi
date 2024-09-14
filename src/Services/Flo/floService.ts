import axios from 'axios';
import MusicsRepository from '../../Repositories/musicsRepository';
import { ChartRepository } from '../../Repositories/chartRepository';

interface ApiResponse {
    data: {
        trackList: Track[];
    };
}

interface Track {
    id: number;
    name: string;
    representationArtist: Artist;
    album: Album;
}

interface Artist {
    name: string;
}

interface Album {
    title: string;
    imgList: Image[];
}

interface Image {
    url: string;
}

// Interface para o modelo Music
interface Music {
    musicName: string;
    artist: string;
    album: string | null;
    imageUrl: string;
}

const url = 'https://api.music-flo.com/display/v1/browser/chart/1/list?mixYn=N';

export async function fetchFloMusicData(): Promise<void> {
    try {
        const musicsRepository = new MusicsRepository();
        const chartRepository = new ChartRepository();

        const response = await axios.get<ApiResponse>(url);
        const tracks = response.data.data.trackList;

        // Obtenha o Chart ID para a inserção
        const chart = await chartRepository.getChartByName('Flo');
        if (!chart) {
            throw new Error('Chart not found');
        }

        const musicList: Omit<Music, 'id'>[] = tracks.map(track => ({
            musicName: track.name,
            artist: track.representationArtist.name,
            album: track.album.title ?? null,
            imageUrl: track.album.imgList.length > 0 ? track.album.imgList[0].url : ''
        }));

        await musicsRepository.createMultipleMusics(musicList, chart.id);
        console.log("Musics of Flo added to DB!");
    } catch (error) {
        console.error("Error to fetch and store flo musics: ", error);
        throw error;
    }
}

export default fetchFloMusicData;