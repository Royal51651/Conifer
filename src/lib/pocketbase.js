import PocketBase from 'pocketbase';
import { ip } from './store.svelte';
// ! VERY IMPORTANT
let pocket = new PocketBase("http://" + ip.ip + ":" + ip.port);
export default pocket;
export const refresh_pocket = () => {
    try {
        pocket = new PocketBase(ip.ip + ":" + ip.port);
    } catch (err) {
        console.log("Error " + err + " logged in pocket.js");
    }
    
}