import cron from 'node-cron';
import fetchMusicData from './Services/Flo/floService';

fetchMusicData();

cron.schedule('0 * * * *', ()=> {
    fetchMusicData();
});