<script>

import pocket from '../pocketbase';
import { store, announce_message } from "../store.svelte";
import Announcer from '../announcer.svelte';
import { ClientResponseError } from 'pocketbase';

let passwordConfirm = $state("");
let username = $state("");
let email = $state("");
let password = $state("");
let message = $state("Create Account!");

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
            const newUser = await pocket.collection('users').create(data);
            if(newUser){
                message = "Sign-Up Succesfull!";
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
                announce_message("Failed to connect to server at " + store.serverIP);
            }
        }
    }
}
</script>

<Announcer />

<h1>{message}</h1>

<div class="logicBox">

    <span>
        <div class="divWrapper">
            <p1>Current server set to {store.serverIP}</p1>
        </div>
        <button onclick={() => announce_message("Add server switching later")}>Change</button>
    </span>

    {#if message== "Sign-Up Succesfull!"}

    <button onclick={() => {
        store.page = "login"
    }}>
        Go To Login
    </button>

    {:else}

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
        box-sizing: border-box;
        justify-content: space-between;
        width: 100%;
        gap: 10px;
    }
</style>


