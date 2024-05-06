import { ECatalogVariants, SortFilterSidebar } from "@/widgets/SortFilterSidebar";
import { ProductTable } from "@/features/ProductTable";

export default function MainPage() {

    const productApi = {
  "id": 516,
  "groupId": 1067,
  "name": "Моторное масло для экскаватора",
  "ownerId": "55736903-ec19-4ea8-a591-fb03369910b0",
  "categoryId": 498,
  "country": "",
  "certification": true,
  "delivery": [],
  "paymentConditions": "30% при заказе, 70% при отгрузке",
  "deliveryTime": "7 дней",
  "packagingLength": 100,
  "packagingWidth": 100,
  "packagingHeight": 70,
  "packageType": "картонные коробки",
  "vat": 0,
  "isCustomDesign": true,
  "isHasTestProbe": true,
  "status": "В наличии",
  "warehouses": [
    "Шанхай"
  ],
  "media": "{\"id\":516,\"attachments\":[\"22fe8a3e-b139-45af-b12a-adf42cdaaa1f.png\",\"134aa6dc-6af9-415a-8085-07bfa7121160.png\"],\"color\":\"4L \",\"article\":\"MotOil4LYongxing\",\"currency\":\"USD\",\"wholesalePrices\":[{\"price\":\"50\",\"quantity\":\"10\"},{\"price\":\"40\",\"quantity\":\"10\"}],\"sizes\":[{\"size\":170,\"sizeUnit\":{\"id\":4,\"name\":\"Литры\",\"shortName\":\"л\"}},{\"size\":18,\"sizeUnit\":{\"id\":4,\"name\":\"Литры\",\"shortName\":\"л\"}},{\"size\":4,\"sizeUnit\":{\"id\":4,\"name\":\"Литры\",\"shortName\":\"л\"}}],\"priceUnits\":1}",
  "characteristics": "{\"brand\":\"Yongxing\",\"country\":\"76\",\"weight\":18,\"weightUnits\":4,\"expirationDate\":\"5 лет\",\"gender\":\"Мужской\",\"description\":\"Масло Shantui Komatsu DAY-1 18 л/Масло Shantui Komatsu THE-1 4 л/Масло Shantui Komatsu CI-4 18 л 4 л\\nМоторное масло Shantui Komatsu CJ-4 4л/Моторное масло Shantui Komatsu CJ-4 18Л/Моторное масло Shantui Komatsu CJ-4/Shantui Komatsu KOE68#\\nвысокоэффективное высокоочищенное противоизносное гидравлическое масло/Shantui Komatsu KOE68# высокоэффективное высокоочищенное противоизносное гидравлическое масло/\\nЧистое гидравлическое масло для экскаватора Shantui Komatsu HP 46# (18 л)/Противоизносное гидравлическое масло высокого давления Shantui Komatsu для экскаватора L-HM\\n46(18 л)/Shantui Komatsu /Специальное масло для экскаваторов высокоочищенное противоизносное гидравлическое масло L-HM 68 (18 л)/Специальное масло для экскаваторов высокоочищенное\\nпротивоизносное гидравлическое масло L-HM 68 (170 л)/Специальное трансмиссионное масло для экскаваторов Shantui Komatsu GL-5 85W/90 (18 л) /Экскаватор Shantui Komatsu\\nСпециальное трансмиссионное масло GL-5 85W/90 (4 л) /Консистентная смазка Shantui Komatsu для строительной техники /Антифриз длительного действия Shantui Komatsu\\n, 10 кг\",\"composition\":\"Базовое масло и присадки\",\"equipment\":\"Короб моторное масло - 1 шт\",\"features\":[\"Экскаваторное масло\"]}",
  "createdAt": "04/23/2024 18:55:35",
  "deletedAt": null
}
    
    return (
        <div style={{display: 'flex', justifyContent: 'center', width: '50%'}}>
            {/* <SortFilterSidebar variant={ECatalogVariants.PRODUCTS}/> */}
            <ProductTable productApi={productApi}/>
        </div>
    )
}
