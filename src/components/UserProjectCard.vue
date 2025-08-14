<template>
  <div class="user-project-card">
    <div class="project-card-content">
      <!-- Header with Status and Toggle -->
      <div class="flex justify-between items-center mb-3">
        <!-- Status -->
        <div class="flex items-center gap-3">
          <div class="status-dot w-3 h-3 rounded-full bg-blue-500 flex-shrink-0 shadow-sm mr-1"></div>
          <span class="text-sm text-blue-600 font-medium">
            {{ project.statusText }}
          </span>
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
      
      <!-- Title -->
      <div class="mb-2">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ project.title }}
        </h3>
      </div>
      
      <!-- Date and ID row -->
      <div class="d-flex justify-space-between align-center mb-2">
        <div class="text-sm date-id-text">
          {{ project.date }}
        </div>
        <div class="text-sm date-id-text d-flex align-center gap-1">
          ID: {{ project.id }}
          <v-btn
            icon
            variant="text"
            size="x-small"
            @click="copyToClipboard(project.id, 'ID скопирован')"
            class="copy-btn"
          >
            <v-icon size="small">mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </div>
      
      <!-- Project Link -->
      <div class="mb-3 d-flex align-center gap-1">
        <span class="text-sm text-gray-600">
          Ссылка на проект {{ project.projectLink }}
        </span>
        <v-btn
          icon
          variant="text"
          size="x-small"
          @click="copyToClipboard(project.projectLink, 'Ссылка скопирована')"
          class="copy-btn"
        >
          <v-icon size="small">mdi-content-copy</v-icon>
        </v-btn>
      </div>
      
      <!-- Metrics -->
      <div class="flex items-center gap-8 mb-3">
        <!-- Clicks -->
        <div class="flex items-center gap-2">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="flex items-center gap-1 cursor-pointer">
                <v-icon size="small" class="text-gray-500">mdi-cursor-pointer</v-icon>
                <span class="text-sm text-gray-700">{{ project.views }}</span>
              </div>
            </template>
            <span>Количество кликов</span>
          </v-tooltip>
        </div>
        
        <!-- Comments -->
        <div class="flex items-center gap-2">
          <v-tooltip location="top">
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="flex items-center gap-1 cursor-pointer">
                <v-icon size="small" class="text-gray-500">mdi-comment-outline</v-icon>
                <span class="text-sm text-gray-700">{{ project.shares }}</span>
              </div>
            </template>
            <span>Количество комментариев</span>
          </v-tooltip>
        </div>
      </div>
      
      <!-- Action Button -->
      <div class="flex justify-end">
        <v-btn
          variant="outlined"
          size="small"
          @click="handleEdit"
          class="px-4 edit-btn"
        >
          Редактировать
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UserProject } from '@/types'

interface Props {
  project: UserProject
}

interface Emits {
  (e: 'edit', projectId: string): void
  (e: 'toggle', projectId: string, isEnabled: boolean): void
  (e: 'favorite-toggle', projectId: string): void
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

.project-card-content {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px; /* Уменьшили с 24px до 16px */
  height: 100%;
}

.date-id-text {
  color: #9ca3af !important; /* Блеклый серый цвет */
}

.edit-btn {
  background-color: transparent !important;
  color: #6b7280 !important;
  border-color: #d1d5db !important;
}

.edit-btn:hover {
  background-color: #f3f4f6 !important;
  color: #374151 !important;
  border-color: #9ca3af !important;
}

.status-dot {
  background-color: #3b82f6 !important;
  border: 1px solid #3b82f6 !important;
  min-width: 12px !important;
  min-height: 12px !important;
  display: block !important;
  position: relative !important;
  z-index: 1 !important;
}

.copy-btn {
  color: #6b7280 !important;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.copy-btn:hover {
  opacity: 1;
  color: #3b82f6 !important;
}
</style>
