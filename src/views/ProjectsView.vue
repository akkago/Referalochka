<template>
  <div class="projects-view">
    <!-- Page Header - над белой панелью -->
    <div class="pa-6 pb-2">
      <h1 class="text-2xl font-bold text-gray-800">
        Проекты
      </h1>
    </div>
    
    <!-- White Panel with rounded top corners -->
    <div class="white-panel">
      <!-- Filters -->
      <div class="pa-6 pb-4">
        <ProjectFilters
          @search="handleSearch"
          @stage-change="handleStageChange"
          @industry-change="handleIndustryChange"
          @location-change="handleLocationChange"
          @type-change="handleTypeChange"
          @add-project="handleAddProject"
        />
      </div>
      
      <!-- Projects Grid -->
      <div class="pa-6 pt-0">
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
  height: calc(100vh - 64px); /* Учитываем высоту верхнего хедера */
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Предотвращаем скролл на контейнере */
}

.white-panel {
  background-color: white;
  border-radius: 16px 16px 0 0; /* Скругленные верхние углы */
  margin: 0 24px; /* Отступы по бокам */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Легкая тень */
  flex: 1; /* Растягиваем панель до низа */
  overflow-y: auto; /* Скролл только внутри панели при необходимости */
}
</style>
