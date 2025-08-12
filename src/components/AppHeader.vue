<template>
  <v-app-bar
    flat
    class="bg-white border-b border-gray-200 px-6"
    height="64"
  >
    <v-spacer />
    
    <div class="d-flex align-center gap-4">
      <!-- Balance -->
      <div class="text-right">
        <div class="text-sm text-gray-500">Баланс</div>
        <div class="text-lg font-semibold text-gray-800">
          {{ formattedBalance }} ₽
        </div>
      </div>
      
      <!-- Notifications -->
      <v-btn
        icon
        variant="text"
        size="small"
        class="text-gray-600"
      >
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      
      <!-- User Avatar -->
      <div class="d-flex align-center gap-3">
        <v-avatar
          size="40"
          color="blue"
          class="text-white font-semibold"
        >
          {{ userInitials }}
        </v-avatar>
        
        <div class="text-left">
          <div class="text-sm font-medium text-gray-800">
            {{ user.name }}
          </div>
          <div class="text-xs text-gray-500">
            {{ userTypeLabel }}
          </div>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import type { User } from '@/types'
import { useUser } from '@/composables/useUser'

interface Props {
  user: User
}

const props = defineProps<Props>()
const { formattedBalance, userTypeLabel, userInitials } = useUser(props.user)
</script>
