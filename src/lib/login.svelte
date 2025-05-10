<script>

import pocket from './pocketbase.svelte';
import { announce_message, toggle_ip, ip } from "./store.svelte";
import IpControlBar from './reusable/ip-control-bar.svelte';

import Announcer from './reusable/announcer.svelte';
import { ClientResponseError } from 'pocketbase';
import { push } from 'svelte-spa-router';


let email = $state("");
let password = $state("");

async function authenticate() {
    if(email != "" && password != ""){
        try {
            console.log("at login");
            console.log(pocket);
            const response = await pocket.pocket.collection("users").authWithPassword(
                email,
                password,
            );
            if(pocket.pocket.authStore.isValid){
                push('/chat')
            } else {
                announce_message("Invalid login credentials");
            }

        } catch (err) {
            console.log(err);
            if(err instanceof ClientResponseError){
                if (err.status == 400){
                    announce_message("Invalid login credentials");
                } else if (err.status == 0){
                    announce_message("Failed to connect to server at " + ip.ip + ":" + ip.port);
                }
            }
        }
    } else {
        announce_message("Invalid login credentials");
    }
    
}

</script>


<Announcer />

<span>
    <h1>Login to 
        <span style="color: var(--fira-color-lightest">
            &nbsp;{ip.ip + ":" + ip.port}
        </span>
    </h1>
</span>

<div class="logicBox">
    <IpControlBar />

    <input 
        type="text"
        placeholder="Email"
        bind:value={email}
    />

    <input 
        type="password"
        placeholder="Password"
        bind:value={password}
    />

    <button onclick={authenticate}>Submit</button>
    <button onclick={() => {
        push("/signup")
    }}>Go to Sign-Up</button>

</div>

<style>
    span {
        display: flex;
        flex-direction: row;
        word-wrap: break-word;
    }

    h1 {
        display: flex;
        word-wrap: break-word;
    }
</style>