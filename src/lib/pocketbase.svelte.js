import PocketBase from 'pocketbase';
import { ip } from './store.svelte';
// ! VERY IMPORTANT
let pocket = $state({"pocket": new PocketBase("http://" + ip.ip + ":" + ip.port)});
export default pocket;
export const refresh_pocket = () => {
    try {
        pocket.pocket = new PocketBase("http://" + ip.ip + ":" + ip.port);
    } catch (err) {
        console.log("Error " + err + " logged in pocketbase.svelte.js");
    }
}