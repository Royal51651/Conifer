<script>
    import { announcer, toggle_announcer } from "../store.svelte"
</script>

<div class="blocker {announcer.visibility}"></div>
<div class="announcer {announcer.visibility}">
    <span>
        <h1>{announcer.msg}</h1>
        <button onclick={toggle_announcer}>Okay</button>
    </span>

</div>

<style>


    .announcer {
        position: fixed;
        top: 20vh;
        left: 20vw;
        width: 60vw;
        height: 60vh;
        background-color: var(--conifer-color-dark);
        color: #fff;
        justify-content: center;
        align-items: center;
        font-size: min(2vh, 2vw);
        z-index: 100;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
    }

    .announcer button {
        font-size: min(3vh, 3vw);
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

    span{
        padding: 20px;
        justify-content: center;
        align-items: center;
    }

    .hidden {
        visibility: hidden;
    }
</style>
