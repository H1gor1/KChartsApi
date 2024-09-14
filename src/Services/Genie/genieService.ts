import axios from "axios";
import MusicsRepository from "../../Repositories/musicsRepository";
import { ChartRepository } from "../../Repositories/chartRepository";

interface ApiResponse {
    DataSet: {
        DATA: Track[];
    };
}

interface Track {
    SONG_ID: string;
    SONG_NAME: string;
    ARTIST_NAME: string;
    ALBUM_NAME: string;
    ALBUM_IMG_PATH: string;
}

interface Music {
    musicName: string;
    artist: string;
    album: string | null;
    imageUrl: string;
}

const url= 'https://app.genie.co.kr/chart/j_RealTimeRankSongList.json'

export async function fetchGenieMusicData(): Promise<void> {
    try {
        const musicsRepository = new MusicsRepository();
        const chartRepository = new ChartRepository();

        const response = await axios.get<ApiResponse>(url);
        const tracks = response.data.DataSet.DATA;

        const chart = await chartRepository.getChartByName('Genie');
        if (!chart) {
            throw new Error('Chart not found');
        }

        const musicList: Omit<Music, 'id'>[] = tracks.map(track => ({
            musicName: track.SONG_NAME,
            artist: track.ARTIST_NAME,
            album: track.ALBUM_NAME ?? null,
            imageUrl: decodeURIComponent(track.ALBUM_IMG_PATH)
        }));

        await musicsRepository.createMultipleMusics(musicList, chart.id);
        console.log("Musics of Genie added to DB!");

    } catch (error) {
        console.error("Error to fetch and store genie musics: ", error);
        throw error;
    }
}

export default fetchGenieMusicData;