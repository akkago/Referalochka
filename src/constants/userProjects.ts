export const USER_PROJECTS_SECTIONS = {
  TITLE: 'Мои проекты',
  ADD_PROJECT: 'Добавить проект',
  SEARCH_PLACEHOLDER: 'Поиск'
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


