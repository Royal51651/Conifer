<script lang="ts">
    import pocket from '../pocketbase';
    import { onMount, onDestroy } from "svelte"
    import { announce_message, store } from "../store.svelte";
    import Announcer from '../announcer.svelte';

    let message = $state("")
    let length = $derived(200 - message.length);


    async function logout(){
        pocket.authStore.clear();
        store.page = "login";
    }

    let messages = $state([]);

    const parseColor = (input) => {
        let output = "rgb(";
        let count = 0;
        for(let i = 0; i < input.length; i++){
            if(input[i] == ","){
                count += 1; 
            }
            if(count != 3){
                output += input[i];
            }
        }
        return output + ");";
    }

    async function send(){;
        if(message != "" && length >= 0){
            const user = await pocket.collection('users').getOne(pocket.authStore.record.id, {
                expand: 'username,color',
            });
            let messageColor = parseColor(user.color);
            const data = {
                "Body": message,
                "Username": user.username,
                "Color": messageColor
            };
            const response = await pocket.collection('messages').create(data);
            if(response){
                message = "";
            }
        } else if (length < 0){
            announce_message("Maximum message size is 200 characters")
        }
    }

    // subscribe to the thingy so it works better
    let unsubscribe: () => void;
    onMount(async () => {
        const response = await pocket.collection("messages").getList(1, 25, {
            sort: '-created',
        });
        messages = response.items;
        unsubscribe = await pocket
            .collection('messages')
            .subscribe("*", async ({ action, record }) => {
                if(action === "create"){
                    if(messages.length < 25){
                        messages.unshift(record);
                    } else {
                        messages.unshift(record);
                        messages.splice(25, 1);
                    }
                }
            });
    });

    onDestroy(() => {
        logout();
        unsubscribe?.();
    });

</script>

<Announcer />

<div class="main">

    <div class="messageBar">
        <input
            onkeydown={(e) => e.key === "Enter" && send()}
            type="text"
            placeholder="Message"
            bind:value={message}
        >
        {#if length > 15}
        <span>
            <p1>{length}</p1>
        </span>
        {:else if length >= 0}
        <span>
            <p1 class="warning">{length}</p1>
        </span>
        {:else}
        <span>
            <p1 class="error">{length}</p1>
        </span>
        {/if}
    </div>

    <div class="messageContainer">

        {#each messages as message}

        <div class="message">
            <span>
                <p1 class="username" style="color: {message.Color}">{message.Username}</p1>
            </span>
            <span style="overflow-wrap: anywhere;">
                <p1 class="messageBody">{message.Body}</p1>
            </span>
            <span>
                <p1 class="subText">{message.date.split(".")[0]}</p1>
            </span>
        </div>
        
        {/each}

    </div>
</div>



<style>

    .main {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
    }

    .messageBar {
        width: 100%;
        height: 10%;
        background-color: var(--fira-color-dark);
        justify-content: left;
        align-items: center;
        display: flex;
        color: #fff;
        min-height: 80px;
        padding-left: 20px;
        padding-right: 20px;
        gap: 10px;
    }

    .messageBar input {
        width: 80%;
    }

    .messageBar span {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.5em;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
        width: 5%;
        justify-content: center;
        align-items: center;
    }

    .messageBar ::placeholder {
        color: #d1d1d1;
    }

    .messageContainer {
        width: 100%;
        height: 100%;
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .message {
        max-width: 80%;
        display: flex;
        width: max-content;
        flex-direction: column;
        justify-content: center;
        border-radius: 8px;
        border: 2px solid transparent;
        padding: 1em;
        font-weight: 500;
        font-family: inherit;
        white-space: normal;
        background-color: var(--grey-color-main);
    }

    .username {
        font-size: 24px;
        font-weight: 500px;
    }

    .messageBody {
        font-size: 20px;
    }

    .subText {
        font-size: 12px;
    }

    span {
        display: flex;
        align-items: left;
        flex-direction: row;
        padding: 2px;
        font-family: inherit;
    }

    .warning {
        color: #ffc400;
        font-size: 20px;
    }

    .error {
        color: #ac0000;
        font-size: 24px;
    }
</style>
