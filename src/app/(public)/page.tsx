import { ECatalogVariants, SortFilterSidebar } from "@/widgets/SortFilterSidebar";
import { ProductTable } from "@/features/ProductTable";

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
          "СДЭКdsadjaslkjdljsalkjdlksajdlkasjdljsaldjasljdlksajdlksssssssssssssssssssssssssssssssssssssssssssssssssssssssss ddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
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
        "media": "{\"id\":-1,\"attachments\":[\"5b9b1cc6-46f4-4542-803a-96f1e7cb60b0.png\"],\"color\":\"Бело-красный\",\"article\":\"2443434FF\",\"currency\":\"RUB\",\"wholesalePrices\":[],\"sizes\":[{\"size\":\"88\",\"sizeUnit\":{\"id\":11,\"name\":\"Сантиметры\",\"shortName\":\"см\"}},{\"size\":\"116\",\"sizeUnit\":{\"id\":11,\"name\":\"Сантиметры\",\"shortName\":\"см\"}},{\"size\":\"70\",\"sizeUnit\":{\"id\":11,\"name\":\"Сантиметры\",\"shortName\":\"см\"}}]}",
        "characteristics": "{\"brand\":\"mummy yummy\",\"country\":67,\"weight\":0.07,\"weightUnits\":\"\",\"expirationDate\":\"7\",\"gender\":3,\"features\":[],\"description\":\"кукурузные палочки с игрушкой от производителя\",\"composition\":\"кукурузная крупа, сахар, соль, масло подсолнечное\",\"equipment\":\"\"}",
        "createdAt": "03/25/2024 14:32:04",
        "deletedAt": null
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
        <div style={{display: 'flex', justifyContent: 'center', width: '50%'}}>
            {/* <SortFilterSidebar variant={ECatalogVariants.PRODUCTS}/> */}
            <ProductTable productApi={productApi}/>
        </div>
    )
}
