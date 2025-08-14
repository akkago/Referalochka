<template>
  <v-card
    class="project-card h-full d-flex flex-column transition-all duration-200 hover:shadow-lg"
    elevation="1"
    @click="handleCardClick"
  >
    <!-- Card Header -->
    <div class="pa-4 pb-2">
      <!-- Title and Heart icon row -->
      <div class="d-flex justify-space-between align-start mb-2">
        <h3 class="text-lg font-semibold text-gray-800 line-clamp-2 flex-grow-1 mr-2">
          {{ project.title }}
        </h3>
        <v-btn
          icon
          variant="text"
          size="small"
          :color="project.isFavorite ? 'red' : 'grey'"
          @click.stop="handleFavoriteToggle"
          class="flex-shrink-0"
        >
          <v-icon>
            {{ project.isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
      </div>
      
      <!-- Date and ID row -->
      <div class="d-flex justify-space-between align-center mb-2">
        <div class="text-sm date-id-text">
          {{ project.date }}
        </div>
        <div class="text-sm date-id-text">
          ID: {{ project.id }}
        </div>
      </div>
      
      <!-- Description -->
      <p class="text-sm text-gray-600 line-clamp-3">
        {{ project.description }}
      </p>
    </div>
    
    <!-- Card Footer -->
    <div class="pa-4 pt-2 mt-auto">
      <v-btn
        class="custom-button"
        size="small"
        block
        @click.stop="handleDetailsClick"
      >
        Подробнее
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { Project } from '@/types'

interface Props {
  project: Project
}

const props = defineProps<Props>()

const emit = defineEmits<{
  cardClick: [project: Project]
  favoriteToggle: [project: Project]
  detailsClick: [project: Project]
}>()

const handleCardClick = () => {
  emit('cardClick', props.project)
}

const handleFavoriteToggle = () => {
  emit('favoriteToggle', props.project)
}

const handleDetailsClick = () => {
  emit('detailsClick', props.project)
}
</script>

<style scoped>
.project-card {
  cursor: pointer;
  border: 1px solid #e5e7eb;
  border-radius: 12px !important; /* Более скругленные углы как на макете */
}

.project-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
}

.custom-button {
  background-color: #7587F4 !important;
  color: white !important;
  border: none !important;
  height: 120% !important; /* Увеличиваем высоту на 20% */
  min-height: 36px !important; /* Минимальная высота для кнопки small */
}

.custom-button:hover {
  background-color: #6b7ae8 !important;
  color: white !important;
}

.date-id-text {
  color: #9ca3af !important; /* Более блеклый серый цвет */
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
