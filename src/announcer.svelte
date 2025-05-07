<script>
    import { announcer, toggle_announcer } from "./store.svelte"
</script>

<div class="blocker {announcer.visibility}"></div>
<div class="announcer {announcer.visibility}">
    <h1>{announcer.msg}</h1>
    <button onclick={toggle_announcer}>Okay</button>
</div>

<style>
    .announcer {
        position: fixed;
        top: 20vh;
        left: 20vw;
        width: 60vw;
        height: 60vh;
        background-color: rgb(40, 91, 108);
        color: #fff;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        z-index: 100;
        border-radius: 5px;
    }

    .blocker {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.75);
        justify-content: center;
        align-items: center;
        z-index: 50;
    }

    .hidden {
        visibility: hidden;
    }
</style>