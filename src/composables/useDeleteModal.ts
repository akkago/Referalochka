import { reactive } from 'vue'
import type { DeleteModalConfig } from '@/types'

export function useDeleteModal() {
  const deleteModalConfig = reactive<DeleteModalConfig>({
    isOpen: false,
    data: null,
    onConfirm: () => {},
    onCancel: () => {}
  })

  const openDeleteModal = (id: string, title: string, message: string) => {
    deleteModalConfig.isOpen = true
    deleteModalConfig.data = {
      id,
      title,
      message
    }
  }

  const closeDeleteModal = () => {
    deleteModalConfig.isOpen = false
    deleteModalConfig.data = null
  }

  const setDeleteModalCallbacks = (onConfirm: (id: string) => void, onCancel: () => void) => {
    deleteModalConfig.onConfirm = onConfirm
    deleteModalConfig.onCancel = onCancel
  }

  return {
    deleteModalConfig,
    openDeleteModal,
    closeDeleteModal,
    setDeleteModalCallbacks
  }
}
