import cron from 'node-cron';
import fetchMusicData from './Services/Flo/floService';
import fetchGenieMusicData from './Services/Genie/genieService';
import fetchVibeMusicData from './Services/Vibe/vibeService';


fetchGenieMusicData();
fetchVibeMusicData();
fetchFloMusicData();

cron.schedule('0 * * * *', ()=> {
    
    fetchGenieMusicData();
    fetchVibeMusicData();
    fetchFloMusicData();
});