import { createRouter, createWebHistory } from "vue-router";
import quizesView from "../views/quizes-view.vue"
import quizeView from "../views/quiz-view.vue"


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: 'quizes',
            component: quizesView
        },
        {
            path: "/quiz/:id",
            name: 'uiz',
            component: quizeView
        }
    ]
})

export default router