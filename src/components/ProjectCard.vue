<template>
  <v-card
    class="project-card h-full d-flex flex-column transition-all duration-200 hover:shadow-lg"
    elevation="1"
    @click="handleCardClick"
  >
    <!-- Card Header -->
    <div class="pa-4 pb-2">
      <div class="d-flex justify-space-between align-start mb-2">
        <div class="text-sm text-gray-500">
          {{ project.date }}
        </div>
        <v-btn
          icon
          variant="text"
          size="small"
          :color="project.isFavorite ? 'red' : 'grey'"
          @click.stop="handleFavoriteToggle"
        >
          <v-icon>
            {{ project.isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
      </div>
      
      <div class="text-sm text-gray-500 mb-1">
        ID: {{ project.id }}
      </div>
      
      <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
        {{ project.title }}
      </h3>
      
      <p class="text-sm text-gray-600 line-clamp-3">
        {{ project.description }}
      </p>
    </div>
    
    <!-- Card Footer -->
    <div class="pa-4 pt-2 mt-auto">
      <v-btn
        color="primary"
        variant="outlined"
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
}

.project-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
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
