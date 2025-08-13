# Referal App

Веб-приложение для управления проектами и профилями пользователей, построенное на Vue 3 + Vuetify + Tailwind CSS + TypeScript.

## 🚀 Особенности

- **Современный стек**: Vue 3, Vuetify 3, Tailwind CSS, TypeScript
- **Адаптивный дизайн**: Полностью адаптивный интерфейс
- **Типизация**: Полная типизация с TypeScript
- **Компонентная архитектура**: Модульная структура с переиспользуемыми компонентами
- **Валидация форм**: Встроенная валидация с кастомными правилами
- **Навигация**: Интуитивная навигация с активными состояниями

## 📁 Структура проекта

```
src/
├── components/          # Vue компоненты
│   ├── AppHeader.vue
│   ├── AppNavigation.vue
│   ├── FormProgress.vue
│   ├── InvestorProfileCard.vue
│   ├── PartnerFormCard.vue
│   ├── ProjectCard.vue
│   ├── ProjectFilters.vue
│   └── RequisitesCard.vue      # 🆕 Новый компонент реквизитов
├── composables/         # Vue composables
│   ├── useApplicationForm.ts
│   ├── useInvestorForm.ts
│   ├── useNavigation.ts
│   ├── usePartnerForm.ts
│   ├── useProfile.ts
│   ├── useProjects.ts
│   ├── useRequisites.ts        # 🆕 Composable для реквизитов
│   └── useUser.ts
├── constants/           # Константы приложения
│   ├── index.ts
│   └── requisites.ts           # 🆕 Константы для реквизитов
├── data/               # Mock данные
│   └── mockData.ts
├── router/             # Vue Router конфигурация
│   └── index.ts
├── types/              # TypeScript интерфейсы
│   └── index.ts
├── utils/              # Утилиты
│   ├── formatters.ts
│   ├── validation.ts
│   └── requisitesValidation.ts # 🆕 Валидация реквизитов
├── views/              # Vue страницы
│   ├── ApplicationView.vue
│   ├── InvestorFormView.vue
│   ├── PartnerFormView.vue
│   ├── ProfileView.vue
│   ├── ProjectsView.vue
│   └── RequisitesView.vue      # 🆕 Страница реквизитов
└── main.ts
```

## 🆕 Новый компонент: Реквизиты

### Описание
Компонент для управления реквизитами компании, включающий:
- **Данные компании**: полное и краткое название, ИНН, КПП, ОГРН, адреса
- **Информация о руководителе**: должность, ФИО, основание
- **Банковские реквизиты**: добавление, удаление, установка по умолчанию

### Функциональность
- ✅ Редактирование всех полей реквизитов
- ✅ Валидация ИНН, КПП, ОГРН, БИК
- ✅ Динамическое добавление/удаление банковских реквизитов
- ✅ Установка реквизитов по умолчанию
- ✅ Сохранение и обновление данных
- ✅ Адаптивный дизайн

### Навигация
- Маршрут: `/requisites`
- Иконка: `mdi-bank`
- Название: "Реквизиты"

### Использование
```vue
<template>
  <RequisitesCard
    :initial-data="requisitesData"
    @submit="handleSubmit"
    @cancel="handleCancel"
    @update="handleUpdate"
  />
</template>
```

## 🛠 Установка и запуск

### Требования
- Node.js 18+
- npm или yarn

### Установка зависимостей
```bash
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

### Сборка для продакшена
```bash
npm run build
```

### Проверка типов
```bash
npm run type-check
```

## 🎨 Дизайн-система

### Цветовая палитра
- **Primary**: Синий (#2563eb)
- **Secondary**: Серый (#6b7280)
- **Success**: Зеленый (#10b981)
- **Warning**: Желтый (#f59e0b)
- **Error**: Красный (#ef4444)

### Компоненты
- **Кнопки**: Elevated, Outlined, Text варианты
- **Поля ввода**: Outlined стиль с валидацией
- **Карточки**: Белый фон с тенями
- **Навигация**: Боковая панель с активными состояниями

## 📱 Адаптивность

Приложение полностью адаптивно и поддерживает:
- **Мобильные устройства** (320px+)
- **Планшеты** (768px+)
- **Десктопы** (1024px+)
- **Большие экраны** (1280px+)

## 🔧 Технические детали

### Vue 3 Composition API
Все компоненты используют современный Composition API:
```typescript
import { ref, computed, onMounted } from 'vue'

export function useComponent() {
  const data = ref([])
  const computedValue = computed(() => data.value.length)
  
  onMounted(() => {
    // Инициализация
  })
  
  return { data, computedValue }
}
```

### TypeScript
Полная типизация всех интерфейсов и функций:
```typescript
interface RequisitesData {
  company: CompanyDetails
  head: HeadDetails
  bankRequisites: BankRequisite[]
}
```

### Vuetify 3
Использование компонентов Vuetify 3:
- `v-form` для валидации
- `v-text-field` для полей ввода
- `v-btn` для кнопок
- `v-card` для карточек
- `v-tabs` для табов

### Tailwind CSS
Утилитарные классы для стилизации:
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div class="bg-white rounded-lg border border-blue-200 p-8">
```

## 📋 Валидация

### Правила валидации
- **ИНН**: 10 цифр для юр. лиц, 12 цифр для ИП
- **КПП**: 9 цифр
- **ОГРН**: 13 цифр для юр. лиц, 15 цифр для ИП
- **БИК**: 9 цифр (не обязательное поле)
- **Обязательные поля**: проверка заполнения

### Кастомные валидаторы
```typescript
export const validateInn = (inn: string): ValidationResult => {
  const innRegex = /^\d{10}(\d{2})?$/
  return {
    isValid: innRegex.test(inn),
    message: 'Неверный формат ИНН'
  }
}
```

## 🚀 Развертывание

### Сборка
```bash
npm run build
```

### Результат сборки
- Оптимизированные файлы в папке `dist/`
- Минифицированные CSS и JS
- Готовые к развертыванию статические файлы

## 📚 Документация

Подробная документация по компоненту реквизитов находится в файле [REQUISITES_README.md](./REQUISITES_README.md).

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Добавьте тесты
5. Создайте Pull Request

## 📄 Лицензия

MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 👥 Авторы

- Разработка: Команда разработчиков
- Дизайн: UI/UX команда
- Тестирование: QA команда
