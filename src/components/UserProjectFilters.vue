<template>
  <CommonProjectFilters
    :search-placeholder="USER_PROJECTS_SECTIONS.SEARCH_PLACEHOLDER"
    :add-button-text="USER_PROJECTS_SECTIONS.ADD_PROJECT"
    :initial-filters="filters"
    @search="handleSearchChange"
    @stage-change="handleStageChange"
    @industry-change="handleIndustryChange"
    @region-change="handleRegionChange"
    @type-change="handleTypeChange"
    @add-project="handleAddProject"
  />
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { ProjectFiltersState } from '@/types'
import { USER_PROJECTS_SECTIONS } from '@/constants/userProjects'
import CommonProjectFilters from './CommonProjectFilters.vue'

interface Props {
  initialFilters?: Partial<ProjectFiltersState>
}

interface Emits {
  (e: 'filters-change', filters: ProjectFiltersState): void
  (e: 'add-project'): void
}

const props = withDefaults(defineProps<Props>(), {
  initialFilters: () => ({})
})

const emit = defineEmits<Emits>()

const filters = reactive<ProjectFiltersState>({
  search: '',
  stage: '',
  industry: '',
  region: '',
  type: '',
  ...props.initialFilters
})

const handleSearchChange = (query: string) => {
  filters.search = query
  emitFiltersChange()
}

const handleStageChange = (stage: string) => {
  filters.stage = stage
  emitFiltersChange()
}

const handleIndustryChange = (industry: string) => {
  filters.industry = industry
  emitFiltersChange()
}

const handleRegionChange = (region: string) => {
  filters.region = region
  emitFiltersChange()
}

const handleTypeChange = (type: string) => {
  filters.type = type
  emitFiltersChange()
}

const emitFiltersChange = () => {
  emit('filters-change', { ...filters })
}

const handleAddProject = () => {
  emit('add-project')
}

// Watch for external filter changes
watch(() => props.initialFilters, (newFilters) => {
  if (newFilters) {
    Object.assign(filters, newFilters)
  }
}, { deep: true })
</script>

<style scoped>
.filters-container {
  padding: 0;
}

.filters-row {
  display: flex;
  align-items: center;
  gap: 16px; /* Отступы между элементами */
  flex-wrap: nowrap; /* Запрещаем перенос на новую строку */
  width: 100%;
}

.search-input {
  flex: 2 !important; /* Занимает в 2 раза больше пространства */
  min-width: 300px !important;
}

.filter-select {
  flex: 1 !important; /* Занимает доступное пространство */
  min-width: 120px !important;
}

.add-project-btn {
  margin-left: auto !important;
  background-color: #7587F4 !important;
  color: white !important;
  white-space: nowrap !important; /* Запрещаем перенос текста в кнопке */
}

.add-project-btn:hover {
  background-color: #6b7ae8 !important;
}
</style>
