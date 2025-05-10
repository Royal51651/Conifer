<script>
    import { ip, toggle_ip } from "../store.svelte";
    import Ippicker from './ippicker.svelte';
</script>

<Ippicker />

<span>
    <div class="divWrapper">
        <p1>Current server set to </p1>
        <p1 style="color: var(--conifer-color-lightest);">{ip.ip}:{ip.port}</p1>
    </div>
    <button onclick={toggle_ip}>Change</button>
</span>

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