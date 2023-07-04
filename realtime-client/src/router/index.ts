import {createRouter, createWebHistory} from "vue-router";
import ScreenKeyboard from "@/pages/ScreenKeyboard.vue";
import HomePage from "@/pages/HomePage.vue";

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/keyboard',
        component: ScreenKeyboard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
