<!--
<script lang="ts">
    import pocket from '../pocketbase';
    import { onMount, onDestroy } from "svelte"
    import { page } from "../store.svelte";

    let message = $state("")

    async function logout(){
        pocket.authStore.clear();
        togglePage("login");
    }

    let messages = $state([]);

    const focusMessageBar = () => {
        let target = document.getElementById("messageControl");
        target.focus();
        target.scrollIntoView();
    }

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
        if(message != ""){
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
        }
        focusMessageBar();
    }

    // subscribe to the thingy so it works better
    let unsubscribe: () => void;
    onMount(async () => {
        const response = await pocket.collection("messages").getList(1, 10, {
            sort: '-created',
        });
        messages = response.items;
        messages.reverse();

        unsubscribe = await pocket
            .collection('messages')
            .subscribe("*", async ({ action, record }) => {
                if(action === "create"){
                    if(messages.length < 10){
                        messages.push(record);
                    } else {
                        messages.push(record);
                        messages.shift();
                    }
                    focusMessageBar();
                }
            });
    });

    onDestroy(() => {
        logout();
        unsubscribe?.();
    });

</script>

<div class="messageContainer">

    {#each messages as message}

    <div class="message">
        <p1 class="username" style="color: {message.Color}">{message.Username}</p1>
        <p1>{message.Body}</p1>
    </div>
    
    {/each}

</div>

<div class="messageControl" id="messageControl">
    <span style="width: 10%;">
        <p1>MicroChat</p1>
    </span>
    <span style="width: 90%;">
        <div class="logicBox">
            <input
                onkeydown={(e) => e.key === "Enter" && send()}
                type="text"
                placeholder="Message"
                bind:value={message}
            >
        </div>
    </span>
    
</div>
-->
<h1>
    ADD THIS LATER!!!
</h1>

