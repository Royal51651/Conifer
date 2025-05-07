<script>
import { store } from "./store.svelte";
import Signup from "./lib/signup.svelte";
import Login from "./lib/login.svelte";
import Chat from "./lib/chat.svelte";

</script>
{#if store.page == "signup"}

<Signup />

{:else if store.page === "login"}

<Login />

{:else if store.page == "chat"}

<Chat />

{/if}