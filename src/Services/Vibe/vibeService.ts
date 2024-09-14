import axios from "axios";
import MusicsRepository from "../../Repositories/musicsRepository";
import { ChartRepository } from "../../Repositories/chartRepository";

interface ApiResponse {
  response: {
    result: {
      chart: {
        id: string;
        items: {
          tracks: Track[];
        };
      };
    };
  };
}

interface Track {
  trackId: number;
  trackTitle: string;
  rank: {
    currentRank: number;
    rankVariation: number;
    isNew: boolean;
  };
  artists: Artist[];
  album: Album;
}

interface Artist {
  artistName: string;
}

interface Album {
  albumTitle: string;
  imageUrl: string;
}

interface Music {
  musicName: string;
  artist: string;
  album: string | null;
  imageUrl: string;
}

const url = 'https://apis.naver.com/vibeWeb/musicapiweb/vibe/v1/chart/track/total.json';

export async function fetchVibeMusicData(): Promise<void> {
  try {
    const musicsRepository = new MusicsRepository();
    const chartRepository = new ChartRepository();

    const response = await axios.get<ApiResponse>(url);
    const tracks = response.data.response.result.chart.items.tracks;

    const chart = await chartRepository.getChartByName('Vibe');
    if (!chart) {
      throw new Error('Chart not found');
    }

    const musicList: Omit<Music, 'id'>[] = tracks.map(track => ({
      musicName: track.trackTitle,
      artist: track.artists.map(artist => artist.artistName).join(', '),
      album: track.album.albumTitle ?? null,
      imageUrl: track.album.imageUrl
    }));

    await musicsRepository.createMultipleMusics(musicList, chart.id);
    console.log("Musics of Vibe added to DB!");

  } catch (error) {
    console.error("Error fetching and storing vibe musics: ", error);
    throw error;
  }
}

export default fetchVibeMusicData;