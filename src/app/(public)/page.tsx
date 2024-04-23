import { ECatalogVariants, SortFilterSidebar } from "@/widgets/SortFilterSidebar";
import { ProductTable } from "@/features/ProductTable";

export default function MainPage() {

    const productApi = {
        "id": 508,
        "groupId": 746,
        "name": "Квадроцикл Forte Braves 200",
        "ownerId": "c5d5c00b-36d9-4bb3-a446-79e807d1ff73",
        "categoryId": 336,
        "country": "Китай",
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
    
    return (
        <div style={{display: 'flex', justifyContent: 'center', width: '50%'}}>
            {/* <SortFilterSidebar variant={ECatalogVariants.PRODUCTS}/> */}
            <ProductTable productApi={productApi}/>
        </div>
    )
}
