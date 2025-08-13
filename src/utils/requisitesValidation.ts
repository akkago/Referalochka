import { REQUISITES_VALIDATION_MESSAGES } from '@/constants/requisites'

export interface ValidationResult {
  isValid: boolean
  message?: string
}

export const validateInn = (inn: string): ValidationResult => {
  if (!inn) {
    return { isValid: false, message: REQUISITES_VALIDATION_MESSAGES.REQUIRED }
  }
  
  // ИНН для юр. лиц - 10 цифр, для ИП - 12 цифр
  const innRegex = /^\d{10}(\d{2})?$/
  if (!innRegex.test(inn)) {
    return { isValid: false, message: REQUISITES_VALIDATION_MESSAGES.INVALID_INN }
  }
  
  return { isValid: true }
}

export const validateKpp = (kpp: string): ValidationResult => {
  if (!kpp) {
    return { isValid: false, message: REQUISITES_VALIDATION_MESSAGES.REQUIRED }
  }
  
  // КПП - 9 цифр
  const kppRegex = /^\d{9}$/
  if (!kppRegex.test(kpp)) {
    return { isValid: false, message: REQUISITES_VALIDATION_MESSAGES.INVALID_KPP }
  }
  
  return { isValid: true }
}

export const validateOgrn = (ogrn: string): ValidationResult => {
  if (!ogrn) {
    return { isValid: false, message: REQUISITES_VALIDATION_MESSAGES.REQUIRED }
  }
  
  // ОГРН - 13 цифр для юр. лиц, 15 цифр для ИП
  const ogrnRegex = /^\d{13}(\d{2})?$/
  if (!ogrnRegex.test(ogrn)) {
    return { isValid: false, message: REQUISITES_VALIDATION_MESSAGES.INVALID_OGRN }
  }
  
  return { isValid: true }
}

export const validateBic = (bic: string): ValidationResult => {
  if (!bic) {
    return { isValid: true } // БИК не обязательное поле
  }
  
  // БИК - 9 цифр
  const bicRegex = /^\d{9}$/
  if (!bicRegex.test(bic)) {
    return { isValid: false, message: REQUISITES_VALIDATION_MESSAGES.INVALID_BIC }
  }
  
  return { isValid: true }
}

export const validateRequired = (value: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: REQUISITES_VALIDATION_MESSAGES.REQUIRED }
  }
  
  return { isValid: true }
}

export const createValidationRule = (validator: (value: string) => ValidationResult) => {
  return (value: string) => {
    const result = validator(value)
    return result.isValid || result.message || REQUISITES_VALIDATION_MESSAGES.REQUIRED
  }
}
