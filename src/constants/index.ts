export const APP_NAME = 'Referal App'

export const LOCATIONS = [
  'Москва',
  'Санкт-Петербург', 
  'Казань',
  'Екатеринбург',
  'Новосибирск'
] as const

export const USER_TYPES = {
  INDIVIDUAL: 'individual',
  COMPANY: 'company'
} as const

export const NAVIGATION_ITEMS = {
  SEARCH: 'search',
  MY_PROJECTS: 'my-projects',
  PROFILE: 'profile',
  DOCUMENTS: 'documents',
  EMPLOYEES: 'employees',
  HELP: 'help',
  SETTINGS: 'settings'
} as const

export const BREAKPOINTS = {
  MOBILE: 600,
  TABLET: 960,
  DESKTOP: 1264
} as const

export const ROUTES = {
  PROJECTS: 'projects',
  USER_PROJECTS: 'user-projects',
  ADD_PROJECT: 'add-project',
  EDIT_PROJECT: 'edit-project',
  PROFILE: 'profile',
  APPLICATION: 'application',
  INVESTOR_FORM: 'investor-form',
  PARTNER_FORM: 'partner-form',
  REQUISITES: 'requisites',
  DOCUMENTS: 'documents',
  EMPLOYEES: 'employees'
} as const

export const PROFILE_TABS = {
  INVESTOR: 'investor',
  PARTNER: 'partner',
  REQUISITES: 'requisites'
} as const

export const TRANSITION_COST_SETTINGS = {
  TITLE: 'Настройка стоимости перехода',
  WHO_CAN_TRANSITION: {
    label: 'Кто может перейти по ссылке проекта?',
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
        label: 'Количество переходов'
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
  PUBLICATION_DAYS: {
    label: 'дней',
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
  },
  COST_INFO: {
    TRANSITION_COST: {
      title: 'Стоимость перехода',
      costPerTransition: 'Один переход: {cost} рублей',
      totalCost: 'Итого: {total} рублей',
      balance: 'Баланс: {balance} рублей'
    },
    PLACEMENT_COST: {
      title: 'Стоимость размещения',
      costPerDay: 'Один размещения на 24 часа: {cost} рублей',
      totalCost: 'Итого: {total} рублей',
      balance: 'Баланс: {balance} рублей'
    }
  }
} as const
