import { createRouter, createWebHistory } from 'vue-router'
import ProjectsView from '@/views/ProjectsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { ROUTES } from '@/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTES.PROJECTS,
      component: ProjectsView,
      meta: {
        title: 'Проекты'
      }
    },
    {
      path: '/profile',
      name: ROUTES.PROFILE,
      component: ProfileView,
      meta: {
        title: 'Личный профиль'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
