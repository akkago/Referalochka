export const REQUISITES_FIELD_LABELS = {
  COMPANY: {
    FULL_NAME: 'Полное название',
    SHORT_NAME: 'Краткое название',
    INN: 'ИНН',
    KPP: 'КПП',
    OGRN: 'ОГРN',
    LEGAL_ADDRESS: 'Юридический адрес',
    MAILING_ADDRESS: 'Почтовый адрес'
  },
  HEAD: {
    POSITION: 'Должность',
    FULL_NAME: 'ФИО',
    BASIS: 'На основании'
  },
  BANK: {
    BIC: 'Бик',
    CURRENT_ACCOUNT: 'P/c',
    BANK: 'Банк',
    CORRESPONDENT_ACCOUNT: 'K/c',
    USE_DEFAULT: 'Использовать по умолчанию'
  }
} as const

export const REQUISITES_SECTIONS = {
  COMPANY: 'Реквизиты',
  HEAD: 'Руководитель',
  BANK: 'Банковские реквизиты'
} as const

export const REQUISITES_ACTIONS = {
  UPDATE: 'Обновить данные',
  ADD: 'Добавить реквизиты',
  SUBMIT: 'Отправить',
  CANCEL: 'Отмена'
} as const

export const REQUISITES_PLACEHOLDERS = {
  BIC: 'Введите БИК',
  CURRENT_ACCOUNT: 'Введите номер счета',
  BANK: 'Введите название банка',
  CORRESPONDENT_ACCOUNT: 'Введите корр. счет',
  BASIS: 'Нет данных'
} as const

export const REQUISITES_VALIDATION_MESSAGES = {
  REQUIRED: 'Обязательное поле',
  INVALID_INN: 'Неверный формат ИНН',
  INVALID_KPP: 'Неверный формат КПП',
  INVALID_OGRN: 'Неверный формат ОГРН',
  INVALID_BIC: 'Неверный формат БИК'
} as const
