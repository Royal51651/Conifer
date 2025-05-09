

export const store = $state(
    {
        page: "login",
        serverIP: "10.113.20.227:8090"
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