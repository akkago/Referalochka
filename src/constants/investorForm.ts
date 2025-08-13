export const FILLED_INVESTOR_FORM_SECTIONS = {
  GENERAL_INFO: 'Общая информация',
  RESOURCES: 'Ссылки на ресурсы',
  ABOUT: 'О себе',
  INVESTMENTS: 'Инвестиции',
  CATEGORIES: 'Категории'
} as const

export const FILLED_INVESTOR_FORM_LABELS = {
  GENERAL_INFO: {
    NAME: 'Имя',
    SURNAME: 'Фамилия',
    PHONE: 'Телефон',
    EMAIL: 'E-Mail',
    BRAND: 'Название (Бренд/Ник)',
    COMPANY: 'Компания',
    INN: 'ИНН'
  },
  RESOURCES: {
    WEBSITE_TYPE: 'Сайт',
    WEBSITE_URL: 'Ссылка'
  },
  ABOUT: {
    HEADLINE: 'Заголовок 3-4 слова',
    DESCRIPTION: 'Описание'
  },
  INVESTMENTS: {
    FORMAT: 'Формат инвестиций',
    MIN: 'От',
    MAX: 'До'
  },
  CATEGORIES: {
    TAGS: 'Теги',
    CATEGORIES: 'Интересующие категории'
  }
} as const

export const REJECTION_WARNING = {
  TITLE: 'Причина отклонения',
  REASON: 'Недостаточно информации для верификации',
  DETAILS: 'Пожалуйста, предоставьте дополнительные документы и уточните информацию о вашей деятельности. Это поможет нам быстрее завершить процесс верификации.'
} as const

export const INVESTMENT_FORMATS = {
  SHARE: 'Доля',
  LOAN: 'Займ'
} as const

export const INVESTMENT_CATEGORIES = [
  'Изобретения/ Патенты',
  'Технологические проекты (стартапы, венчур)',
  'Проекты на основе ИИ',
  'Бизнес-проекты (ранняя стадия)'
] as const
