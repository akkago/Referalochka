import { createRouter, createWebHistory } from 'vue-router'
import ProjectsView from '@/views/ProjectsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ApplicationView from '@/views/ApplicationView.vue'
import InvestorFormView from '@/views/InvestorFormView.vue'
import PartnerFormView from '@/views/PartnerFormView.vue'
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
      path: '/application',
      name: ROUTES.APPLICATION,
      component: ApplicationView,
      meta: {
        title: 'Заполнение анкеты'
      }
    },
    {
      path: '/investor-form',
      name: ROUTES.INVESTOR_FORM,
      component: InvestorFormView,
      meta: {
        title: 'Анкета инвестора'
      }
    },
    {
      path: '/partner-form',
      name: ROUTES.PARTNER_FORM,
      component: PartnerFormView,
      meta: {
        title: 'Анкета партнера'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
