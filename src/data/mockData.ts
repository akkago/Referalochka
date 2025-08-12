import type { User, Project, ProjectStage, Industry, ProjectType, NavigationItem, ProfileTab, InvestorProfile, ApplicationForm, InvestorForm, ResourceLink, InvestmentCategory, PartnerForm, PartnerResourceLink, PartnerCategory } from '@/types'

export const currentUser: User = {
  id: '1',
  name: 'Михаил М.',
  type: 'individual',
  avatar: 'WW',
  balance: 400000
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'search',
    title: 'Поиск проектов',
    icon: 'mdi-magnify',
    isActive: true
  },
  {
    id: 'my-projects',
    title: 'Мои проекты',
    icon: 'mdi-folder'
  },
  {
    id: 'profile',
    title: 'Личный профиль',
    icon: 'mdi-account'
  },
  {
    id: 'documents',
    title: 'Документы',
    icon: 'mdi-file-document',
    badge: 12
  },
  {
    id: 'employees',
    title: 'Сотрудники',
    icon: 'mdi-account-group'
  },
  {
    id: 'help',
    title: 'Помощь',
    icon: 'mdi-help-circle'
  },
  {
    id: 'settings',
    title: 'Настройки',
    icon: 'mdi-cog'
  }
]

export const projectStages: ProjectStage[] = [
  { id: '1', name: 'Идея' },
  { id: '2', name: 'Разработка' },
  { id: '3', name: 'Запуск' },
  { id: '4', name: 'Масштабирование' }
]

export const industries: Industry[] = [
  { id: '1', name: 'Отрасль 1' },
  { id: '2', name: 'Отрасль 2' },
  { id: '3', name: 'Отрасль 3' },
  { id: '4', name: 'Длинное название отрасли которое может не поместиться' },
  { id: '5', name: 'Отрасль 5' },
  { id: '6', name: 'Отрасль 6' },
  { id: '7', name: 'Отрасль 7' }
]

export const projectTypes: ProjectType[] = [
  { id: '1', name: 'Стартап' },
  { id: '2', name: 'Бизнес' },
  { id: '3', name: 'Инновации' }
]

export const projects: Project[] = [
  {
    id: '000342',
    title: 'Сварочные аппараты или длинное название',
    date: '15.09.2025',
    description: 'Производство и продажа стыковых сварочных аппаратов.',
    isFavorite: true,
    stage: projectStages[1],
    industry: 'Промышленность',
    location: 'Москва',
    type: projectTypes[1]
  },
  {
    id: '000343',
    title: 'Экологичная упаковка',
    date: '14.09.2025',
    description: 'Разработка биоразлагаемых материалов для упаковки.',
    isFavorite: false,
    stage: projectStages[0],
    industry: 'Экология',
    location: 'Санкт-Петербург',
    type: projectTypes[0]
  },
  {
    id: '000344',
    title: 'Умный дом',
    date: '13.09.2025',
    description: 'Система автоматизации жилых помещений.',
    isFavorite: true,
    stage: projectStages[2],
    industry: 'Технологии',
    location: 'Москва',
    type: projectTypes[2]
  },
  {
    id: '000345',
    title: 'Доставка еды',
    date: '12.09.2025',
    description: 'Сервис быстрой доставки готовой еды.',
    isFavorite: false,
    stage: projectStages[1],
    industry: 'Услуги',
    location: 'Казань',
    type: projectTypes[1]
  },
  {
    id: '000346',
    title: 'Образовательная платформа',
    date: '11.09.2025',
    description: 'Онлайн-курсы и обучение.',
    isFavorite: true,
    stage: projectStages[3],
    industry: 'Образование',
    location: 'Москва',
    type: projectTypes[0]
  },
  {
    id: '000347',
    title: 'Фитнес-приложение',
    date: '10.09.2025',
    description: 'Мобильное приложение для тренировок.',
    isFavorite: false,
    stage: projectStages[2],
    industry: 'Здоровье',
    location: 'Екатеринбург',
    type: projectTypes[2]
  }
]

export const profileTabs: ProfileTab[] = [
  {
    id: 'investor',
    title: 'Анкета инвестора',
    isActive: true
  },
  {
    id: 'partner',
    title: 'Анкета партнера',
    isActive: false
  },
  {
    id: 'requisites',
    title: 'Реквизиты',
    isActive: false
  }
]

export const investorProfile: InvestorProfile = {
  status: 'pending',
  title: 'Станьте инвестором',
  description: 'Пройдите верификацию и заполните анкету. После проверки — доступ открыт!',
  icon: 'mdi-cog',
  iconColor: 'purple',
  actions: [
    {
      id: 'add-organization',
      title: 'Добавить организацию',
      variant: 'outlined',
      color: 'primary',
      icon: 'mdi-plus'
    },
    {
      id: 'verify',
      title: 'Верифицироваться',
      variant: 'filled',
      color: 'primary',
      icon: 'mdi-shield-check'
    }
  ]
}

export const applicationForm: ApplicationForm = {
  id: 'investor-application',
  title: 'Заполнить анкету',
  description: 'Необходимо заполнить анкету. После проверки — доступ открыт!',
  icon: 'mdi-clipboard-text',
  iconColor: 'purple',
  sections: [
    {
      id: 'personal-info',
      title: 'Личная информация',
      description: 'Основные данные о заявителе',
      fields: [
        {
          id: 'full-name',
          label: 'ФИО',
          type: 'text',
          placeholder: 'Введите полное имя',
          required: true,
          validation: 'required'
        },
        {
          id: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'example@email.com',
          required: true,
          validation: 'email'
        },
        {
          id: 'phone',
          label: 'Телефон',
          type: 'tel',
          placeholder: '+7 (999) 123-45-67',
          required: true,
          validation: 'phone'
        },
        {
          id: 'birth-date',
          label: 'Дата рождения',
          type: 'text',
          placeholder: 'ДД.ММ.ГГГГ',
          required: true,
          validation: 'date'
        }
      ]
    },
    {
      id: 'passport-info',
      title: 'Паспортные данные',
      description: 'Информация из паспорта РФ',
      fields: [
        {
          id: 'passport-series',
          label: 'Серия паспорта',
          type: 'text',
          placeholder: '0000',
          required: true,
          validation: 'passport-series'
        },
        {
          id: 'passport-number',
          label: 'Номер паспорта',
          type: 'text',
          placeholder: '000000',
          required: true,
          validation: 'passport-number'
        },
        {
          id: 'passport-issued-by',
          label: 'Кем выдан',
          type: 'text',
          placeholder: 'УФМС России',
          required: true
        },
        {
          id: 'passport-issue-date',
          label: 'Дата выдачи',
          type: 'text',
          placeholder: 'ДД.ММ.ГГГГ',
          required: true,
          validation: 'date'
        }
      ]
    },
    {
      id: 'address-info',
      title: 'Адрес регистрации',
      description: 'Место постоянной регистрации',
      fields: [
        {
          id: 'postal-code',
          label: 'Индекс',
          type: 'text',
          placeholder: '000000',
          required: true,
          validation: 'postal-code'
        },
        {
          id: 'region',
          label: 'Регион',
          type: 'select',
          placeholder: 'Выберите регион',
          required: true,
          options: ['Москва', 'Санкт-Петербург', 'Московская область', 'Ленинградская область']
        },
        {
          id: 'city',
          label: 'Город',
          type: 'text',
          placeholder: 'Введите город',
          required: true
        },
        {
          id: 'street',
          label: 'Улица',
          type: 'text',
          placeholder: 'Введите улицу',
          required: true
        },
        {
          id: 'house',
          label: 'Дом',
          type: 'text',
          placeholder: 'Введите номер дома',
          required: true
        },
        {
          id: 'apartment',
          label: 'Квартира',
          type: 'text',
          placeholder: 'Введите номер квартиры',
          required: false
        }
      ]
    },
    {
      id: 'financial-info',
      title: 'Финансовая информация',
      description: 'Данные о доходах и источниках средств',
      fields: [
        {
          id: 'income-source',
          label: 'Источник дохода',
          type: 'select',
          placeholder: 'Выберите источник дохода',
          required: true,
          options: ['Заработная плата', 'Предпринимательская деятельность', 'Пенсия', 'Доходы от ценных бумаг', 'Другое']
        },
        {
          id: 'monthly-income',
          label: 'Среднемесячный доход',
          type: 'select',
          placeholder: 'Выберите уровень дохода',
          required: true,
          options: ['До 50 000 ₽', '50 000 - 100 000 ₽', '100 000 - 300 000 ₽', '300 000 - 500 000 ₽', 'Более 500 000 ₽']
        },
        {
          id: 'investment-experience',
          label: 'Опыт инвестирования',
          type: 'select',
          placeholder: 'Выберите опыт',
          required: true,
          options: ['Нет опыта', 'До 1 года', '1-3 года', '3-5 лет', 'Более 5 лет']
        }
      ]
    },
    {
      id: 'documents',
      title: 'Документы',
      description: 'Загрузите необходимые документы',
      fields: [
        {
          id: 'passport-scan',
          label: 'Скан паспорта',
          type: 'file',
          required: true,
          validation: 'file'
        },
        {
          id: 'selfie-with-passport',
          label: 'Селфи с паспортом',
          type: 'file',
          required: true,
          validation: 'file'
        },
        {
          id: 'income-certificate',
          label: 'Справка о доходах',
          type: 'file',
          required: false,
          validation: 'file'
        }
      ]
    }
  ],
  submitButton: {
    text: 'Заполнить анкету',
    variant: 'filled',
    color: 'primary',
    icon: 'mdi-send'
  }
}

export const investorForm: InvestorForm = {
  id: 'investor-form',
  status: 'Статус инвестора действителен до: 01.10.2025',
  sections: [
    {
      id: 'general-info',
      title: 'Общая информация',
      fields: [
        {
          id: 'name',
          label: 'Имя',
          type: 'text',
          placeholder: 'Введите имя',
          required: true,
          value: ''
        },
        {
          id: 'surname',
          label: 'Фамилия',
          type: 'text',
          placeholder: 'Введите фамилию',
          required: true,
          value: ''
        },
        {
          id: 'phone',
          label: 'Телефон',
          type: 'tel',
          placeholder: '+7-900-000-00-00',
          required: true,
          validation: 'phone',
          value: ''
        },
        {
          id: 'email',
          label: 'E-Mail',
          type: 'email',
          placeholder: 'example@email.com',
          required: true,
          validation: 'email',
          value: ''
        },
        {
          id: 'brand',
          label: 'Название (Бренд/Ник)',
          type: 'text',
          placeholder: 'Введите название бренда или ник',
          required: false,
          value: ''
        },
        {
          id: 'company',
          label: 'Компания',
          type: 'text',
          placeholder: 'Введите название компании',
          required: false,
          value: ''
        },
        {
          id: 'inn',
          label: 'ИНН',
          type: 'text',
          placeholder: 'Введите ИНН',
          required: false,
          validation: 'inn',
          value: ''
        }
      ]
    },
    {
      id: 'resources',
      title: 'Ссылки на ресурсы',
      fields: [
        {
          id: 'website-type',
          label: 'Сайт',
          type: 'select',
          placeholder: 'Выберите тип ресурса',
          required: false,
          options: ['Личный сайт', 'Сайт компании', 'Блог', 'Социальная сеть', 'Другое'],
          value: ''
        },
        {
          id: 'website-url',
          label: 'Ссылка',
          type: 'url',
          placeholder: 'https://example.com',
          required: false,
          validation: 'url',
          value: ''
        }
      ]
    },
    {
      id: 'about',
      title: 'О себе',
      fields: [
        {
          id: 'headline',
          label: 'Заголовок 3-4 слова',
          type: 'text',
          placeholder: 'Краткий заголовок о себе',
          required: false,
          value: ''
        },
        {
          id: 'description',
          label: 'Описание',
          type: 'textarea',
          placeholder: 'Расскажите о себе, своем опыте инвестирования, своей команде т.д.',
          required: false,
          value: ''
        }
      ]
    },
    {
      id: 'investments',
      title: 'Инвестиции',
      fields: [
        {
          id: 'investment-format',
          label: 'Формат инвестиций',
          type: 'radio',
          required: true,
          options: ['Доля', 'Займ'],
          value: 'Доля'
        },
        {
          id: 'investment-min',
          label: 'От',
          type: 'number',
          placeholder: '0',
          required: true,
          value: 0
        },
        {
          id: 'investment-max',
          label: 'До',
          type: 'number',
          placeholder: '0',
          required: true,
          value: 0
        }
      ]
    },
    {
      id: 'categories',
      title: 'Категории',
      fields: [
        {
          id: 'tags',
          label: 'Теги',
          type: 'textarea',
          placeholder: 'Ключевые слова по вашей тематике',
          required: false,
          value: ''
        },
        {
          id: 'categories',
          label: 'Интересующие категории',
          type: 'checkbox',
          required: false,
          options: [
            'Изобретения/ Патенты',
            'Технологические проекты (стартапы, венчур)',
            'Проекты на основе ИИ',
            'Бизнес-проекты (ранняя стадия)'
          ],
          value: ['Изобретения/ Патенты']
        }
      ]
    }
  ],
  submitButton: {
    text: 'Отправить',
    variant: 'filled',
    color: 'purple'
  }
}

export const resourceLinks: ResourceLink[] = [
  {
    id: '1',
    type: 'Сайт',
    url: 'https://example.com'
  }
]

export const investmentCategories: InvestmentCategory[] = [
  {
    id: '1',
    name: 'Изобретения/ Патенты',
    isSelected: true
  },
  {
    id: '2',
    name: 'Технологические проекты (стартапы, венчур)',
    isSelected: false
  },
  {
    id: '3',
    name: 'Проекты на основе ИИ',
    isSelected: false
  },
  {
    id: '4',
    name: 'Бизнес-проекты (ранняя стадия)',
    isSelected: false
  }
]

export const partnerForm: PartnerForm = {
  id: 'partner-form',
  status: 'Статус партнера действителен до: 01.10.2025',
  sections: [
    {
      id: 'general-info',
      title: 'Общая информация',
      fields: [
        {
          id: 'name',
          label: 'Имя',
          type: 'text',
          placeholder: 'Введите имя',
          required: true,
          value: ''
        },
        {
          id: 'surname',
          label: 'Фамилия',
          type: 'text',
          placeholder: 'Введите фамилию',
          required: true,
          value: ''
        },
        {
          id: 'phone',
          label: 'Телефон',
          type: 'tel',
          placeholder: '+7-900-000-00-00',
          required: true,
          validation: 'phone',
          value: ''
        },
        {
          id: 'email',
          label: 'E-Mail',
          type: 'email',
          placeholder: 'example@email.com',
          required: true,
          validation: 'email',
          value: ''
        },
        {
          id: 'brand',
          label: 'Название (Бренд/Ник)',
          type: 'text',
          placeholder: 'Введите название бренда или ник',
          required: false,
          value: ''
        },
        {
          id: 'company',
          label: 'Компания',
          type: 'text',
          placeholder: 'Введите название компании',
          required: false,
          value: ''
        },
        {
          id: 'inn',
          label: 'ИНН',
          type: 'text',
          placeholder: 'Введите ИНН',
          required: false,
          validation: 'inn',
          value: ''
        }
      ]
    },
    {
      id: 'resources',
      title: 'Ссылки на ресурсы',
      fields: [
        {
          id: 'website-type',
          label: 'Сайт',
          type: 'select',
          placeholder: 'Выберите тип ресурса',
          required: false,
          options: ['Личный сайт', 'Сайт компании', 'Блог', 'Социальная сеть', 'YouTube', 'Другое'],
          value: ''
        },
        {
          id: 'website-url',
          label: 'Ссылка',
          type: 'url',
          placeholder: 'https://example.com',
          required: false,
          validation: 'url',
          value: ''
        }
      ]
    },
    {
      id: 'about',
      title: 'О себе',
      fields: [
        {
          id: 'headline',
          label: 'Заголовок 3-4 слова',
          type: 'text',
          placeholder: 'Краткий заголовок о себе',
          required: false,
          value: ''
        },
        {
          id: 'description',
          label: 'Описание',
          type: 'textarea',
          placeholder: 'Расскажите о себе, своем опыте инвестирования, своей команде т.д.',
          required: false,
          value: ''
        }
      ]
    },
    {
      id: 'categories',
      title: 'Категории',
      fields: [
        {
          id: 'tags',
          label: 'Теги',
          type: 'textarea',
          placeholder: 'Ключевые слова по вашей тематике',
          required: false,
          value: ''
        },
        {
          id: 'categories',
          label: 'Интересующие категории',
          type: 'checkbox',
          required: false,
          options: [
            'Изобретения/ Патенты',
            'Технологические проекты (стартапы, венчур)',
            'Проекты на основе ИИ',
            'Бизнес-проекты (ранняя стадия)'
          ],
          value: ['Технологические проекты (стартапы, венчур)', 'Проекты на основе ИИ']
        }
      ]
    }
  ],
  submitButton: {
    text: 'Отправить',
    variant: 'filled',
    color: 'purple'
  }
}

export const partnerResourceLinks: PartnerResourceLink[] = [
  {
    id: '1',
    type: 'Сайт',
    url: 'https://example.com'
  },
  {
    id: '2',
    type: 'YouTube',
    url: 'https://youtube.com/channel'
  }
]

export const partnerCategories: PartnerCategory[] = [
  {
    id: '1',
    name: 'Изобретения/ Патенты',
    isSelected: false
  },
  {
    id: '2',
    name: 'Технологические проекты (стартапы, венчур)',
    isSelected: true
  },
  {
    id: '3',
    name: 'Проекты на основе ИИ',
    isSelected: true
  },
  {
    id: '4',
    name: 'Бизнес-проекты (ранняя стадия)',
    isSelected: false
  }
]
