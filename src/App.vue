<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types'
import { currentUser } from '@/data/mockData'
import AppNavigation from '@/components/AppNavigation.vue'
import AppHeader from '@/components/AppHeader.vue'
import ProjectsView from '@/views/ProjectsView.vue'

const handleNavigationClick = (id: string) => {
  console.log('Navigation clicked:', id)
  // Здесь будет логика навигации
}
</script>

<template>
  <v-app>
    <!-- Navigation Drawer -->
    <AppNavigation @navigation-click="handleNavigationClick" />
    
    <!-- Main Content -->
    <v-main class="bg-gray-50">
      <!-- Header -->
      <AppHeader :user="currentUser" />
      
      <!-- Page Content -->
      <ProjectsView />
    </v-main>
  </v-app>
</template>

<style>
/* Global styles */
.v-application {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
