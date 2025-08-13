export interface ValidationResult {
  isValid: boolean
  message?: string
}

export const validateRequired = (value: string): ValidationResult => {
  if (!value || value.trim().length === 0) {
    return {
      isValid: false,
      message: 'Это поле обязательно для заполнения'
    }
  }
  return { isValid: true }
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: 'Введите корректный email адрес'
    }
  }
  return { isValid: true }
}

export const validatePhone = (phone: string): ValidationResult => {
  const phoneRegex = /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/
  if (!phoneRegex.test(phone)) {
    return {
      isValid: false,
      message: 'Введите телефон в формате +7-900-000-00-00'
    }
  }
  return { isValid: true }
}

export const validateUrl = (url: string): ValidationResult => {
  if (!url) return { isValid: true }
  
  try {
    new URL(url)
    return { isValid: true }
  } catch {
    return {
      isValid: false,
      message: 'Введите корректный URL'
    }
  }
}

export const validateMinLength = (value: string, minLength: number): ValidationResult => {
  if (value.length < minLength) {
    return {
      isValid: false,
      message: `Минимальная длина ${minLength} символов`
    }
  }
  return { isValid: true }
}

export const validateMaxLength = (value: string, maxLength: number): ValidationResult => {
  if (value.length > maxLength) {
    return {
      isValid: false,
      message: `Максимальная длина ${maxLength} символов`
    }
  }
  return { isValid: true }
}

export const createValidationRule = (validator: (value: string) => ValidationResult) => {
  return (value: string) => {
    const result = validator(value)
    return result.isValid || result.message || 'Неверное значение'
  }
}
