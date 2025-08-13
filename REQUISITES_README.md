# Компонент Реквизиты

## Описание
Компонент для управления реквизитами компании, включающий информацию о компании, руководителе и банковских реквизитах.

## Структура файлов

### Основные компоненты
- `src/components/RequisitesCard.vue` - Основной компонент формы реквизитов
- `src/views/RequisitesView.vue` - Страница реквизитов с табами
- `src/composables/useRequisites.ts` - Composable для управления данными реквизитов

### Типы и интерфейсы
- `src/types/index.ts` - Интерфейсы для типизации данных реквизитов
- `src/constants/requisites.ts` - Константы для лейблов, сообщений и действий
- `src/utils/requisitesValidation.ts` - Утилиты для валидации полей

### Данные
- `src/data/mockData.ts` - Mock данные для реквизитов

## Интерфейсы

### RequisitesData
```typescript
interface RequisitesData {
  company: CompanyDetails
  head: HeadDetails
  bankRequisites: BankRequisite[]
}
```

### CompanyDetails
```typescript
interface CompanyDetails {
  fullName: string
  shortName: string
  inn: string
  kpp: string
  ogrn: string
  legalAddress: string
  mailingAddress: string
}
```

### HeadDetails
```typescript
interface HeadDetails {
  position: string
  fullName: string
  basis: string
}
```

### BankRequisite
```typescript
interface BankRequisite {
  id: string
  bic: string
  currentAccount: string
  bank: string
  correspondentAccount: string
  isDefault: boolean
}
```

## Функциональность

### Основные возможности
1. **Редактирование данных компании** - полное и краткое название, ИНН, КПП, ОГРН, адреса
2. **Управление информацией о руководителе** - должность, ФИО, основание
3. **Банковские реквизиты** - добавление, удаление, установка по умолчанию
4. **Валидация полей** - проверка корректности введенных данных
5. **Сохранение и обновление** - отправка данных на сервер

### Валидация
- **ИНН** - 10 цифр для юр. лиц, 12 цифр для ИП
- **КПП** - 9 цифр
- **ОГРН** - 13 цифр для юр. лиц, 15 цифр для ИП
- **БИК** - 9 цифр (не обязательное поле)
- **Обязательные поля** - проверка заполнения

## Использование

### RequisitesCard
```vue
<template>
  <RequisitesCard
    :initial-data="requisitesData"
    @submit="handleSubmit"
    @cancel="handleCancel"
    @update="handleUpdate"
  />
</template>

<script setup>
import RequisitesCard from '@/components/RequisitesCard.vue'
import type { RequisitesData } from '@/types'

const handleSubmit = (data: RequisitesData) => {
  console.log('Submitted:', data)
}

const handleCancel = () => {
  // Обработка отмены
}

const handleUpdate = () => {
  // Обработка обновления данных
}
</script>
```

### useRequisites Composable
```typescript
import { useRequisites } from '@/composables/useRequisites'

const { 
  data, 
  isLoading, 
  error, 
  saveRequisites, 
  updateRequisites 
} = useRequisites()

// Сохранение данных
const result = await saveRequisites(data)

// Обновление данных
const updateResult = await updateRequisites()
```

## Стилизация

### CSS классы
- `.requisites-card` - основной контейнер
- `.form-section` - секция формы с границей снизу
- `.field-input` - стили для полей ввода
- `.bank-requisite-block` - блок банковских реквизитов

### Tailwind классы
- Используются для адаптивной сетки и отступов
- Цветовая схема соответствует дизайн-системе

## Навигация

Компонент интегрирован в навигацию приложения:
- Маршрут: `/requisites`
- Иконка: `mdi-bank`
- Название: "Реквизиты"

## Mock данные

В `src/data/mockData.ts` содержатся тестовые данные:
- Компания: ООО «СЛЦ»
- Адрес: Новосибирск
- Руководитель: Иванов Сергей Петрович
- Два пустых блока банковских реквизитов

## Расширение

### Добавление новых полей
1. Обновить интерфейсы в `src/types/index.ts`
2. Добавить константы в `src/constants/requisites.ts`
3. Создать валидацию в `src/utils/requisitesValidation.ts`
4. Обновить компонент `RequisitesCard.vue`

### Интеграция с API
1. Обновить методы в `useRequisites.ts`
2. Добавить обработку ошибок
3. Реализовать загрузку и сохранение данных

## Тестирование

Для тестирования компонента рекомендуется:
1. Проверить валидацию всех полей
2. Протестировать добавление/удаление банковских реквизитов
3. Проверить установку реквизитов по умолчанию
4. Протестировать обработку ошибок
