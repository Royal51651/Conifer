<script>

import pocket from './pocketbase.svelte';
import { announce_message, ip } from "./store.svelte";
import IpControlBar from './reusable/ip-control-bar.svelte';

import Announcer from './reusable/announcer.svelte';
import { ClientResponseError } from 'pocketbase';
import { push } from 'svelte-spa-router';


let email = $state("");
let password = $state("");

async function authenticate() {
    if(email != "" && password != ""){
        try {
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




<div class="header">
    <span>
        <a href="https://github.com/Royal51651/Conifer">
            <img src="src\assets\conifer-logo-nobg-512.png" alt="Conifer Logo" class="logo1"> 
        </a>
        <h1>
            Login to 
        </h1>
    </span>
    
    <h1 style="color: var(--conifer-color-lightest);">
        &nbsp;{ip.ip + ":" + ip.port}
    </h1>
</div>
    

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
        width: 100%;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    h1 {
        display: flex;
        word-wrap: normal;
    }

    @media only screen and (max-width: 1200px) {
        .header {
            flex-direction: column;
        }
        span {
            justify-content: left;
            align-items: left;
        }
    }
</style>