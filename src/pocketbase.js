import PocketBase from 'pocketbase';
import { store } from './store.svelte';
// ! VERY IMPORTANT
// ! 
let pocket = new PocketBase(store.serverIP)
export default pocket;
export const refresh_pocket = () => {
    pocket = new PocketBase(store.serverIP);
}