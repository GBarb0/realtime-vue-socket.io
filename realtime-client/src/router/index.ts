import {createRouter, createWebHistory} from "vue-router";
import ScreenKeyboard from "@/pages/ScreenKeyboard.vue";
import HomePage from "@/pages/HomePage.vue";
import VideoPage from "@/pages/VideoPage.vue";
import SpaceRoom from "@/pages/SpaceRoom.vue";

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/keyboard',
        component: ScreenKeyboard
    },
    {
        path: '/video',
        component: VideoPage
    },
    {
        path: '/space-room',
        component: SpaceRoom
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
