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
  PROFILE: 'profile',
  APPLICATION: 'application',
  INVESTOR_FORM: 'investor-form'
} as const

export const PROFILE_TABS = {
  INVESTOR: 'investor',
  PARTNER: 'partner',
  REQUISITES: 'requisites'
} as const
