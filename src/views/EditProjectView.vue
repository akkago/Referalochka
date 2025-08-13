<template>
  <div class="edit-project-page">
    <EditProjectForm
      :initial-data="initialFormData"
      :project-id="projectId"
      @submit="handleSubmit"
      @cancel="handleCancel"
      @toggle="handleToggle"
      @stop-advertising="handleStopAdvertising"
      @launch-advertising="handleLaunchAdvertising"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import type { EditProjectForm as EditProjectFormType } from '@/types'
import { ROUTES } from '@/constants'
import { editProjectFormData } from '@/data/mockData'
import EditProjectForm from '@/components/EditProjectForm.vue'

const router = useRouter()
const route = useRoute()

// Get project ID from route params
const projectId = route.params.id as string

// Initial form data with filled values for demonstration
const initialFormData: Partial<EditProjectFormType> = editProjectFormData

const handleSubmit = async (form: EditProjectFormType) => {
  try {
    console.log('Project form submitted:', form)
    
    // В реальном приложении здесь был бы API вызов для обновления проекта
    // await updateProject(form)
    
    // Перенаправление на страницу проектов пользователя
    router.push({ name: ROUTES.USER_PROJECTS })
  } catch (error) {
    console.error('Failed to update project:', error)
  }
}

const handleCancel = () => {
  // Возврат на предыдущую страницу
  router.back()
}

const handleToggle = (isEnabled: boolean) => {
  console.log('Project enabled:', isEnabled)
  // В реальном приложении здесь был бы API вызов для изменения статуса
}

const handleStopAdvertising = () => {
  console.log('Stop advertising clicked')
  // В реальном приложении здесь был бы API вызов для остановки рекламы
}

const handleLaunchAdvertising = () => {
  console.log('Launch advertising clicked')
  // В реальном приложении здесь был бы API вызов для запуска рекламы
}
</script>

<style scoped>
.edit-project-page {
  min-height: 100vh;
}
</style>
