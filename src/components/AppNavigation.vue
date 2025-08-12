<template>
  <v-navigation-drawer
    permanent
    class="bg-white border-r border-gray-200"
    width="280"
  >
    <div class="pa-4">
      <div class="text-h6 font-bold text-gray-800 mb-6">
        {{ APP_NAME }}
      </div>
      
      <nav class="space-y-2">
        <v-list-item
          v-for="item in navigationItems"
          :key="item.id"
          :class="[
            'rounded-lg mb-1 transition-all duration-200',
            item.isActive 
              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
              : 'text-gray-600 hover:bg-gray-50'
          ]"
          :prepend-icon="item.icon"
          :title="item.title"
          @click="handleNavigationClick(item.id)"
        >
          <template v-slot:append v-if="item.badge">
            <v-badge
              :content="item.badge"
              color="error"
              size="small"
            />
          </template>
        </v-list-item>
      </nav>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationItem } from '@/types'
import { navigationItems } from '@/data/mockData'
import { APP_NAME } from '@/constants'

const emit = defineEmits<{
  navigationClick: [id: string]
}>()

const handleNavigationClick = (id: string) => {
  emit('navigationClick', id)
}
</script>

<style scoped>
.v-list-item {
  min-height: 48px;
  padding: 12px 16px;
}

.v-list-item:hover {
  transform: translateX(2px);
}
</style>
