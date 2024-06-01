import { cls } from "@/shared/lib/classes.lib"
import cl from './_DetailedPageHeader.module.scss'
import { PriceQuantity } from "@/shared/ui/PriceQuantity/PriceQuantity"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { DASHBOARD_PAGES } from "@/config/pages-url.config"
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model"
import { HeadingToTextTable } from "@/shared/ui/Text"
import { EHeadingToTextVariants, IHeadingToText } from "@/shared/model/text.model"
import { FavouriteAutoToTenderButton } from "@/entities/Tender/components/Buttons/Favourite/Auto/FavouriteAutoToTenderButton"
import { ETenderFavouriteViewItem } from "@/entities/Tender/data/view.product.data"

interface IDetailedPageHeader {
    className?: string,
    id: number,
    name: string,
    type?: string,
    isRightContainer?: boolean,
    supplierId?: string,
    wholesalePrices?: IWholesale[]
    tableData: IHeadingToText[],
    classNameMainBlock?: string,
    classNameRow?: string,
    classNameHeadingItem?: string,
    classNameTextItem?: string
}

export const DetailedPageHeader = ({
    className,
    id,
    name,
    type,
    isRightContainer = false,
    supplierId,
    wholesalePrices,
    tableData,
    classNameMainBlock,
    classNameRow,
    classNameHeadingItem,
    classNameTextItem
}: IDetailedPageHeader) => {
    return (
        <div className={cls(cl.DetailedPageHeader, className)}>
            <div className={cl.leftContainer}>
                <div className={cl.topContainer}>
                    {type && <span className={cl.type}>{type}</span>}
                    <p className={cl.name}>{name}</p>
                </div>
                <div className={cl.restInfo}>
                    <FavouriteAutoToTenderButton tenderId={id} view={ETenderFavouriteViewItem.SMALL_FILL} />
                    <HeadingToTextTable
                        variant={EHeadingToTextVariants.ROW}
                        data={tableData} 
                        classNameMainBlock={cls(cl.restInfoMainBlock, classNameMainBlock)}
                        classNameRow={cls(classNameRow)}
                        classNameHeadingItem={cls(classNameHeadingItem)}
                        classNameTextItem={cls(classNameTextItem)}
                    />
                </div>
            </div>
            {isRightContainer && <div className={cl.rightContainer}>
                <PriceQuantity
                    wholesales={wholesalePrices ?? []}
                    className={cl.priceQuantity}
                    classNameWholesaleBlock={cl.wholesaleBlock}
                    firstStart="За "
                    classNameQuantity={cl.quantity}
                    classNamePrice={cl.price} />
                <div className={cl.buttonContainer}>
                    <Button variant={ButtonVariant.BACKGROUND_RED}
                        href={DASHBOARD_PAGES.CURRENT_CHAT(supplierId ?? '')} >
                        Заказать
                    </Button>
                </div>

            </div>}
        </div>
    )
}
