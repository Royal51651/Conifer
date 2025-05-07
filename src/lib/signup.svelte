<script>

import pocket from '../pocketbase';
import { store, announce_message } from "../store.svelte";
import Announcer from '../announcer.svelte';

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

        } else if (!/^\S*$/.test(password) || password.length < 4) {
            announce_message("Password must be 4 characters or longer with no whitespace");
        } else {
            announce_message("Sign-up Failed. Try Again");
        }
    } catch (err) {
        console.log("Error!", err);
        message = "Server-Error. Try Another Email";
    }
}
</script>

<Announcer />

<h1>{message}</h1>

<div class="logicBox">
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



