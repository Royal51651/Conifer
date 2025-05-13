<script lang="ts">
    import pocket from './pocketbase.svelte';
    import { onMount, onDestroy } from "svelte"
    import { announce_message } from "./store.svelte";
    import Announcer from './reusable/announcer.svelte';
    import { push, replace } from 'svelte-spa-router';

    let post = $state("")
    let user_avatar = $state("");
    let tags = $state("");
    let visibility = $state("hidden");
    async function logout(){
        pocket.pocket.authStore.clear();
        push('/');
    }

    let posts = $state([]);

    async function sendPost(){;
        if(post != ""){
            const data = {
                "Body": post,
                "Tags": tags,
                "Poster": pocket.pocket.authStore.record.id
            };
            const response = await pocket.pocket.collection('posts').create(data);
            if(response){
                post = "";
                tags = "";
                toggle_post();
            }
        }
    }

    const parse_tags = (/** @type {string} */ input) => {
        let output = [];
        for(let i of input.split(" ")){
            if(i != ""){
                output.push(i);
            }
           
        }
        return output;
    }

    const get_avatar = (record) => {
        try {
            const url = pocket.pocket.files.getURL(record, record.avatar, {'thumb':'128x128'});
            return url
        } catch {
            console.log("Error in get avatar. Most likely from a failure to load the image");
        }

    }

    // subscribe to the thingy so it works better
    let unsubscribe: () => void;
    onMount(async () => {
        user_avatar = get_avatar(pocket.pocket.authStore.record);
        const response = await pocket.pocket.collection("posts").getList(1, 25, {
            expand: "Poster",
            sort: '-created',
        });
        posts = response.items;
        unsubscribe = await pocket.pocket
            .collection('posts')
            .subscribe("*", async ({ action, record }) => {
                console.log("Post created")
                // just append posts for now until an actual recomendation function is worked out
                if(action === "create"){
                    posts.unshift(record);
                }
            }, {expand: "Poster"});
    });

    onDestroy(() => {
        unsubscribe?.();
    });

    const make_post = () => {
        post = "";
        tags = "";
        toggle_post();
    }

    const toggle_post = () => {
        if(visibility == ""){
            visibility = "hidden";
        } else {
            visibility = "";        
        }
    }


</script>

<Announcer />
<div class="blocker {visibility}"></div>

<div class="announcer {visibility}">
    <textarea 
        placeholder="Post"
        style="
            height: 70%;
            width: 100%;
        "
        bind:value={post}
    >
    </textarea>

    
    <textarea 
        placeholder="Tags. Seperate with spaces"
        style="
            height: 20%;
            width: 100%;
        "
        bind:value={tags}
    >
    </textarea>

    <span>
        <button style="width: 10%;" onclick={toggle_post}>X</button>
        <button style="width: 90%;" onclick={sendPost}>Post</button>
    </span>
    
</div>

<div class="container">
    <!-- sidebar -->
    <div class="verticalGroup controlBar" style="width: 10%;">

        <div class="userDisplay">
            <img class="avatar" src="{user_avatar}" alt="Avatar">
        </div>
        <button onclick={() => push("/chat")}>Message Board</button>
        <button onclick={() => push("/posts")}>Main Feed</button>

    </div>

    <div class="verticalGroup" style="width: 90%;">

        <!-- Replace this postBar with an actual wizard to make new posts -->
        <div class="postBar">
           <button onclick={make_post}>New Post</button>
        </div>

        <div class="postContainer">

            {#each posts as post (post.id)}
                <div class="post">
                    <span class="postSpan">
                        <img src="{get_avatar(post.expand.Poster)}" class="avatar" alt="User Avatar">
                        <p1 class="username" style="color: {post.expand.Poster.color}">{post.expand.Poster.username}</p1>
                        <p1 class="subText">{post.created.split(".")[0]}</p1>
                    </span>
                    <p1 class="postBody">{post.Body}</p1>
                    {#if post.Tags != ""}
                        <span class="tags">
                            {#each parse_tags(post.Tags) as tag}
                                <span class="tag">{tag}</span>
                            {/each}
                        </span>
                    {/if}
                </div>
                
            {/each}

        </div>
    </div>

        
</div>





<style>

    .announcer {
        position: fixed;
        top: 10vh;
        left: 10vw;
        width: 80vw;
        height: 80vh;
        background-color: var(--conifer-color-dark);
        color: #fff;
        font-size: min(2vh, 2vw);
        z-index: 100;
        border-radius: 5px;
        padding: 1em;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        gap: 10px;
    }

    .announcer button {
        font-size: min(2vh, 2vw);
        height: 100%;
        box-sizing: border-box;
    }

    .announcer span {
        box-sizing: border-box;
        width: 100%;
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

    .announcer span{
        padding: 20px;
        justify-content: center;
        align-items: center;
    }

    .hidden {
        visibility: hidden;
    }

    :root {
        background-color: var(--grey-color-main);
    }

    .container {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .postSpan {
        justify-content: left;
        align-items: center;
    }

    .userDisplay {
        padding: 1em;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 20px;
        background-color: var(--conifer-color-darkest);
        font-size: min(2vw, 2vh);
    }

    .avatar {
        width: min(64px, 50%);
        height: auto;
        border-radius: 100%;
        box-sizing: border-box;
        border: 2px solid var(--conifer-color);
    }

    .controlBar {
        border-right: 2px solid black;
        height: 100vh;
    }
    
    .verticalGroup {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .postBar {
        width: 100%;
        max-width: 100%;
        height: 10%;
        background-color: var(--conifer-color-dark);
        justify-content: left;
        align-items: center;
        display: flex;
        color: #fff;
        min-height: 80px;
        box-sizing: border-box;
        padding-left: 20px;
        padding-right: 20px;
        gap: 10px;
    }

    .postBar span {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.5em;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
        width: 5%;
        justify-content: center;
        align-items: center;
    }

    .postBar:placeholder {
        color: #d1d1d1;
    }

    .postContainer {
        width: 100%;
        box-sizing: border-box;
        padding: 2em;
        height: 100%;
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .post {
        width: 80%;
        max-width: 80%;
        min-width: 80%;
        border: 2px solid var(--conifer-color);
        border-radius: 5px;
        display: flex;
        width: max-content;
        flex-direction: column;
        align-items: left;
        padding: 1em;
        font-weight: 500;
        font-family: inherit;
        text-align: left;
        word-wrap: anywhere;
        white-space: normal;
        gap: 10px;
    }

    .tags {
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        flex-wrap: wrap;
        height: auto;
    }

    .tag {
        background-color: var(--conifer-color-dark);
        box-sizing: border-box;
        border-radius: 10px;
        padding: 10px;
        align-items: center;
        text-wrap: nowrap;
    }

    .subText {
        text-wrap: pretty;
        float: left;
    }

    .post::hover {
        background-color: var(--conifer-color-dark);
    }

    .username {
        font-size: 24px;
        font-weight: 500px;
    }

    .postBody {
        font-size: 20px;
    }

    .subText {
        font-size: 12px;
    }

    span {
        display: flex;
        align-items: left;
        padding: 2px;

        font-family: inherit;
        gap: 10px;
    }

    .warning {
        color: #ffc400;
        font-size: 20px;
    }

    .error {
        color: #ac0000;
        font-size: 24px;
    }
</style>
