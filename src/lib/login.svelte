<!--
<script>

import pocket from '../pocketbase';
import { togglePage } from "../store.svelte";

let email = $state("");
let password = $state("");
let message = $state("Login To MicroChat!");

async function authenticate() {
    if(email == "free" && password == "free"){
        togglePage("freechatWarning");
    } else if(email != "" && password != ""){
        try {
            const authData = await pocket.collection("users").authWithPassword(
                email,
                password,
            );
            console.log(authData);
        
            if(pocket.authStore.isValid){
                togglePage("chat");
            } else {
                message = "Login Failed";
            }

        } catch {
            message = "Login Failed";
        }
    
    } else {
        message = "Actually Type A Password This Time";
    }
    
}

const toggleMessage = (input) => {
    message = input;
};

</script>

<h1>{message}</h1>

<div class="logicBox">

    {#if message == "Login To MicroChat!"}

    <input 
        type="text"
        placeholder="Email"
        bind:value={email}
    />
    <input 
        type="text"
        placeholder="Password"
        bind:value={password}
    />

    <button onclick={authenticate}>Submit</button>

    {:else}

    <button onclick={() => toggleMessage("Login To MicroChat!")}>Try Again</button>
    <button onclick={() => togglePage("signup")}>Sign Up</button>
    
    {/if}

</div>
-->