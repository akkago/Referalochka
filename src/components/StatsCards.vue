<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
    <v-card class="stats-card">
      <v-card-text class="text-center">
        <div class="text-2xl font-bold text-primary">{{ stats.totalLinks }}</div>
        <div class="text-sm text-gray-600">Всего ссылок</div>
      </v-card-text>
    </v-card>
    
    <v-card class="stats-card">
      <v-card-text class="text-center">
        <div class="text-2xl font-bold text-green-600">{{ stats.activeLinks }}</div>
        <div class="text-sm text-gray-600">Активных ссылок</div>
      </v-card-text>
    </v-card>
    
    <v-card class="stats-card">
      <v-card-text class="text-center">
        <div class="text-2xl font-bold text-blue-600">{{ stats.totalClicks }}</div>
        <div class="text-sm text-gray-600">Всего переходов</div>
      </v-card-text>
    </v-card>
    
    <v-card class="stats-card">
      <v-card-text class="text-center">
        <div class="text-2xl font-bold text-purple-600">{{ stats.totalConversions }}</div>
        <div class="text-sm text-gray-600">Всего конверсий</div>
      </v-card-text>
    </v-card>
    
    <v-card class="stats-card">
      <v-card-text class="text-center">
        <div class="text-2xl font-bold text-orange-600">{{ formatCurrency(stats.totalEarnings) }}</div>
        <div class="text-sm text-gray-600">Общий заработок</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { ReferralLinkStats } from '@/types'
import { formatCurrency } from '@/utils/formatters'

interface Props {
  stats: ReferralLinkStats
}

defineProps<Props>()
</script>

