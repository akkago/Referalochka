<template>
  <CommonProjectFilters
    search-placeholder="Поиск"
    add-button-text="Добавить проект"
    @search="handleSearch"
    @stage-change="handleStageChange"
    @industry-change="handleIndustryChange"
    @region-change="handleLocationChange"
    @type-change="handleTypeChange"
    @add-project="handleAddProject"
  />
</template>

<script setup lang="ts">
import CommonProjectFilters from './CommonProjectFilters.vue'

const emit = defineEmits<{
  search: [query: string]
  stageChange: [stageId: string | null]
  industryChange: [industryIds: string[]]
  locationChange: [location: string | null]
  typeChange: [typeId: string | null]
  addProject: []
}>()

const handleSearch = (query: string) => {
  emit('search', query)
}

const handleStageChange = (stage: string) => {
  emit('stageChange', stage === 'Все стадии' ? null : stage)
}

const handleIndustryChange = (industry: string) => {
  emit('industryChange', industry === 'Все отрасли' ? [] : [industry])
}

const handleLocationChange = (location: string) => {
  emit('locationChange', location === 'Все регионы' ? null : location)
}

const handleTypeChange = (type: string) => {
  emit('typeChange', type === 'Все типы' ? null : type)
}

const handleAddProject = () => {
  emit('addProject')
}
</script>

<style scoped>
.filters-container {
  padding: 0;
}

.filters-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
}

.search-input {
  min-width: 350px !important;
  max-width: 350px !important;
}

.filter-select {
  min-width: 160px !important;
  max-width: 160px !important;
}

.filter-btn {
  min-width: 160px !important;
  max-width: 160px !important;
  justify-content: flex-start !important;
}

.add-project-btn {
  margin-left: auto !important;
  background-color: #7587F4 !important;
  color: white !important;
  white-space: nowrap !important;
}

.add-project-btn:hover {
  background-color: #6b7ae8 !important;
}
</style>
