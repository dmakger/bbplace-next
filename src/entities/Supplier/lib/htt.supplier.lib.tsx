import { getHeadingToText } from "@/shared/lib/headingToText.lib";
import { IGetDataHeadingToTextSupplierTable, IGetDataHeadingToTextSupplierTableVariant, IHeadingToText } from "@/shared/model/text.model";
import { Rating } from "@/shared/ui/Rating";


export const getDataHeadingToTextSupplierTable = ({
    variant = IGetDataHeadingToTextSupplierTableVariant.SUPPLIER_PAGE,
    supplier,
    supplierRating,
    supplierReviews,
    isCountryNeeded = false
}: IGetDataHeadingToTextSupplierTable) => {


    const RATING_SUPPLIER_DATA = {heading: 'Рейтинг', body: <Rating rating={supplierRating} numberOfReviews={supplierReviews}/>};
    const COUNTRY_SUPPLIER_DATA = {heading: 'Регион', body: supplier?.country ?? ''}
    const ABOUT_SUPPLIER_DATA = {heading: 'О поставщике', body: supplier?.shortDescription || supplier?.description || ''};
    const REGISTRATION_DATE_SUPPLIER_DATA = {heading: 'Регистрация', body: supplier?.shortDescription || supplier?.description || ''};
    const TYPE_OF_BUSINESS_SUPPLIER_DATA = {heading: 'Тип бизнеса', body: supplier?.shortDescription || supplier?.description || ''};
    const RESPONSE_VELOCITY_SUPPLIER_DATA = {heading: 'Скорость ответа', body: <>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor nulla est perferendis voluptatum iste? Aliquam, deleniti ipsam molestias officia vel molestiae quia quo at qui nemo cumque aliquid laboriosam possimus, totam, numquam sed vero delectus nihil sit consequuntur. Quasi odio voluptatem, explicabo dolores omnis exercitationem libero perspiciatis rerum aspernatur praesentium sequi, magni sit officia ipsam facilis at reiciendis autem? Doloribus temporibus ipsa soluta illo perferendis voluptate corrupti aperiam natus ratione dicta rerum a autem, sapiente voluptates optio architecto veniam dignissimos voluptatibus deleniti iusto repudiandae eaque. Voluptatibus saepe enim mollitia molestiae debitis id ut libero vel labore, fugiat vitae nisi tempore magni laudantium illum in tenetur consequatur expedita, eius quos recusandae deserunt? Quas, quisquam quasi! Reiciendis error sint voluptatibus vero dignissimos, voluptatem labore, praesentium qui nam sit quis quas dolorum modi enim earum repellendus officia nihil minus aliquam ipsam tenetur expedita ea fugiat mollitia! Quibusdam dolorem minima sed voluptate sequi in possimus, laudantium saepe magni repudiandae dolorum distinctio alias officiis omnis quo iure vel aut perspiciatis hic aperiam! Deleniti facere quasi deserunt minus delectus sed nobis distinctio harum pariatur, ipsa totam saepe accusamus maiores porro necessitatibus. Incidunt provident error accusamus natus harum fuga sit quia accusantium amet, nobis optio nemo tempore eveniet in voluptatibus iusto nihil veniam modi aut labore sapiente. Quo cupiditate repellendus accusamus fuga quisquam repellat animi quae, optio amet? Fugit reprehenderit asperiores ullam velit harum nemo error at iusto molestiae consequuntur similique dolorem provident incidunt hic aspernatur id architecto, distinctio, culpa mollitia aut. Eaque, recusandae itaque ab deleniti dolorem, accusantium quibusdam commodi libero in vero tempora! Quos harum ex iusto magni commodi quae minus unde, at, fugiat cupiditate, recusandae praesentium nulla! Architecto suscipit eum nobis omnis asperiores, quisquam distinctio quas quibusdam cumque. Sunt dolore neque consequuntur. Soluta esse culpa fuga! Ad, dolorum doloribus? Ducimus ipsa labore voluptas distinctio sunt ea amet numquam quos laborum quaerat! Repellendus nesciunt eum quod molestias neque labore perspiciatis doloribus necessitatibus possimus ducimus eveniet nisi, debitis, ad, vel unde nobis aspernatur. Fugiat quaerat repellendus, adipisci omnis, aliquid rerum eum doloribus nihil facilis sequi illo laudantium non porro sunt labore libero voluptatibus earum, dicta saepe! Laborum, autem? Iure, id alias aspernatur esse minus odio, nemo molestiae soluta, quidem pariatur rem voluptate beatae ex! Cumque ipsa sequi commodi eveniet atque iste deleniti, doloremque totam. At asperiores ab fugit animi, odio doloribus recusandae, corrupti ipsam sed itaque tenetur amet neque dicta labore reiciendis eos commodi. Id numquam omnis facilis alias cumque sit sapiente assumenda illo deserunt culpa fugit, totam eum, illum quibusdam dicta? Possimus mollitia laborum deserunt veritatis autem iste maiores provident, quaerat explicabo ut pariatur, laudantium quidem sunt voluptate amet quibusdam laboriosam, similique veniam unde dolor obcaecati et! Aperiam fugiat, nobis voluptatibus esse, commodi quo consequatur aliquid blanditiis ab dicta ratione natus doloribus velit. Modi, nisi. Numquam ipsam minima, inventore nisi fugit impedit possimus repudiandae! Et accusantium iste similique saepe, necessitatibus debitis alias iusto eligendi, at assumenda velit quae soluta architecto, asperiores dolores fugit maiores nam impedit. Quas fugiat ut deleniti accusamus pariatur quam architecto error!</>};

    let processData: IHeadingToText[] = []

    if(variant === IGetDataHeadingToTextSupplierTableVariant.PRODUCT_PAGE)
        processData = [
        COUNTRY_SUPPLIER_DATA,
        TYPE_OF_BUSINESS_SUPPLIER_DATA,
        REGISTRATION_DATE_SUPPLIER_DATA,
        RESPONSE_VELOCITY_SUPPLIER_DATA
    ]

    if(variant === IGetDataHeadingToTextSupplierTableVariant.SUPPLIER_PAGE)
    processData = [
        RATING_SUPPLIER_DATA ,
        ...(isCountryNeeded ? [COUNTRY_SUPPLIER_DATA] : []),
        ABOUT_SUPPLIER_DATA
    ]

    return processData
            .map(it => getHeadingToText(it.heading, it.body))
            .filter(it => it !== undefined) as IHeadingToText[]
}