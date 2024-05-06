import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router"
import ChatRooms from '../components/ChatRooms.vue'
import ChatRoom from "@/components/ChatRoom.vue"

const routes = [
  { path: '/', component: ChatRooms },
  { path: '/rooms/:id', component: ChatRoom, props: (route: RouteLocationNormalized) => ({ roomId: parseInt(route.params.id as string) })},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router