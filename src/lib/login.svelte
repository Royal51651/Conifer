<script>

import pocket from '../pocketbase';
import { store, announce_message } from "../store.svelte";
import Announcer from '../announcer.svelte';
import { ClientResponseError } from 'pocketbase';
let email = $state("");
let password = $state("");

async function authenticate() {
    if(email != "" && password != ""){
        try {
            const response = await pocket.collection("users").authWithPassword(
                email,
                password,
            );
            if(pocket.authStore.isValid){
                store.page = "chat";
            } else {
                announce_message("Invalid login credentials");
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
    } else {
        announce_message("Invalid login credentials");
    }
    
}

</script>

<Announcer />

<h1>Login to Fira</h1>

<div class="logicBox">
    <span>
        <div class="divWrapper">
            <p1>Current server set to {store.serverIP}</p1>
        </div>
        <button onclick={() => announce_message("Add server switching later")}>Change</button>
    </span>

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
        store.page="signup"
    }}>Go to Sign-Up</button>

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