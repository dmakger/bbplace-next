import { ASC_ALPHABETICAL_SORT } from "@/features/Sort"

// ====={ ОБЩИЕ ПАРАМЕТРЫ }=====
class CoreParams {
    KEY = "k"
    VALUE = "v"
    
    SEARCH = "q"
    VIEW = "vw"

    NUMBER = "n"
    PAGE = "p"
    NUMBER_PAGE = this.NUMBER + this.PAGE
    DEFAULT_NUMBER_PAGE = 1
    
    // ASK => По возрастанию
    // DESK => По убыванию
    SORT = "sort"

    SORT_VALUES_END = {
        DEFAULT: "d",
        UP: "up",
        DOWN: "down",
    }
    
    SORT_KEYS = { 
        DATE_START: "date_start",
        ALPHABETICAL: "alphabetical",
    }

    SORT_VALUES = {
        DATE_START: {
            DEFAULT: this.SORT_KEYS.DATE_START + this.SORT_VALUES_END.DEFAULT,
            UP: this.SORT_KEYS.DATE_START + this.SORT_VALUES_END.UP,
            DOWN: this.SORT_KEYS.DATE_START + this.SORT_VALUES_END.DOWN,
        },
        ALPHABETICAL: {
            DEFAULT: this.SORT_KEYS.ALPHABETICAL + this.SORT_VALUES_END.DEFAULT,
            UP: this.SORT_KEYS.ALPHABETICAL + this.SORT_VALUES_END.UP,
            DOWN: this.SORT_KEYS.ALPHABETICAL + this.SORT_VALUES_END.DOWN,
        },
    }

    // FILTER
    CATEGORY_ID = "category_id" 
    COUNTRY = "country" 
    STATUS = "status" 
    APPLICATION = "application" 

    FILTER_VALUES = {
        COUNTRY: {
            DEFAULT: 'Все страны',
        },
        CATEGORY: {
            DEFAULT: 'Любая',
        },
        STATUS: {
            DEFAULT: 'Любой',
            IN_STOCK: 'В наличие',
            READY_TO_SEND: 'Готово к отправке',
            BY_ORDER: 'Под заказ',
        },
        APPLICATION: {
            DEFAULT: 'Продажа и покупка',
            SELL: 'Продажа',
            PURCHASE: 'Покупка',
        }
    }


    MIN_ORDER_QUANTITY = "min_order_quantity" 

}
export const CORE_PARAMS = new CoreParams()
