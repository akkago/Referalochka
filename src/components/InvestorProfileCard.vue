<template>
  <div class="investor-profile-card">
    <div class="text-center">
      <!-- Status Icon -->
      <div class="mb-6">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 mb-4">
          <v-icon
            size="48"
            :color="currentProfile.iconColor"
            class="text-white"
          >
            {{ currentProfile.icon }}
          </v-icon>
        </div>
      </div>
      
      <!-- Title -->
      <h2 class="text-3xl font-bold text-gray-800 mb-4">
        {{ currentProfile.title }}
      </h2>
      
      <!-- Description -->
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        {{ currentProfile.description }}
      </p>
      
      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <v-btn
          v-for="action in currentProfile.actions"
          :key="action.id"
          :variant="action.variant"
          :color="action.color"
          size="large"
          class="px-8"
          @click="handleActionClick(action.id)"
        >
          <v-icon
            v-if="action.icon"
            :icon="action.icon"
            start
            class="mr-2"
          />
          {{ action.title }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfile } from '@/composables/useProfile'

const { currentProfile } = useProfile()

const emit = defineEmits<{
  actionClick: [actionId: string]
}>()

const handleActionClick = (actionId: string) => {
  emit('actionClick', actionId)
  console.log('Action clicked:', actionId)
}
</script>

<style scoped>
.investor-profile-card {
  padding: 2rem 0;
}

/* Custom purple background for icon */
.bg-purple-100 {
  background-color: #f3e8ff;
}
</style>
