import { ETCellItemVariants, ITCellButtonItem, ITCellItem } from "../model/tariffs.model"

export const DEFAULT_COLUMN_DATA_ARRAY: ITCellItem[] = [
    { title: '', classNameData: 'firstDefaultItem' },
    { title: 'Лимит по предложениям для заказчиков', classNameData: 'secondDefaultItem' },
    { title: 'Приоритет при показе в каталоге' },
    { title: 'Количество товаров' },
    { title: 'Телефон и почта компании на странице поставщика и товаров' },
    { title: 'Индексация поисковыми системами' },
    { title: 'Товаров с SEO оптимизацией', subtitle: 'Улучшение видимости в поисковых системах для привлечения трафика' },
    { title: 'Привлечение клиентов через контекстную рекламу' },
    { title: 'Премиум поддержка' },
    { title: 'Доступ к контактам оптовых заказчиков' },
    { title: 'Автоподбор актуальных заявок' },
    { title: 'Публикация профиля в каталоге' },
    { title: 'Премиум значок' }
]

export const SECOND_DEFAULT_COLUMN_DATA_ARRAY: ITCellItem[] = [
    { title: 'Партнёрство на 3 месяца                 ' },
    { title: 'Партнёрство на 6 месяцев' },
    { title: 'Партнёрство на 12 месяцев' },
]

export const DEMO_COLUMN_DATA_ARRAY: ITCellItem[] = [
    { title: 'Демо', subtitle: 'Бесплатно', variant: ETCellItemVariants.DEMO },
    { title: '5 месяцев', variant: ETCellItemVariants.DEMO },
    { title: '', variant: ETCellItemVariants.DEMO },
    { title: '3', variant: ETCellItemVariants.DEMO },
    { title: '', variant: ETCellItemVariants.DEMO },
    { title: '', variant: ETCellItemVariants.DEMO },
    { title: '', variant: ETCellItemVariants.DEMO },
    { title: '', variant: ETCellItemVariants.DEMO },
    { title: '', variant: ETCellItemVariants.DEMO },
    { title: '', variant: ETCellItemVariants.DEMO },
    { title: '', variant: ETCellItemVariants.DEMO },
    { title: '', variant: ETCellItemVariants.DEMO },
    { title: '', variant: ETCellItemVariants.DEMO },
]

export const SECOND_DEMO_COLUMN_DATA_ARRAY: ITCellItem[] = [
    { title: '-', variant: ETCellItemVariants.DEMO },
    { title: '-', variant: ETCellItemVariants.DEMO },
    { title: '-', variant: ETCellItemVariants.DEMO },
]

export const BUSINESS_COLUMN_DATA_ARRAY: ITCellItem[] | ITCellButtonItem[] = [
    { title: 'Бизнес', buttonTitle: 'от 2 090₽/месяц', variant: ETCellItemVariants.BUSINESS },
    { title: '', variant: ETCellItemVariants.BUSINESS },
    { title: 'Высокий', variant: ETCellItemVariants.BUSINESS },
    { title: '500', variant: ETCellItemVariants.BUSINESS },
    { title: '', variant: ETCellItemVariants.BUSINESS },
    { title: '', variant: ETCellItemVariants.BUSINESS },
    { title: '3', variant: ETCellItemVariants.BUSINESS },
    { title: '', variant: ETCellItemVariants.BUSINESS },
    { title: '', variant: ETCellItemVariants.BUSINESS },
    { title: '', variant: ETCellItemVariants.BUSINESS },
    { title: '', variant: ETCellItemVariants.BUSINESS },
    { title: '', variant: ETCellItemVariants.BUSINESS },
    { title: '', variant: ETCellItemVariants.BUSINESS }
]

export const SECOND_BUSINESS_COLUMN_DATA_ARRAY: ITCellItem[] = [
    { title: '7 470₽', subtitle: '2 490₽/месяц', variant: ETCellItemVariants.BUSINESS },
    { title: '13 740₽', subtitle: '2 290₽/месяц', variant: ETCellItemVariants.BUSINESS },
    { title: '25 080₽', subtitle: '2 090₽/месяц', variant: ETCellItemVariants.BUSINESS },
]

export const PREMIUM_COLUMN_DATA_ARRAY: ITCellItem[] | ITCellButtonItem[] = [
    { title: 'Премиум', buttonTitle: 'от 2 890₽/месяц', variant: ETCellItemVariants.PREMIUM },
    { title: '', variant: ETCellItemVariants.PREMIUM },
    { title: 'Максимум', variant: ETCellItemVariants.PREMIUM },
    { title: '500', variant: ETCellItemVariants.PREMIUM },
    { title: '', variant: ETCellItemVariants.PREMIUM },
    { title: '', variant: ETCellItemVariants.PREMIUM },
    { title: '10/20/30*', variant: ETCellItemVariants.PREMIUM },
    { title: '', variant: ETCellItemVariants.PREMIUM },
    { title: '', variant: ETCellItemVariants.PREMIUM },
    { title: '', variant: ETCellItemVariants.PREMIUM },
    { title: '', variant: ETCellItemVariants.PREMIUM },
    { title: '', variant: ETCellItemVariants.PREMIUM },
    { title: '', variant: ETCellItemVariants.PREMIUM }
]


export const SECOND_PREMIUM_COLUMN_DATA_ARRAY: ITCellItem[] = [
    { title: '10 470₽', subtitle: '3 490₽/месяц', variant: ETCellItemVariants.PREMIUM },
    { title: '19 140₽', subtitle: '3 190₽/месяц', variant: ETCellItemVariants.PREMIUM },
    { title: '34 680₽', subtitle: '2 890₽/месяц', variant: ETCellItemVariants.PREMIUM },
]