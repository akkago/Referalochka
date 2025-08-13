<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center mb-4">
      <h4 class="text-lg font-semibold text-gray-800">Все реферальные ссылки</h4>
      <v-btn
        color="primary"
        variant="elevated"
        @click="$emit('create')"
      >
        Создать
      </v-btn>
    </div>

    <div class="space-y-4">
      <v-card 
        v-for="link in links" 
        :key="link.id"
        class="link-card"
      >
        <v-card-text>
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h5 class="text-lg font-semibold text-gray-800">{{ link.name }}</h5>
                <v-chip
                  :color="link.isActive ? 'success' : 'default'"
                  size="small"
                  variant="outlined"
                >
                  {{ link.isActive ? 'Активна' : 'Неактивна' }}
                </v-chip>
              </div>
              
              <p class="text-gray-600 mb-2">{{ link.description }}</p>
              
              <div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span>Переходы: {{ link.clicks }}</span>
                <span>Конверсии: {{ link.conversions }}</span>
                <span>Заработок: {{ formatCurrency(link.earnings) }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <v-text-field
                  :model-value="link.url"
                  readonly
                  variant="outlined"
                  density="compact"
                  class="flex-1"
                />
                <v-btn
                  variant="outlined"
                  color="default"
                  size="small"
                  @click="copyToClipboard(link.url)"
                >
                  Копировать
                </v-btn>
              </div>
            </div>
            
            <div class="flex flex-col gap-2 ml-4">
              <v-btn
                variant="outlined"
                color="primary"
                size="small"
                @click="$emit('edit', link)"
              >
                Редактировать
              </v-btn>
              <v-btn
                variant="outlined"
                color="error"
                size="small"
                @click="$emit('delete', link)"
              >
                Удалить
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ReferralLink } from '@/types'
import { formatCurrency } from '@/utils/formatters'
import { copyToClipboard } from '@/utils/clipboard'

interface Props {
  links: ReferralLink[]
}

interface Emits {
  (e: 'create'): void
  (e: 'edit', link: ReferralLink): void
  (e: 'delete', link: ReferralLink): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
