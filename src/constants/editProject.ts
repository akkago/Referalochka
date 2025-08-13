export const EDIT_PROJECT_SECTIONS = {
  EDIT_PROJECT: 'Редактирование проекта',
  TRANSITION_COST_SETTINGS: 'Настройка стоимость перехода'
} as const

export const EDIT_PROJECT_TABS = {
  DESCRIPTION: {
    id: 'description',
    title: 'Описание',
    isActive: true
  },
  REFERRAL_LINKS: {
    id: 'referral-links',
    title: 'Реферальные ссылки',
    isActive: false
  }
} as const

export const EDIT_PROJECT_FIELDS = {
  PROJECT_ID: {
    label: 'ID',
    prefix: 'ID: '
  },
  ENABLE_PROJECT: {
    label: 'Включить проект'
  },
  REGION: {
    label: 'Регион?',
    placeholder: 'Не выбрано',
    hasHelpIcon: true
  },
  PROJECT_TYPE: {
    label: 'Тип проекта',
    placeholder: 'Не выбрано'
  },
  INDUSTRY: {
    label: 'Отрасль',
    placeholder: 'Не выбрано'
  },
  PROJECT_STAGE: {
    label: 'Стадия проекта',
    placeholder: 'Не выбрано'
  },
  ABOUT: {
    label: 'О проекте',
    headline: {
      placeholder: 'Заголовок 3-4 слова'
    },
    description: {
      placeholder: 'Краткое описание проекта'
    }
  },
  PROJECT_LINK: {
    label: 'Ссылка на проект',
    description: 'Указанная ссылка будет использоваться как реферальная',
    placeholder: 'Ссылка'
  }
} as const

export const TRANSITION_COST_INFO = {
  TITLE: 'Стоимость перехода',
  COST_PER_TRANSITION: 'Один переход:',
  TOTAL_COST: 'Итого:',
  BALANCE: 'Баланс:',
  CURRENCY: 'рублей'
} as const

export const TRANSITION_SETTINGS_EDIT = {
  WHO_CAN_TRANSITION: {
    label: 'Кто может перейти ?',
    hasHelpIcon: true,
    options: {
      ALL: {
        value: 'all',
        label: 'Все'
      },
      AUTHORIZED: {
        value: 'authorized',
        label: 'Авторизованные'
      },
      INVESTORS: {
        value: 'investors',
        label: 'Инвесторы'
      }
    }
  },
  PAYMENT_STRATEGY: {
    label: 'Стратегия оплаты переходов по ссылке',
    options: {
      TRANSITIONS: {
        value: 'transitions',
        label: 'Колличество переходов'
      },
      PUBLICATION_PERIOD: {
        value: 'publication-period',
        label: 'Срок публикации'
      }
    }
  },
  TRANSITIONS_COUNT: {
    label: 'переходов',
    placeholder: '0'
  },
  BUDGET_LIMIT: {
    label: 'Ограничить бюджет',
    placeholder: '0',
    suffix: 'руб.'
  },
  DISABLE_BY_DATE: {
    label: 'Отключить по дате',
    placeholder: 'ДД.ММ.ГГГГ'
  }
} as const

export const EDIT_PROJECT_ACTIONS = {
  CANCEL: 'Отмена',
  STOP_ADVERTISING: 'Остановить рекламу',
  LAUNCH_ADVERTISING: 'Запустить рекламу'
} as const

export const REGIONS_EDIT = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Екатеринбург',
  'Новосибирск',
  'Нижний Новгород',
  'Челябинск',
  'Самара',
  'Уфа',
  'Ростов-на-Дону'
] as const

export const PROJECT_TYPES_EDIT = [
  'Стартап',
  'Бизнес-проект',
  'Инновации',
  'Технологии',
  'Услуги',
  'Производство',
  'Проекты на основе ИИ'
] as const

export const INDUSTRIES_EDIT = [
  'Промышленность',
  'Экология',
  'Технологии',
  'Услуги',
  'Образование',
  'Здоровье',
  'Финансы',
  'Недвижимость',
  'Транспорт',
  'Сельское хозяйство'
] as const

export const PROJECT_STAGES_EDIT = [
  'Идея',
  'Разработка',
  'Запуск',
  'Масштабирование',
  'Стабильная работа'
] as const
