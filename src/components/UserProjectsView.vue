<template>
  <div class="user-projects-view">
    <div class="pa-6 pb-2">
      <h1 class="text-2xl font-bold text-gray-800">
        {{ USER_PROJECTS_SECTIONS.TITLE }}
      </h1>
    </div>
    
    <div class="white-panel">
      <div class="pa-6 pb-4">
        <UserProjectFilters
          :initial-filters="filters"
          @filters-change="handleFiltersChange"
          @add-project="handleAddProject"
        />
      </div>
      
      <div class="pa-6 pt-0">
        <div v-if="isLoading" class="flex justify-center items-center py-12">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
          />
        </div>
        
        <div v-else-if="filteredProjects.length === 0" class="text-center py-12">
          <v-icon size="64" color="grey" class="mb-4">
            mdi-folder-open
          </v-icon>
          <h3 class="text-lg font-medium text-gray-600 mb-2">
            Проекты не найдены
          </h3>
          <p class="text-gray-500 mb-4">
            {{ searchQuery ? 'Попробуйте изменить параметры поиска' : 'У вас пока нет проектов' }}
          </p>
          <v-btn
            v-if="!searchQuery"
            color="primary"
            variant="elevated"
            @click="handleAddProject"
          >
            <v-icon start>mdi-plus</v-icon>
            {{ USER_PROJECTS_SECTIONS.ADD_PROJECT }}
          </v-btn>
        </div>
        
        <div v-else class="grid grid-cols-2 gap-6">
          <UserProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
            @edit="handleEditProject"
            @toggle="handleToggleProject"
            @favorite-toggle="handleFavoriteToggle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { ProjectFiltersState } from '@/types'
import { USER_PROJECTS_SECTIONS } from '@/constants/userProjects'
import { useUserProjects } from '@/composables/useUserProjects'
import UserProjectFilters from './UserProjectFilters.vue'
import UserProjectCard from './UserProjectCard.vue'

const router = useRouter()

const {
  isLoading,
  projects,
  filters,
  loadProjects,
  updateFilters,
  toggleProject,
  editProject,
  addProject
} = useUserProjects()

const searchQuery = computed(() => filters.value.search.toLowerCase())

const filteredProjects = computed(() => {
  let filtered = projects.value

  if (searchQuery.value) {
    filtered = filtered.filter(project =>
      project.title.toLowerCase().includes(searchQuery.value) ||
      project.id.toLowerCase().includes(searchQuery.value)
    )
  }

  return filtered
})

const handleFiltersChange = (newFilters: ProjectFiltersState) => {
  updateFilters(newFilters)
}

const handleAddProject = () => {
  addProject()
}

const handleEditProject = (projectId: string) => {
  editProject(projectId)
}

const handleToggleProject = async (projectId: string, isEnabled: boolean) => {
  const result = await toggleProject(projectId, isEnabled)
  
  if (result.success) {
    console.log(`Project ${projectId} ${isEnabled ? 'enabled' : 'disabled'}`)
  } else {
    console.error('Failed to toggle project:', result.error)
  }
}

const handleFavoriteToggle = (projectId: string) => {
  console.log('Favorite toggled for project:', projectId)
}

onMounted(() => {
  loadProjects()
})
</script>

<style scoped>
.user-projects-view {
  height: calc(100vh - 64px);
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.white-panel {
  background-color: white;
  border-radius: 16px 16px 0 0;
  margin: 0 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex: 1;
  overflow-y: auto;
}

.grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 1.5rem !important;
}
</style>
