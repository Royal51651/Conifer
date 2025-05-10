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

export const ip = $state({
    ip: "127.0.0.1",
    port: "8090",
    visibility: "hidden"
});
export const toggle_ip = () => {
    if(ip.visibility == "hidden"){
        ip.visibility = "";
    } else {
        ip.visibility = "hidden";
    }
}

export const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match;
    return null;
}