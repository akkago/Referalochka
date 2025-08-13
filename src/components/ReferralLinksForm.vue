<template>
  <div class="referral-links-form">
    <StatsCards :stats="stats" class="mb-8" />

    <div class="bg-white rounded-lg p-6 shadow-sm border mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">
        Создать новую ссылку
      </h3>
      
      <v-form ref="form" v-model="isFormValid" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <v-text-field
            v-model="form.name"
            label="Название ссылки"
            placeholder="Введите название ссылки"
            variant="outlined"
            density="comfortable"
            :rules="[v => !!v || 'Название обязательно']"
          />
          
          <v-text-field
            v-model="form.url"
            label="URL"
            placeholder="https://example.com"
            variant="outlined"
            density="comfortable"
            :rules="[v => !!v || 'URL обязателен', v => isValidUrl(v) || 'Введите корректный URL']"
          />
        </div>
        
        <v-textarea
          v-model="form.description"
          label="Описание"
          placeholder="Краткое описание ссылки"
          variant="outlined"
          density="comfortable"
          rows="3"
        />
        
        <div class="flex items-center gap-4">
          <v-checkbox
            v-model="form.isActive"
            label="Активная ссылка"
            color="primary"
          />
          
          <v-btn
            color="primary"
            variant="elevated"
            size="large"
            :disabled="!isFormValid"
            @click="handleCreateLink"
          >
            Создать ссылку
          </v-btn>
        </div>
      </v-form>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm border">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">
        Мои реферальные ссылки
      </h3>
      
      <div class="space-y-4">
        <div
          v-for="link in links"
          :key="link.id"
          class="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h4 class="text-lg font-medium text-gray-900">{{ link.name }}</h4>
                <v-chip
                  :color="link.isActive ? 'success' : 'error'"
                  size="small"
                  variant="outlined"
                >
                  {{ link.isActive ? 'Активна' : 'Неактивна' }}
                </v-chip>
              </div>
              
              <p class="text-gray-600 mb-2">{{ link.description }}</p>
              
              <div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span>Переходов: {{ link.clicks }}</span>
                <span>Конверсий: {{ link.conversions }}</span>
                <span>Заработано: {{ formatCurrency(link.earnings) }}</span>
              </div>
              
              <div class="flex items-center gap-2">
                <v-text-field
                  :model-value="link.url"
                  readonly
                  variant="outlined"
                  density="compact"
                  class="flex-1"
                >
                  <template v-slot:append>
                    <v-btn
                      icon
                      variant="text"
                      size="small"
                      @click="copyToClipboard(link.url)"
                    >
                      <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </div>
            </div>
            
            <div class="flex items-center gap-2 ml-4">
              <v-btn
                icon
                variant="text"
                color="primary"
                @click="handleEditLink(link)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              
              <v-btn
                icon
                variant="text"
                color="error"
                @click="handleDeleteLink(link)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StatsCards from '@/components/StatsCards.vue'
import { useReferralLinks } from '@/composables/useReferralLinks'
import { formatCurrency } from '@/utils/formatters'
import { copyToClipboard } from '@/utils/clipboard'
import { isValidUrl } from '@/utils/validation'

const {
  links,
  stats,
  form,
  isFormValid,
  createLink,
  updateLink,
  deleteLink,
  resetForm
} = useReferralLinks()

const formRef = ref()

const handleCreateLink = async () => {
  const result = await createLink(form)
  
  if (result.success) {
    resetForm()
  } else {
    console.error('Failed to create link:', result.error)
  }
}

const handleEditLink = (link: any) => {
  Object.assign(form, {
    name: link.name,
    url: link.url,
    description: link.description,
    isActive: link.isActive
  })
  
  formRef.value?.$el?.scrollIntoView({ behavior: 'smooth' })
}

const handleDeleteLink = async (link: any) => {
  if (confirm('Вы уверены, что хотите удалить эту ссылку?')) {
    const result = await deleteLink(link.id)
    
    if (!result.success) {
      console.error('Failed to delete link:', result.error)
    }
  }
}
</script>

<style scoped>
.referral-links-form {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
