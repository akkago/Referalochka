export const USER_PROJECTS_SECTIONS = {
  TITLE: 'Мои проекты',
  ADD_PROJECT: 'Добавить проект',
  SEARCH_PLACEHOLDER: 'Поиск'
} as const

export const USER_PROJECTS_FILTERS = {
  STAGE: 'Стадия проекта',
  INDUSTRY: 'Отрасль',
  REGION: 'Регион',
  TYPE: 'Тип'
} as const

export const USER_PROJECT_STATUSES = {
  MODERATION: {
    value: 'moderation',
    text: 'На модерации',
    color: 'blue'
  },
  ACTIVE: {
    value: 'active',
    text: 'Активен',
    color: 'green'
  },
  DRAFT: {
    value: 'draft',
    text: 'Черновик',
    color: 'grey'
  },
  REJECTED: {
    value: 'rejected',
    text: 'Отклонен',
    color: 'red'
  }
} as const

export const USER_PROJECT_ACTIONS = {
  EDIT: 'Редактировать',
  ENABLE: 'Включить проект',
  DISABLE: 'Отключить проект',
  COPY_ID: 'Копировать ID',
  COPY_LINK: 'Копировать ссылку'
} as const

export const USER_PROJECT_METRICS = {
  VIEWS: 'Количество кликов',
  SHARES: 'Количество комментариев'
} as const

export const PROJECT_STAGES = [
  'Все стадии',
  'Идея',
  'Разработка',
  'Запуск',
  'Масштабирование'
] as const

export const PROJECT_INDUSTRIES = [
  'Все отрасли',
  'Промышленность',
  'Экология',
  'Технологии',
  'Услуги',
  'Образование',
  'Здоровье'
] as const

export const PROJECT_REGIONS = [
  'Все регионы',
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Екатеринбург',
  'Новосибирск'
] as const

export const PROJECT_TYPES = [
  'Все типы',
  'Стартап',
  'Бизнес',
  'Инновации'
] as const
