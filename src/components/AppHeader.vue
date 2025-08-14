<template>
  <v-app-bar
    flat
    class="bg-white border-b border-gray-200 px-6"
    height="64"
  >
    <v-spacer />
    
    <div class="d-flex align-center gap-3">
      <!-- Balance (first) with icon -->
      <div class="d-flex align-center gap-2">
        <v-icon size="20" class="text-gray-600">mdi-wallet</v-icon>
        <div class="text-lg font-semibold text-gray-800">
          {{ formattedBalance }}
        </div>
      </div>
      
      <!-- Balance (second - duplicate) with icon -->
      <div class="d-flex align-center gap-2">
        <v-icon size="20" class="text-gray-600">mdi-currency-rub</v-icon>
        <div class="text-lg font-semibold text-gray-800">
          {{ formattedBalanceWithoutSymbol }} P
        </div>
      </div>
      
      <!-- Heart Icon -->
      <v-btn
        icon
        variant="text"
        size="small"
        class="text-gray-600"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      
      <!-- Notifications -->
      <v-btn
        icon
        variant="text"
        size="small"
        class="text-gray-600"
      >
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      
      <!-- User Profile with Dropdown -->
      <div class="d-flex align-center gap-2">
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
        
        <!-- Dropdown Arrow -->
        <v-btn
          icon
          variant="text"
          size="small"
          class="text-gray-600"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
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
const { formattedBalance, formattedBalanceWithoutSymbol, userTypeLabel, userInitials } = useUser(props.user)
</script>
