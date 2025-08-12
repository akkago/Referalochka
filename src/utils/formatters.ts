export const formatCurrency = (amount: number, currency = '₽'): string => {
  return `${amount.toLocaleString('ru-RU')} ${currency}`
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU')
}

export const formatProjectId = (id: string): string => {
  return `ID: ${id}`
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
