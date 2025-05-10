import PocketBase from 'pocketbase';
import { ip } from './store.svelte';
import { push } from 'svelte-spa-router';
// ! VERY IMPORTANT
let pocket = $state({"pocket": new PocketBase("http://" + ip.ip + ":" + ip.port)});
export default pocket;
export const refresh_pocket = () => {
    try {
        pocket.pocket = new PocketBase("http://" + ip.ip + ":" + ip.port);
        push("/");
    } catch (err) {
        console.log("Error " + err + " logged in pocketbase.svelte.js");
    }
}