<script>

import pocket from './pocketbase.svelte';
import { announce_message, ip } from "./store.svelte";
import Announcer from './reusable/announcer.svelte';
import IpControlBar from './reusable/ip-control-bar.svelte';
import { ClientResponseError } from 'pocketbase';
import { push } from 'svelte-spa-router';

let passwordConfirm = $state("");
let username = $state("");
let email = $state("");
let password = $state("");
let message = $state("Create profile for");

const randomColor = () => {
    let color = "";
    for(let i = 0; i < 3; i++){
        color += (Math.floor(Math.random() * 192) + 64).toString() + ",";
    }
    return color;
}

async function signUp() {
    try {
        if(passwordConfirm == password && email != "" && username != "" && /^\S*$/.test(password) && password.length >= 4){
            let color = randomColor();
            const data = {
                "email": email,
                "emailVisibility": true,
                "username": username,
                "color": color,
                "password": password,
                "passwordConfirm": passwordConfirm
            };
            const newUser = await pocket.pocket.collection('users').create(data);
            if(newUser){
                message = "Profile created for ";
            }

        } else if (!/^\S*$/.test(password) || password.length < 8) {
            announce_message("Password must be 8 characters or longer with no whitespace");
        } else {
            announce_message("Sign-up Failed. Try Again");
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
}
</script>

<Announcer />

<span>
    <h1>{message}
        <span style="color: var(--conifer-color-lightest">
            &nbsp;{ip.ip + ":" + ip.port}
        </span>
    </h1>
</span>

<div class="logicBox">

    {#if message== "Profile created for "}

    <button onclick={() => {
        push('/')
    }}>
        Go To Login
    </button>

    {:else}

    <IpControlBar />

    <input 
    type="text"
    placeholder="Username"
    bind:value={username}
    />
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
    <input 
        type="password"
        placeholder="Confirm Password"
        bind:value={passwordConfirm}
    />
    <button onclick={signUp}>Submit</button>
    {/if}

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

