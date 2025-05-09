import PocketBase from 'pocketbase';
import { store } from './store.svelte';
// ! VERY IMPORTANT
// ! 
let pocket = new PocketBase("http://" + store.serverIP);
export default pocket;
export const refresh_pocket = () => {
    try {
        pocket = new PocketBase(store.serverIP);
    } catch (err) {
        console.log("Error " + err + " logged in pocket.js");
    }
    
}