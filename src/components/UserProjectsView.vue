<template>
  <div class="user-projects-view">
    <div class="pa-6">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 inline-block">
          {{ USER_PROJECTS_SECTIONS.TITLE }}
        </h1>
      </div>
      
      <!-- Filters and Search -->
      <UserProjectFilters
        :initial-filters="filters"
        @filters-change="handleFiltersChange"
        @add-project="handleAddProject"
      />
      
      <!-- Projects Grid -->
      <div class="mt-8">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex justify-center items-center py-12">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
          />
        </div>
        
        <!-- Empty State -->
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
        
        <!-- Projects Grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
            @edit="handleEditProject"
            @toggle="handleToggleProject"
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

// Composable
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

// Computed
const searchQuery = computed(() => filters.value.search.toLowerCase())

const filteredProjects = computed(() => {
  let filtered = projects.value

  // Search filter
  if (searchQuery.value) {
    filtered = filtered.filter(project =>
      project.title.toLowerCase().includes(searchQuery.value) ||
      project.id.toLowerCase().includes(searchQuery.value)
    )
  }

  // В реальном приложении здесь были бы дополнительные фильтры
  // по стадии, отрасли, региону и типу

  return filtered
})

// Methods
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

// Lifecycle
onMounted(() => {
  loadProjects()
})
</script>

<style scoped>
.user-projects-view {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>
