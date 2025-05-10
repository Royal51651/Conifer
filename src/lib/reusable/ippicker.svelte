<script>
    import { toggle_ip, ip } from "../store.svelte";
    import { getCookie, setCookie, deleteCookie} from "svelte-cookie";
    import { refresh_pocket } from "../pocketbase.svelte";
    let msg = $state("Save");
    let ip_list = $state(getCookie("saved") || '');
    let addresses = $derived(ip_list.split(',').filter(e => e !== "" && e !== null));
    let saves = $derived(addresses.length == 1 ? addresses.length.toString() + " saved address" : addresses.length.toString() + " saved addresses");

    const updateCookie = () => {
        if(addresses.includes(ip.ip + ":" + ip.port)){
            msg = "IP already saved";
            setTimeout(() => {
                msg = "Save";
            }, 2000);
        } else {
            ip_list += ip.ip + ":" + ip.port + ",";
            setCookie('saved', ip_list);
            ip_list = getCookie("saved");
            msg = "Address saved!";
            setTimeout(() => {
                msg = "Save";
            }, 2000);
        }
        
    }

    const setAddy = (address) => {
        let total = address.split(":");
        ip.ip = total[0];
        ip.port = total[1];
        refresh_pocket();
    }
    
    const deleteData = () => {
        deleteCookie("saved");
        ip_list = "";
    }

</script>

<div class="blocker {ip.visibility}"></div>
<div class="ip_chooser {ip.visibility}">

    <div class="divWrapper">
        <span>
            Base
            <input
                type="text"
                bind:value={ip.ip}
            >
        </span>
        
    </div>
        
    <div class="divWrapper">
        <span>
            Port
            <input
                type="text"
                bind:value={ip.port}
            >
        </span>
        
    </div>

    <span style="width: 100%;">
        <div class="dropdown">
            <button class="hoverButton">{saves}</button>
            {#if addresses[0]}
                <div class="content">
                    {#each addresses as addy}
                        {#if addy != "" && addy != null}
                            <button onclick={() => setAddy(addy)} class="dropButton">{addy}</button>
                        {/if}
                    {/each}
                    <button onclick={deleteData}>Delete saved addresses</button>
                </div>
            {/if}
        </div>
        <button onclick={updateCookie}>{msg}</button>
    </span>

    <span style="width: 100%;">
        <button onclick={() => { refresh_pocket(); toggle_ip(); }}>Done</button>
    </span>
    
    
        

</div>

<style>


    .ip_chooser {
        position: fixed;
        top: 10vh;
        left: 10vw;
        width: 80vw;
        height: 80vh;
        background-color: var(--grey-color-main);
        color: #fff;
        align-items: center;
        font-size: min(2vh, 2vw);
        z-index: 100;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 1em;
        gap: 20px;
    }

    .ip_chooser button {
        font-size: min(2vh, 2vw);
        width: 100%;
    }

    .blocker {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.75);
        justify-content: center;
        align-items: center;
        z-index: 50;
    }

    span{
        align-items: center;
        justify-content: center;
        display: flex;
        gap: 10px;
    }

    .hidden {
        visibility: hidden;
    }
</style>
