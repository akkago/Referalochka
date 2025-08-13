<template>
  <div class="add-project-page">
    <AddProjectForm
      :initial-data="initialFormData"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { AddProjectForm as AddProjectFormType } from '@/types'
import { ROUTES } from '@/constants'
import AddProjectForm from '@/components/AddProjectForm.vue'

const router = useRouter()

// Initial form data (можно передавать из предыдущей страницы)
const initialFormData: Partial<AddProjectFormType> = {}

const handleSubmit = async (form: AddProjectFormType) => {
  try {
    console.log('Project form submitted:', form)
    
    // В реальном приложении здесь был бы API вызов для создания проекта
    // await createProject(form)
    
    // Перенаправление на страницу проектов пользователя
    router.push({ name: ROUTES.USER_PROJECTS })
  } catch (error) {
    console.error('Failed to create project:', error)
  }
}

const handleCancel = () => {
  // Возврат на предыдущую страницу
  router.back()
}
</script>

<style scoped>
.add-project-page {
  min-height: 100vh;
}
</style>
