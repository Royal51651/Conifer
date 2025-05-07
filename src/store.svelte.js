import { writable } from 'svelte/store'   

export const store = $state(
    {
        page: "login",
        serverIP: "127.0.0.1:8090"
    }
);

export const announcer = $state({
    msg: "Announcer",
    visibility: "hidden"
});
export const toggle_announcer = () => {
    if(announcer.visibility == "hidden"){
        announcer.visibility = "";
    } else {
        announcer.visibility = "hidden";
    }
}

export const announce_message = (/** @type {string} */ message) => {
    announcer.msg = message;
    toggle_announcer();
}