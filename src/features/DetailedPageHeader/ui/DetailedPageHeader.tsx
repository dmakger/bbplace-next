import { cls } from "@/shared/lib/classes.lib"
import cl from './_DetailedPageHeader.module.scss'
import { IWholesale } from "@/entities/Metrics/model/wholesale.metrics.model"
import { HeadingToTextTable } from "@/shared/ui/Text"
import { EHeadingToTextVariants, IHeadingToText } from "@/shared/model/text.model"
import { FavouriteAutoToProductButton } from "@/entities/Product/components/Buttons/Favourite/Auto/FavouriteAutoToProductButton"
import { EProductFavouriteViewItem } from "@/entities/Product/data/view.product.data"
import { ButtonFavouriteVariant } from "@/shared/ui/Button/Favourite/ButtonFavourite"
import { MobileOrderFooter } from "@/shared/ui/DetailedPage"
import { useInView } from "react-intersection-observer"

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

    const { ref, inView, } = useInView({
        threshold: 0,
    });

    return (
        <div className={cls(cl.DetailedPageHeader, className)}>
            <div className={cl.leftContainer} >
                <div className={cl.topContainer} >
                    {type && <span className={cl.type}>{type}</span>}
                    <p className={cl.name}>{name}</p>
                </div>
                <div className={cl.restInfo} >
                    <FavouriteAutoToProductButton productId={id} view={EProductFavouriteViewItem.SMALL_FILL} variantFavourite={ButtonFavouriteVariant.New} />
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
            {isRightContainer && <div className={cl.rightContainer} ref={ref}>
                <MobileOrderFooter className={cl.topMobileOrderFooter}
                    supplierId={supplierId ?? ''}
                    wholesalePrices={wholesalePrices ?? []}
                    isTop />
                <MobileOrderFooter className={!inView ? cl.visible : ''}
                    supplierId={supplierId ?? ''}
                    wholesalePrices={wholesalePrices ?? []}/>
            </div>}
        </div>
    )
}
