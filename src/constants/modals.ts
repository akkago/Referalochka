export const MODAL_TYPES = {
  DELETE: 'delete',
  CONFIRM: 'confirm',
  INFO: 'info'
} as const

export const DELETE_MODAL_MESSAGES = {
  REQUISITES: {
    TITLE: 'Удалить реквизиты',
    MESSAGE: 'Вы действительно хотите безвозвратно удалить эти реквизиты?'
  }
} as const

export const MODAL_ACTIONS = {
  CONFIRM: 'Подтвердить',
  CANCEL: 'Отмена',
  DELETE: 'Удалить',
  CLOSE: 'Закрыть'
} as const
