import { computed } from 'vue'
import type { User } from '@/types'
import { formatCurrency } from '@/utils/formatters'

export function useUser(user: User) {
  const formattedBalance = computed(() => {
    return formatCurrency(user.balance)
  })

  const formattedBalanceWithoutSymbol = computed(() => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(user.balance)
  })

  const userTypeLabel = computed(() => {
    return user.type === 'individual' ? 'Физическое лицо' : 'Юридическое лицо'
  })

  const userInitials = computed(() => {
    return user.avatar || user.name.split(' ').map(n => n[0]).join('')
  })

  return {
    formattedBalance,
    formattedBalanceWithoutSymbol,
    userTypeLabel,
    userInitials
  }
}
