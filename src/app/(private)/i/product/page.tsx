'use client'
import { PRODUCT_PAGE_OPTIONS_ARRAY, SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION } from "@/shared/ui/SwitchSelector/data/switchSelector.data"
import { IUserProductsTab } from "@/features/DetailedPageInfo/model/detailedPageInfo.model"
import { HeaderLKPT } from "@/features/Headers/HeaderLK"
import { IOption } from '@/shared/model/option.model'
import { LKPTPage } from '@/features/LKPTPage'
import { useActionCreators } from '@/storage/hooks'
import cl from './_LKProductPage.module.scss'

import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'
import { ProductAPI } from '@/entities/Product/api/product.api'
import { useEffect, useState } from 'react'
import { ProductLK, ProductLKList } from '@/entities/Product/ui/LKProduct'
import { Modal } from '@/shared/ui/Modal/Modal'
import { EProductLKVariants } from '@/entities/Product/ui/LKProduct/model/productLK.model'
import { EModalView } from '@/shared/data/modal.data'
import { WrapperModalBottom } from '@/shared/ui/Wrapper/ModalBottom'
import { BottomProductSettingsModal } from '@/features/Modal/BottomProductSettings'
import { IProduct } from '@/entities/Product/model/product.model'
import { productApiListToProductList } from '@/entities/Product/lib/product.lib'
import { CurrencyAPI } from '@/entities/Metrics/api/currency.metrics.api'
import { MetricsAPI } from '@/entities/Metrics/api/metrics.metrics.api'
import { UserAPI } from '@/entities/Auth/api/auth.api'


export default function LKProductPage() {

    //STATE
    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);
    const [isOpenGroup, setIsOpenGroup] = useState<boolean>(false);
    const [activeProducts, setActiveProducts] = useState<IProduct[]>([])
    const [draftsProducts, setDraftsProducts] = useState<IProduct[]>([])
    const [selectedOption, setSelectedOption] = useState<IOption>(SWITCH_SELECTOR_WO_PRICE_PRODUCTS_OPTION)     

    //API
    const [userLogin] = UserAPI.useUserLoginMutation();

    //RTK
    const actionCreators = useActionCreators();

    const MY_PRODUCTS_OPTIONS_TAB: IUserProductsTab = {
        active: { optionTab: <>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eius ipsum impedit cumque animi cupiditate libero possimus culpa totam voluptatem eaque nostrum unde distinctio tempora illo quod repellat molestiae, qui recusandae corrupti pariatur voluptatum! Minima itaque ullam cupiditate architecto ducimus, labore voluptatem molestias temporibus tempora dignissimos. Sit, debitis nesciunt aliquam voluptatum modi veniam quis facilis animi itaque nobis unde fugit inventore, quia excepturi. Non temporibus corporis, porro ipsam eligendi voluptatum reiciendis magnam eaque eveniet recusandae sed architecto ullam, inventore placeat voluptate enim culpa debitis ex aspernatur necessitatibus at. Minima temporibus nobis autem soluta deleniti ullam quisquam placeat inventore facere nemo pariatur quas voluptate quidem nam accusamus officiis tenetur veniam cum maiores, ducimus maxime magni est? Quas neque voluptas at labore consectetur dolorem molestiae, inventore repellendus dicta odio molestias laborum ipsa quasi dignissimos possimus similique error minus porro iste iure sequi id provident qui. Consequatur ex, sequi ea praesentium doloribus maxime quisquam, tenetur quaerat, aspernatur nostrum fugit. Deleniti, quasi vel dignissimos dolore tempora tenetur iure blanditiis recusandae laudantium animi placeat nisi magnam non tempore fugiat accusantium atque dolor cupiditate dolorum magni beatae perferendis exercitationem! Commodi quibusdam quia at error possimus, voluptatem autem vitae maxime laborum, rerum nostrum quae. Explicabo repellendus iste expedita, eos atque deleniti! Reprehenderit, nam non optio laborum explicabo animi necessitatibus eligendi sed architecto assumenda, sunt minus blanditiis consectetur corporis at dolore harum perferendis nulla earum officia asperiores sapiente vero laboriosam. Quo, porro, iste nam, delectus voluptas dolorum eius soluta repudiandae quis illum nemo in. Amet magnam neque iure debitis quis quibusdam natus quaerat beatae, sapiente cupiditate fugiat commodi, quasi consequuntur eligendi. Nesciunt eius ex quo aliquam exercitationem dolorum optio voluptatum numquam consequuntur quia nam nulla tempore deleniti ad vero asperiores, non culpa minima cum error totam ea adipisci minus veniam. Eum soluta perspiciatis quibusdam! Laboriosam sint recusandae id vero temporibus beatae magnam, non natus labore perferendis numquam enim doloremque accusantium nemo laudantium, culpa, consequatur quas adipisci. Incidunt vitae temporibus aspernatur tenetur et numquam odit doloribus perspiciatis neque? Nostrum neque, sapiente, aut qui assumenda dolores sunt porro ullam quas consequuntur quo a magnam eveniet saepe. Nostrum consequatur ex distinctio necessitatibus culpa quasi voluptatum, dolorem consectetur blanditiis quibusdam excepturi voluptas rem doloribus vel, assumenda totam et sapiente! Maiores, exercitationem deserunt, alias odit hic modi id quod ut nam facilis pariatur ex voluptatibus quasi ullam? Odit, asperiores. Ab magni quis sequi numquam non id placeat, libero eveniet possimus. Ex suscipit eligendi doloribus rerum quia mollitia eum dolor consequuntur libero iure maiores ducimus, neque repellat beatae ad ullam consectetur! Repellat omnis suscipit, a impedit praesentium vitae quod doloremque saepe, voluptatibus nesciunt enim aliquam odit fuga labore et itaque iure porro molestiae qui animi sed dolore esse. Dicta voluptatem numquam nemo ipsam ad molestias, soluta, porro aut dolorem, dolore error cumque vero ex earum quidem! Cumque, consequatur temporibus facilis accusamus dolor itaque voluptates facere omnis quod incidunt fuga velit rem et expedita blanditiis laudantium, corrupti repellendus harum iure. Nihil cupiditate ut eligendi nobis quasi maxime fugit pariatur impedit, tempore et nesciunt quidem laborum esse, eveniet expedita perspiciatis sint earum suscipit aut, sunt unde itaque eius id blanditiis. Aperiam id distinctio quasi consequuntur et. Quod sint id eum beatae quia fugiat voluptas repellendus, quaerat voluptatibus, quos ipsum voluptate obcaecati consectetur accusantium iure fuga mollitia perferendis delectus facilis molestias neque! Dignissimos adipisci, voluptatibus dicta ipsa eligendi laborum eaque vero itaque quod ratione odit cupiditate. Odio at maiores magni delectus. Quod dolores quas aliquid enim accusantium quia omnis illum harum quos perferendis a, iusto doloremque reiciendis eum alias laboriosam nulla molestiae nam dolorum! Temporibus earum voluptate corrupti aliquam repellendus nisi sequi maxime, impedit quo voluptatibus dolore suscipit ad cum praesentium nostrum accusamus dignissimos ut. Quidem delectus impedit fuga soluta, nulla numquam consectetur non neque. Aliquam laudantium earum iste, magnam voluptatem distinctio vel dicta aut quam sapiente esse consequatur. Quisquam, veritatis unde at velit natus sequi consectetur cupiditate adipisci, ratione, quis maxime perferendis perspiciatis optio id hic et doloremque a magni fugiat mollitia amet quibusdam aspernatur facilis corporis. Iste optio quae velit tempore quam repellat fuga ex animi neque libero repudiandae minima quas sit in ea fugiat, cupiditate eaque? Eos temporibus ut accusamus, velit repellat voluptate excepturi explicabo debitis reprehenderit quia labore at nulla iste reiciendis maxime saepe quam fuga consequuntur eum dicta alias quisquam? Dolore, maiores adipisci ratione voluptate possimus quasi distinctio quidem iure neque cumque, quaerat harum maxime saepe veritatis totam porro eaque repudiandae quibusdam nulla non tenetur dolores ut id. Perspiciatis quos ab, consequatur eos soluta ipsa voluptatum, nulla repellendus alias mollitia quidem quaerat adipisci aspernatur tenetur dolorum optio molestias, autem quod et iure minima sed ea sint praesentium? Tempora harum quam nostrum maiores impedit, sunt, quasi enim nihil magnam dolorem soluta dolorum unde sit corrupti deserunt ipsum quis, libero quae. Corrupti in ipsum fugiat blanditiis tempore nisi, optio impedit minima nulla illum harum necessitatibus commodi et mollitia libero reprehenderit perferendis veritatis ut rem ex sint iste placeat labore! Voluptatum delectus excepturi sequi veniam recusandae sunt tenetur quaerat facere placeat ducimus, repudiandae, quae fuga architecto error reiciendis ab laborum aspernatur. Aliquam distinctio, recusandae quia cum molestiae mollitia sint consectetur dolorum soluta excepturi debitis eligendi eius architecto illum, repellat corporis inventore consequatur, totam unde ullam eos. Quo quia ad, unde animi dolor similique officia est aut reiciendis architecto autem excepturi ullam fugit. Quaerat nihil aspernatur quas adipisci exercitationem laborum distinctio quia optio, hic quam sed blanditiis temporibus laudantium dolor maiores doloribus animi alias ex numquam, dignissimos earum corrupti. Vel nihil eos ipsa at eum, rerum esse illum optio! Iure, sunt omnis facere nulla ducimus, nihil necessitatibus eos, porro esse deleniti ipsa adipisci modi eum tempora cumque ut? Commodi dicta laboriosam culpa ullam. Dolore libero labore aliquam itaque voluptates fugit quo, esse qui nam exercitationem ipsum dicta incidunt iusto, temporibus voluptate veritatis repellendus doloribus tenetur minus debitis odit voluptatibus, repudiandae recusandae. Ullam culpa tempora magnam. Consectetur, nam consequatur dolorum magnam quidem unde accusamus soluta deserunt doloremque provident deleniti architecto. Ea corrupti dolore aspernatur velit facere quam ratione quae maxime pariatur laudantium soluta nostrum, cum ducimus enim?</>, optionQuantity: 22 },
        drafts: { optionTab: <>dddddd</>, optionQuantity: 3 },
        woPrice: { optionTab: <>ddddwwww</>, optionQuantity: 0 },
    }

    const login = async () => {
        try {
            const data = await userLogin({
                username: 'ilya-yudenkov@mail.ru',
                password: '12345Ii'
            }).unwrap();            
            if (data) {
                actionCreators.setAuth(data);
            }
        } catch (error) {
            console.error('Ошибка аутентификации:', error);
        }
    };

    useEffect(() => {
        login()
    }, [])

    //API
    const { data: activeProductsAPI } = ProductAPI.useGetProductsByUserQuery({ userId: `55736903-ec19-4ea8-a591-fb03369910b0`, limit: 100000000, page: 0 }, { refetchOnMountOrArgChange: true })
    const { data: draftsProductsAPI } = ProductAPI.useGetDraftsByUserQuery({ limit: 100000000, page: 0 }, { refetchOnMountOrArgChange: true })
    const { data: currencyList } = CurrencyAPI.useGetCurrenciesQuery()
    const { data: metrics } = MetricsAPI.useGetMetricsQuery()

    //EFFECT
    useEffect(() => {
        if (activeProductsAPI)
            setActiveProducts(productApiListToProductList(activeProductsAPI, metrics, currencyList))
    }, [activeProductsAPI, metrics, currencyList])

    useEffect(() => {
        if (draftsProductsAPI)
        setDraftsProducts(productApiListToProductList(draftsProductsAPI, metrics, currencyList))
    }, [draftsProductsAPI, metrics, currencyList])


    //FUNCTIONS
    const closeTheModal = () => {
        if (isOpenSettings) setIsOpenSettings(false)
        if (isOpenGroup) setIsOpenGroup(false)
    }


    return (
        <Wrapper1280>
            <div className={cl.LKProductPage}>
                <HeaderLKPT title={'Мои товары'}
                    selectedOption={selectedOption}
                    options={PRODUCT_PAGE_OPTIONS_ARRAY}
                    setSelectedOption={setSelectedOption}
                    optionsTab={MY_PRODUCTS_OPTIONS_TAB} />
                <LKPTPage optionsTab={MY_PRODUCTS_OPTIONS_TAB}
                    selectedOption={selectedOption} />
            </div>
            {activeProducts && 
                <ProductLK product={activeProducts[128]}
                    setIsOpenGroup={setIsOpenGroup}
                    setIsOpenSettings={setIsOpenSettings}
                    variant={EProductLKVariants.DEFAULT} />
            }
            <Modal view={EModalView.BOTTOM}
                buttonNode
                _isOpen={isOpenSettings || isOpenGroup}
                onClickOverlay={closeTheModal}>
                <WrapperModalBottom
                    setIsOpen={closeTheModal}
                    title={isOpenSettings ? "Выбор действия" : 'Варианты товара'}
                    bottomChildren={isOpenSettings ? activeProducts && <BottomProductSettingsModal
                        product={activeProducts[0]}
                        setIsOpen={setIsOpenSettings}
                    /> : isOpenGroup && activeProducts && <ProductLKList products={[]}
                        variant={EProductLKVariants.GROUP_ITEM} />}
                />
            </Modal>
        </Wrapper1280>
    )
}
