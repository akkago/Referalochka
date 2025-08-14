<template>
  <v-navigation-drawer
    permanent
    class="bg-white border-r border-gray-200 transition-all duration-300"
    :width="isCollapsed ? 80 : 280"
  >
    <div class="pa-4 d-flex flex-column h-100">
      <!-- Header with collapse button -->
      <div class="d-flex justify-space-between align-center mb-6">
        <div 
          v-if="!isCollapsed" 
          class="text-h6 font-bold text-gray-800"
        >
          {{ APP_NAME }}
        </div>
        
        <!-- Collapse button -->
        <v-btn
          icon
          variant="text"
          size="small"
          class="text-gray-600"
          @click="toggleCollapse"
        >
          <v-icon>
            {{ isCollapsed ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left' }}
          </v-icon>
        </v-btn>
      </div>
      
      <!-- Main Navigation -->
      <nav class="space-y-2 flex-grow-1">
        <!-- Развёрнутое состояние -->
        <v-list-item
          v-if="!isCollapsed"
          v-for="item in mainNavigationItems"
          :key="item.id"
          :class="[
            'rounded-lg mb-1 transition-all duration-200',
            item.isActive 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          ]"
          :prepend-icon="item.icon"
          @click="handleNavigationClick(item.id)"
        >
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
          
          <template v-slot:append v-if="item.badge">
            <v-badge
              :content="item.badge"
              color="primary"
              size="small"
            />
          </template>
        </v-list-item>
        
        <!-- Свёрнутое состояние -->
        <div
          v-if="isCollapsed"
          v-for="item in mainNavigationItems"
          :key="`collapsed-${item.id}`"
          :class="[
            'collapsed-nav-item rounded-lg mb-1 transition-all duration-200 cursor-pointer',
            item.isActive 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          ]"
          :title="item.title"
          @click="handleNavigationClick(item.id)"
        >
          <v-icon size="20">
            {{ item.icon }}
          </v-icon>
        </div>
      </nav>
      
      <!-- Bottom Navigation -->
      <nav class="space-y-2 mt-auto">
        <!-- Развёрнутое состояние -->
        <v-list-item
          v-if="!isCollapsed"
          v-for="item in bottomNavigationItems"
          :key="item.id"
          :class="[
            'rounded-lg mb-1 transition-all duration-200',
            item.isActive 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          ]"
          :prepend-icon="item.icon"
          @click="handleNavigationClick(item.id)"
        >
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
        
        <!-- Свёрнутое состояние -->
        <div
          v-if="isCollapsed"
          v-for="item in bottomNavigationItems"
          :key="`collapsed-${item.id}`"
          :class="[
            'collapsed-nav-item rounded-lg mb-1 transition-all duration-200 cursor-pointer',
            item.isActive 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          ]"
          :title="item.title"
          @click="handleNavigationClick(item.id)"
        >
          <v-icon size="20">
            {{ item.icon }}
          </v-icon>
        </div>
      </nav>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useNavigation } from '@/composables/useNavigation'
import { APP_NAME } from '@/constants'

const { updatedNavigationItems, navigateTo } = useNavigation()

const isCollapsed = ref(false)

// Разделяем элементы навигации на основные и нижние
const mainNavigationItems = computed(() => {
  return updatedNavigationItems.value.filter(item => 
    !['help', 'settings'].includes(item.id)
  )
})

const bottomNavigationItems = computed(() => {
  return updatedNavigationItems.value.filter(item => 
    ['help', 'settings'].includes(item.id)
  )
})

const handleNavigationClick = (id: string) => {
  navigateTo(id)
}

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  // Сохраняем состояние в localStorage
  localStorage.setItem('sidebarCollapsed', isCollapsed.value.toString())
}

// Загружаем состояние при монтировании компонента
onMounted(() => {
  const savedState = localStorage.getItem('sidebarCollapsed')
  if (savedState !== null) {
    isCollapsed.value = savedState === 'true'
  }
})
</script>

<style scoped>
.v-list-item {
  min-height: 48px;
  padding: 12px 16px;
}

.v-list-item:hover {
  transform: translateX(2px);
}

/* Принудительные стили для активного элемента в развёрнутом состоянии */
.v-navigation-drawer:deep(.v-list-item.bg-blue-50) {
  background-color: #eff6ff !important; /* bg-blue-50 */
  color: #2563eb !important; /* text-blue-600 */
}

.v-navigation-drawer:deep(.v-list-item.bg-blue-50 .v-list-item__prepend .v-icon) {
  color: #2563eb !important; /* text-blue-600 */
}

.v-navigation-drawer:deep(.v-list-item.bg-blue-50 .v-list-item-title) {
  color: #2563eb !important; /* text-blue-600 */
}

/* Стили для свёрнутого состояния */
.collapsed-nav-item {
  min-height: 48px;
  padding: 12px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.collapsed-nav-item:hover {
  transform: translateX(2px);
}

.collapsed-nav-item .v-icon {
  margin: 0;
  font-size: 20px;
  color: inherit !important;
}

/* Принудительные стили для активного элемента в свёрнутом состоянии */
.collapsed-nav-item.bg-blue-50 {
  background-color: #eff6ff !important; /* bg-blue-50 */
  color: #2563eb !important; /* text-blue-600 */
}

/* Специфичные стили для иконок в свёрнутом состоянии */
.collapsed-nav-item:not(.bg-blue-50) .v-icon {
  color: #6b7280 !important; /* text-gray-600 */
}

.collapsed-nav-item.bg-blue-50 .v-icon {
  color: #2563eb !important; /* text-blue-600 */
}

/* Стили для hover состояния */
.collapsed-nav-item:hover:not(.bg-blue-50) .v-icon {
  color: #374151 !important; /* text-gray-700 */
}

.collapsed-nav-item:hover.bg-blue-50 .v-icon {
  color: #1d4ed8 !important; /* text-blue-700 */
}
</style>

<style>
/* Глобальные стили для принудительного применения */
.v-list-item.bg-blue-50 {
  background-color: #eff6ff !important;
  color: #2563eb !important;
}

.v-list-item.bg-blue-50 .v-icon {
  color: #2563eb !important;
}

.v-list-item.bg-blue-50 .v-list-item-title {
  color: #2563eb !important;
}

.collapsed-nav-item.bg-blue-50 {
  background-color: #eff6ff !important;
  color: #2563eb !important;
}

.collapsed-nav-item.bg-blue-50 .v-icon {
  color: #2563eb !important;
}
</style>
