import {createApp} from "vue";
import {createPinia} from "pinia";
import {createRouter, createWebHistory} from "vue-router";
import App from "./App.vue";
import Home from "@/views/Home.vue";

import "bootstrap/dist/css/bootstrap.min.css";

const pinia = createPinia();

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: Home},
        {path: "/slot", component: Home},
    ],
});

createApp(App).use(pinia).use(router).mount("#app");