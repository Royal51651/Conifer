<script>

import pocket from '../pocketbase';
import { store, announce_message } from "../store.svelte";
import Announcer from '../announcer.svelte';
let email = $state("georgeeggers682@gmail.com");
let password = $state("F1R@p@ss");

async function authenticate() {
    if(email != "" && password != ""){
        try {
            const _authData = await pocket.collection("users").authWithPassword(
                email,
                password,
            );
            // ! VERY VERY IMPORTANT!!! REMOVE THE "|| true" ONCE EMAIL VERIFICATION IS WORKING
            if(pocket.authStore.isValid && (pocket.authStore.record.verified || true)){
                store.page = "chat";
            } else if (!pocket.authStore.record.verified){
                announce_message("Verify your Email first");
            } else {
                announce_message("Invalid login credentials");
            }

        } catch {
            announce_message("Server-Error. Try again later");
        }
    
    } else {
        announce_message("Invalid login credentials");
    }
    
}

</script>

<Announcer />

<h1>Login to Fira</h1>

<div class="logicBox">

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