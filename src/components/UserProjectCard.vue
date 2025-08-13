<template>
  <div class="user-project-card">
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <!-- Header -->
      <div class="flex justify-between items-start mb-4">
        <!-- Status and Title -->
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2 h-2 rounded-full bg-blue-500"></div>
            <span class="text-sm text-blue-600 font-medium">
              {{ project.statusText }}
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-1">
            {{ project.title }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ project.date }}
          </p>
        </div>
        
        <!-- Toggle Switch -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Включить проект</span>
          <v-switch
            v-model="isEnabled"
            color="primary"
            hide-details
            @change="handleToggleChange"
          />
        </div>
      </div>
      
      <!-- Project Info -->
      <div class="space-y-3 mb-4">
        <!-- Project ID -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">ID: {{ project.id }}</span>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="copyToClipboard(project.id, 'ID скопирован')"
            class="text-gray-500 hover:text-gray-700"
          >
            <v-icon size="small">mdi-content-copy</v-icon>
          </v-btn>
        </div>
        
        <!-- Project Link -->
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">
            Ссылка на проект {{ project.projectLink }}
          </span>
          <v-btn
            icon
            variant="text"
            size="small"
            @click="copyToClipboard(project.projectLink, 'Ссылка скопирована')"
            class="text-gray-500 hover:text-gray-700"
          >
            <v-icon size="small">mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </div>
      
      <!-- Metrics -->
      <div class="flex items-center gap-6 mb-4">
        <!-- Views -->
        <div class="flex items-center gap-2">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="flex items-center gap-1 cursor-pointer">
                <v-icon size="small" class="text-gray-500">mdi-eye</v-icon>
                <span class="text-sm text-gray-700">{{ project.views }}</span>
              </div>
            </template>
            <span>{{ USER_PROJECT_METRICS.VIEWS }}</span>
          </v-tooltip>
        </div>
        
        <!-- Shares -->
        <div class="flex items-center gap-2">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="flex items-center gap-1 cursor-pointer">
                <v-icon size="small" class="text-gray-500">mdi-share-variant</v-icon>
                <span class="text-sm text-gray-700">{{ project.shares }}</span>
              </div>
            </template>
            <span>{{ USER_PROJECT_METRICS.SHARES }}</span>
          </v-tooltip>
        </div>
      </div>
      
      <!-- Action Button -->
      <div class="flex justify-end">
        <v-btn
          variant="outlined"
          color="gray"
          size="small"
          @click="handleEdit"
          class="px-4"
        >
          {{ USER_PROJECT_ACTIONS.EDIT }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UserProject } from '@/types'
import { USER_PROJECT_ACTIONS, USER_PROJECT_METRICS } from '@/constants/userProjects'

interface Props {
  project: UserProject
}

interface Emits {
  (e: 'edit', projectId: string): void
  (e: 'toggle', projectId: string, isEnabled: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isEnabled = ref(props.project.isEnabled)

const handleEdit = () => {
  emit('edit', props.project.id)
}

const handleToggleChange = (value: boolean) => {
  emit('toggle', props.project.id, value)
}

const copyToClipboard = async (text: string, message: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // В реальном приложении здесь можно показать уведомление
    console.log(message)
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }
}
</script>

<style scoped>
.user-project-card {
  transition: all 0.2s ease-in-out;
}

.user-project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
