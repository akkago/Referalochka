<template>
  <v-dialog
    v-model="isOpen"
    max-width="400"
    persistent
    class="delete-requisites-modal"
  >
    <v-card class="delete-modal-card">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 pb-4">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ DELETE_MODAL.TITLE }}
        </h3>
        <v-btn
          icon
          variant="text"
          size="small"
          @click="handleClose"
          class="text-gray-500 hover:text-gray-700"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <!-- Content -->
      <div class="px-6 pb-6">
        <p class="text-gray-600 leading-relaxed">
          {{ DELETE_MODAL.MESSAGE }}
        </p>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 px-6 pb-6">
        <v-btn
          variant="outlined"
          color="gray"
          @click="handleCancel"
          class="px-6"
        >
          {{ MODAL_ACTIONS.CANCEL }}
        </v-btn>
        <v-btn
          color="error"
          variant="elevated"
          @click="handleConfirm"
          class="px-6"
        >
          {{ MODAL_ACTIONS.DELETE }}
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DELETE_MODAL } from '@/constants/requisites'
import { MODAL_ACTIONS } from '@/constants/modals'
import type { DeleteModalConfig } from '@/types'

interface Props {
  config: DeleteModalConfig
}

interface Emits {
  (e: 'confirm', id: string): void
  (e: 'cancel'): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isOpen = computed(() => props.config.isOpen)

const handleConfirm = () => {
  if (props.config.data) {
    emit('confirm', props.config.data.id)
  }
}

const handleCancel = () => {
  emit('cancel')
}

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.delete-requisites-modal {
  z-index: 1000;
}

.delete-modal-card {
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.delete-modal-card :deep(.v-card) {
  border-radius: 12px;
}
</style>
