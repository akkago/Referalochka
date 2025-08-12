<template>
  <div class="projects-view">
    <div class="pa-6">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">
          Проекты
        </h1>
      </div>
      
      <!-- Filters -->
      <ProjectFilters
        @search="handleSearch"
        @stage-change="handleStageChange"
        @industry-change="handleIndustryChange"
        @location-change="handleLocationChange"
        @type-change="handleTypeChange"
        @add-project="handleAddProject"
      />
      
      <!-- Projects Grid -->
      <v-row>
        <v-col
          v-for="project in filteredProjects"
          :key="project.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <ProjectCard
            :project="project"
            @card-click="handleProjectClick"
            @favorite-toggle="handleFavoriteToggle"
            @details-click="handleProjectDetails"
          />
        </v-col>
      </v-row>
      
      <!-- Empty State -->
      <div
        v-if="filteredProjects.length === 0"
        class="text-center py-12"
      >
        <v-icon
          size="64"
          color="grey"
          class="mb-4"
        >
          mdi-folder-open
        </v-icon>
        <h3 class="text-lg font-medium text-gray-600 mb-2">
          Проекты не найдены
        </h3>
        <p class="text-gray-500">
          Попробуйте изменить параметры поиска
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types'
import ProjectFilters from '@/components/ProjectFilters.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import { useProjects } from '@/composables/useProjects'

// Use composable
const {
  filteredProjects,
  updateSearch,
  updateStage,
  updateIndustries,
  updateLocation,
  updateType
} = useProjects()

// Event handlers
const handleSearch = (query: string) => {
  updateSearch(query)
}

const handleStageChange = (stageId: string | null) => {
  updateStage(stageId)
}

const handleIndustryChange = (industryIds: string[]) => {
  updateIndustries(industryIds)
}

const handleLocationChange = (location: string | null) => {
  updateLocation(location)
}

const handleTypeChange = (typeId: string | null) => {
  updateType(typeId)
}

const handleAddProject = () => {
  console.log('Add project clicked')
  // Здесь будет логика добавления проекта
}

const handleProjectClick = (project: Project) => {
  console.log('Project clicked:', project)
  // Здесь будет логика перехода к проекту
}

const handleFavoriteToggle = (project: Project) => {
  console.log('Favorite toggled:', project)
  // Здесь будет логика изменения избранного
}

const handleProjectDetails = (project: Project) => {
  console.log('Project details:', project)
  // Здесь будет логика просмотра деталей проекта
}
</script>

<style scoped>
.projects-view {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>
