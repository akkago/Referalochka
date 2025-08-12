<template>
  <div class="form-progress">
    <div class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-gray-700">
          Прогресс заполнения
        </span>
        <span class="text-sm text-gray-500">
          {{ progress }}%
        </span>
      </div>
      
      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>

    <!-- Sections Progress -->
    <div class="space-y-2">
      <div
        v-for="section in sections"
        :key="section.id"
        class="flex items-center justify-between p-2 rounded-lg"
        :class="[
          isSectionComplete(section.id)
            ? 'bg-green-50 border border-green-200'
            : 'bg-gray-50 border border-gray-200'
        ]"
      >
        <div class="flex items-center">
          <v-icon
            :icon="isSectionComplete(section.id) ? 'mdi-check-circle' : 'mdi-circle-outline'"
            :color="isSectionComplete(section.id) ? 'success' : 'grey'"
            size="small"
            class="mr-2"
          />
          <span
            class="text-sm"
            :class="[
              isSectionComplete(section.id)
                ? 'text-green-700 font-medium'
                : 'text-gray-600'
            ]"
          >
            {{ section.title }}
          </span>
        </div>
        
        <span
          class="text-xs"
          :class="[
            isSectionComplete(section.id)
              ? 'text-green-600'
              : 'text-gray-500'
          ]"
        >
          {{ getSectionProgress(section.id) }}/{{ section.fields.length }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormSection } from '@/types'

interface Props {
  sections: FormSection[]
  progress: number
  formData: Record<string, any>
}

const props = defineProps<Props>()

// Check if section is complete
const isSectionComplete = (sectionId: string) => {
  const section = props.sections.find(s => s.id === sectionId)
  if (!section) return false
  
  return section.fields.every(field => {
    const value = props.formData[field.id]
    return field.required ? (value !== null && value !== '') : true
  })
}

// Get section progress
const getSectionProgress = (sectionId: string) => {
  const section = props.sections.find(s => s.id === sectionId)
  if (!section) return 0
  
  return section.fields.filter(field => {
    const value = props.formData[field.id]
    return value !== null && value !== ''
  }).length
}
</script>

<style scoped>
.form-progress {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
}
</style>
