// Валидация email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Валидация телефона (российский формат)
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/
  return phoneRegex.test(phone)
}

// Валидация даты (формат ДД.ММ.ГГГГ)
export const validateDate = (date: string): boolean => {
  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/
  if (!dateRegex.test(date)) return false
  
  const [day, month, year] = date.split('.').map(Number)
  const dateObj = new Date(year, month - 1, day)
  
  return dateObj.getDate() === day &&
         dateObj.getMonth() === month - 1 &&
         dateObj.getFullYear() === year
}

// Валидация серии паспорта (4 цифры)
export const validatePassportSeries = (series: string): boolean => {
  return /^\d{4}$/.test(series)
}

// Валидация номера паспорта (6 цифр)
export const validatePassportNumber = (number: string): boolean => {
  return /^\d{6}$/.test(number)
}

// Валидация почтового индекса (6 цифр)
export const validatePostalCode = (code: string): boolean => {
  return /^\d{6}$/.test(code)
}

// Валидация URL
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Валидация ИНН
export const validateInn = (inn: string): boolean => {
  return /^\d{10}(\d{2})?$/.test(inn) // 10 или 12 цифр
}

// Валидация обязательного поля
export const validateRequired = (value: any): boolean => {
  return value !== null && value !== undefined && value !== ''
}

// Валидация файла
export const validateFile = (file: File | null): boolean => {
  if (!file) return false
  
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  
  return file.size <= maxSize && allowedTypes.includes(file.type)
}

// Получение сообщения об ошибке
export const getErrorMessage = (fieldName: string, validationType: string): string => {
  const messages: Record<string, string> = {
    required: `${fieldName} обязателен`,
    email: 'Введите корректный email',
    phone: 'Введите корректный номер телефона',
    date: 'Введите дату в формате ДД.ММ.ГГГГ',
    'passport-series': 'Серия паспорта должна содержать 4 цифры',
    'passport-number': 'Номер паспорта должен содержать 6 цифр',
    'postal-code': 'Индекс должен содержать 6 цифр',
    url: 'Введите корректный URL',
    inn: 'ИНН должен содержать 10 или 12 цифр',
    file: 'Выберите корректный файл (JPG, PNG, PDF, DOC, DOCX, до 10MB)'
  }
  
  return messages[validationType] || 'Некорректное значение'
}

// Создание правила валидации
export const createValidationRule = (validationType: string, fieldName: string) => {
  return (value: any) => {
    if (!validateRequired(value)) {
      return getErrorMessage(fieldName, 'required')
    }
    
    switch (validationType) {
      case 'email':
        return validateEmail(value) || getErrorMessage(fieldName, 'email')
      case 'phone':
        return validatePhone(value) || getErrorMessage(fieldName, 'phone')
      case 'date':
        return validateDate(value) || getErrorMessage(fieldName, 'date')
      case 'passport-series':
        return validatePassportSeries(value) || getErrorMessage(fieldName, 'passport-series')
      case 'passport-number':
        return validatePassportNumber(value) || getErrorMessage(fieldName, 'passport-number')
      case 'postal-code':
        return validatePostalCode(value) || getErrorMessage(fieldName, 'postal-code')
      case 'url':
        return validateUrl(value) || getErrorMessage(fieldName, 'url')
      case 'inn':
        return validateInn(value) || getErrorMessage(fieldName, 'inn')
      case 'file':
        return validateFile(value) || getErrorMessage(fieldName, 'file')
      default:
        return true
    }
  }
}
