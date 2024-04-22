import { ICurrency } from "@/entities/Metrics/model/currency.metrics.model";
import { IMetrics } from "@/entities/Metrics/model/metric.metrics.model";
import { processProduct } from "@/entities/Product/lib/product.lib";
import { ICharacteristic } from "@/entities/Product/model/characteristic.product.model";
import { IMediaProduct } from "@/entities/Product/model/media.product.model";
import { IProduct, IProductAPI } from "@/entities/Product/model/product.model";
import { IProcessProductProps } from "@/entities/Product/model/props.product.model";
import { HeadingToTextTable } from "@/shared/ui/Text/HeadingToText/Table/HeadingToTextTable";
import { getDataHeadingToTextProductMainTable } from "@/widgets/Product/Table/HeadingToText/lib/htt.product.lib";
import { ECatalogVariants, SortFilterSidebar } from "@/widgets/SortFilterSidebar";

export default function MainPage() {

    const productApi = {
        "id": 508,
        "groupId": 746,
        "name": "Квадроцикл Forte Braves 200",
        "ownerId": "c5d5c00b-36d9-4bb3-a446-79e807d1ff73",
        "categoryId": 336,
        "country": "",
        "certification": false,
        "delivery": [
          "Курьерская от компании",
          "Деловые Линии",
          "СДЭК"
        ],
        "paymentConditions": "Предоплата",
        "deliveryTime": "3",
        "packagingLength": 1200,
        "packagingWidth": 750,
        "packagingHeight": 750,
        "packageType": "Ящик",
        "vat": 0,
        "isCustomDesign": false,
        "isHasTestProbe": false,
        "status": "В наличии",
        "warehouses": [
          "Москва"
        ],
        "media": "{\"id\":-1,\"attachments\":[\"5b9b1cc6-46f4-4542-803a-96f1e7cb60b0.png\"],\"color\":\"Бело-красный\",\"article\":\"2443434FF\",\"currency\":\"RUB\",\"wholesalePrices\":[],\"sizes\":[],\"priceUnits\":1}",
        "characteristics": "{\"brand\":\"FORTE\",\"country\":\"76\",\"weight\":75,\"weightUnits\":-1,\"expirationDate\":\"\",\"gender\":\"\",\"description\":\"Характеристики: Максимальная скорость : 65 км/ч Средний расход топлива : 3,8 л / 100 км Грузоподъемность : 150 кг Напряжение бортовой электросети : 12 В Объем топливного бака : 5 л Характеристики Двигателя Объем двигателя : 175 см³ Система охлаждения : воздушное Мощность двигателя : 10 л.с. Система пуска двигателя : электрический стартер / ручной Тип двигателя : четырехтактный Тип топлива : бензин с октановым числом не ниже 92 Тип трансмиссии : автоматический вариатор Характеристики Шасси Тип переднего тормоза : двойные дисковые, механические Подвеска заднего колеса : зависимая, пружинный амортизатор Подвеска переднего колеса : независимая рычажная с амортизатором Размер задней шины : 21х10-10 Размер передней шины : 23х7-10 Рама : стальная трубчастая Тип заднего тормоза : дисковые с вентиляцией, гидравлические Размеры (1820 х 1190 х 1250 мм)\",\"composition\":\"\",\"equipment\":\"\dsadsad\",\"features\":[]}",
        "createdAt": "03/25/2024 14:32:04",
        "deletedAt": null
      }
      

    const productApiToProduct = ({productAPI, metrics, currencyList, hasSupplier=false}: IProcessProductProps): IProduct => {
        const media = JSON.parse(productAPI.media) as IMediaProduct
        const characteristics = JSON.parse(productAPI.characteristics) as ICharacteristic
        
        return processProduct({
            ...productAPI, 
            media, 
            characteristics,
        }, metrics, currencyList)
    }

    const productApiListToProductList = (productListAPI: IProductAPI, metrics?: IMetrics[], currencyList?: ICurrency[]): IProduct => {
        return productApiToProduct({productAPI: productListAPI, metrics, currencyList})
    }

    // const product = {
    //     id: 514,
    //     groupId: 1058,
    //     name: "Перчатки рабочие ХБ ",
    //     ownerId: "0628f030-cb8e-414f-a641-273e307b51cb",
    //     categoryId: 3551,
    //     country: "",
    //     certification: false,
    //     delivery: [],
    //     paymentConditions: "Наличные",
    //     deliveryTime: "1-2 дня",
    //     packagingLength: 0,
    //     packagingWidth: 0,
    //     packagingHeight: 0,
    //     packageType: "Целлофан",
    //     vat: 0,
    //     isCustomDesign: false,
    //     isHasTestProbe: false,
    //     status: "В наличии",
    //     warehouses: [],
    //     media: {
    //         id:-1,
    //         attachments:['1613309f-5e57-4928-a4d6-d8c5d706e099.webp'],
    //         color: "Черный, белый, серый",
    //         article:"44949",
    //         currency: "KZT",
    //         wholesalePrices:[],
    //         sizes:[],
    //         priceUnits:1
    //     },
    //     characteristics: {
    //         brand: 'Перчатки рабочие ХБ',
    //         country:"67",
    //         weight: 0,
    //         weightUnits: -1,
    //         expirationDate:"",
    //         gender:'',
    //         description:"Продам перчатки рабочие оптом! С доставкой до адреса по г.Павлодар, Аксу.Цвет: Белый, серый, черный.Класс вязки: 10кл. Минимальное колличетсво заказа 500 пар!От 1000 пар цена 80тг!",
    //         composition:"",
    //         equipment:"",
    //         features:[]},
    //         createdAt: "04/06/2024 18:16:41",
    //         deletedAt: null
    //   }
    
    return (
        <div>
            {/* <SortFilterSidebar variant={ECatalogVariants.PRODUCTS}/> */}
            <HeadingToTextTable data={getDataHeadingToTextProductMainTable(productApiListToProductList(productApi))} />
        </div>
    )
}
