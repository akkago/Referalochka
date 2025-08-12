import type { User, Project, ProjectStage, Industry, ProjectType, NavigationItem } from '@/types'

export const currentUser: User = {
  id: '1',
  name: 'Михаил М.',
  type: 'individual',
  avatar: 'WW',
  balance: 400000
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'search',
    title: 'Поиск проектов',
    icon: 'mdi-magnify',
    isActive: true
  },
  {
    id: 'my-projects',
    title: 'Мои проекты',
    icon: 'mdi-folder'
  },
  {
    id: 'profile',
    title: 'Личный профиль',
    icon: 'mdi-account'
  },
  {
    id: 'documents',
    title: 'Документы',
    icon: 'mdi-file-document',
    badge: 12
  },
  {
    id: 'employees',
    title: 'Сотрудники',
    icon: 'mdi-account-group'
  },
  {
    id: 'help',
    title: 'Помощь',
    icon: 'mdi-help-circle'
  },
  {
    id: 'settings',
    title: 'Настройки',
    icon: 'mdi-cog'
  }
]

export const projectStages: ProjectStage[] = [
  { id: '1', name: 'Идея' },
  { id: '2', name: 'Разработка' },
  { id: '3', name: 'Запуск' },
  { id: '4', name: 'Масштабирование' }
]

export const industries: Industry[] = [
  { id: '1', name: 'Отрасль 1' },
  { id: '2', name: 'Отрасль 2' },
  { id: '3', name: 'Отрасль 3' },
  { id: '4', name: 'Длинное название отрасли которое может не поместиться' },
  { id: '5', name: 'Отрасль 5' },
  { id: '6', name: 'Отрасль 6' },
  { id: '7', name: 'Отрасль 7' }
]

export const projectTypes: ProjectType[] = [
  { id: '1', name: 'Стартап' },
  { id: '2', name: 'Бизнес' },
  { id: '3', name: 'Инновации' }
]

export const projects: Project[] = [
  {
    id: '000342',
    title: 'Сварочные аппараты или длинное название',
    date: '15.09.2025',
    description: 'Производство и продажа стыковых сварочных аппаратов.',
    isFavorite: true,
    stage: projectStages[1],
    industry: 'Промышленность',
    location: 'Москва',
    type: projectTypes[1]
  },
  {
    id: '000343',
    title: 'Экологичная упаковка',
    date: '14.09.2025',
    description: 'Разработка биоразлагаемых материалов для упаковки.',
    isFavorite: false,
    stage: projectStages[0],
    industry: 'Экология',
    location: 'Санкт-Петербург',
    type: projectTypes[0]
  },
  {
    id: '000344',
    title: 'Умный дом',
    date: '13.09.2025',
    description: 'Система автоматизации жилых помещений.',
    isFavorite: true,
    stage: projectStages[2],
    industry: 'Технологии',
    location: 'Москва',
    type: projectTypes[2]
  },
  {
    id: '000345',
    title: 'Доставка еды',
    date: '12.09.2025',
    description: 'Сервис быстрой доставки готовой еды.',
    isFavorite: false,
    stage: projectStages[1],
    industry: 'Услуги',
    location: 'Казань',
    type: projectTypes[1]
  },
  {
    id: '000346',
    title: 'Образовательная платформа',
    date: '11.09.2025',
    description: 'Онлайн-курсы и обучение.',
    isFavorite: true,
    stage: projectStages[3],
    industry: 'Образование',
    location: 'Москва',
    type: projectTypes[0]
  },
  {
    id: '000347',
    title: 'Фитнес-приложение',
    date: '10.09.2025',
    description: 'Мобильное приложение для тренировок.',
    isFavorite: false,
    stage: projectStages[2],
    industry: 'Здоровье',
    location: 'Екатеринбург',
    type: projectTypes[2]
  }
]
