<template>
  <div class="application-view">
    <div class="pa-6">
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800">
          Заполнение анкеты инвестора
        </h1>
      </div>
      
      <!-- Application Content with Border -->
      <div class="border-2 border-dashed border-blue-400 rounded-lg p-6 bg-white">
        <!-- Form Header -->
        <div class="text-center mb-8">
          <!-- Status Icon -->
          <div class="mb-6">
            <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 mb-4">
              <v-icon
                size="48"
                color="purple"
                class="text-white"
              >
                mdi-file-document-edit
              </v-icon>
            </div>
          </div>
          
          <!-- Title -->
          <h2 class="text-3xl font-bold text-gray-800 mb-4">
            Заполнить анкету
          </h2>
          
          <!-- Description -->
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Необходимо заполнить анкету. После проверки — доступ открыт!
          </p>
        </div>

        <!-- Submit Button -->
        <div class="text-center pt-8">
          <v-btn
            variant="elevated"
            color="purple"
            size="large"
            class="px-8"
            @click="onSubmit"
          >
            <v-icon
              icon="mdi-file-document-edit"
              start
              class="mr-2"
            />
            Заполнить анкету
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Handle form submission
const onSubmit = async () => {
  // Переход к детальной форме инвестора
  router.push({ name: 'investor-form' })
}
</script>

<style scoped>
.application-view {
  min-height: 100vh;
  background-color: #f9fafb;
}

/* Custom purple background for icon */
.bg-purple-100 {
  background-color: #f3e8ff;
}
</style>
