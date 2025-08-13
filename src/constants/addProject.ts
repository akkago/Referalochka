export const ADD_PROJECT_SECTIONS = {
  ADD_PROJECT: 'Добавление проекта',
  TRANSITION_COST_SETTINGS: 'Настройка стоимость перехода',
  REFERRAL_LINKS: 'Реферальные ссылки'
} as const

export const ADD_PROJECT_TABS = {
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

export const ADD_PROJECT_FIELDS = {
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

export const TRANSITION_SETTINGS = {
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
        label: 'Только авторизованные'
      },
      INVESTORS: {
        value: 'investors',
        label: 'Только инвесторы'
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

export const ADD_PROJECT_ACTIONS = {
  CANCEL: 'Отменить',
  CREATE_PROJECT: 'Создать проект'
} as const

export const REGIONS = [
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

export const PROJECT_TYPES_ADD = [
  'Стартап',
  'Бизнес-проект',
  'Инновации',
  'Технологии',
  'Услуги',
  'Производство'
] as const

export const INDUSTRIES_ADD = [
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

export const PROJECT_STAGES_ADD = [
  'Идея',
  'Разработка',
  'Запуск',
  'Масштабирование',
  'Стабильная работа'
] as const
