import Login from './lib/login.svelte';
import Signup from './lib/signup.svelte';
import Chat from './lib/chat.svelte';

export const routes = {
    '/': Login,
    '/signup': Signup,
    '/chat': Chat,
};