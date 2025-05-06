import { writable } from 'svelte/store';
export let page = "login";
export const togglePage = (/** @type {string} */ location) => {
    page = location;
};
export let serverIP = "http://127.0.0.1:8090";
export const changeServerIP = (/** @type {string} */ input) => {
    serverIP = input;
}