
import cl from './_WrapperModalBottom.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { XMARK_HOVERED_ICON } from '@/shared/ui/Icon/data/xmark.data.icon'
import { IProduct } from '@/entities/Product/model/product.model'
import { ReactNode } from 'react'

interface IWrapperModalBottom {
    product?: IProduct,
    isOpen: boolean,
    setIsOpen: Function,
    title?: string,
    topChildren?: ReactNode,
    bottomChildren?: ReactNode
}

export const WrapperModalBottom = ({
    product,
    isOpen,
    setIsOpen,
    title,
    topChildren,
    bottomChildren
}: IWrapperModalBottom) => {
    const productI = {
        id: 521312321,
        groupId: 63,
        name: "Брус обрезной 1 сорт",
        ownerId: "55736903-ec19-4ea8-a591-fb03369910b0",
        categoryId: 1062,
        country: "",
        certification: true,
        delivery: [
            "Авто",
            "ЖД"
        ],
        paymentConditions: "",
        deliveryTime: "от 5 дней",
        packagingLength: 0,
        packagingWidth: 0,
        packagingHeight: 0,
        packageType: "",
        vat: 0,
        isCustomDesign: false,
        isHasTestProbe: false,
        status: "Готово к отправке",
        warehouses: [
            "Мариинск",
            "Москва"
        ],
        media: {
            sale: 0,
            color: '150 * 200 * 6000',
            country: "РФ",
            attachments: [],
            wholesalePrices: [{ price: 17000, quantity: 1 }],
            sizes: [],
            article: "107",
        },
        characteristics: {
            brand: "",
            weight: 0,
            weightUnits: "",
            expirationDate: "",
            gender: "",
            country: '132',
            features: ["Естественной влажности"],
            description: "Брус обрезной сорта из сосны - надежный строительный материал с точными размерами и гладкой поверхностью. Идеально подходит для строительства каркасов, стен и потолков. \\nЦена без НДС\\n\\nГОСТ 8486-86",
            composition: "100% Сосна",
            equipment: ""
        },
        createdAt: "10/12/2023 07:44:36",
        deletedAt: null
    }
    return (
        <div className={cl.modalBelowWrapper}>
            <Button variant={ButtonVariant.DEFAULT}
                beforeImage={XMARK_HOVERED_ICON}
                beforeProps={{ width: 27, height: 27 }}
                className={cl.xmarkButton}
                onClick={() => setIsOpen(false)} />
            {(topChildren || title) && <div className={cl.topContainer}>
                {topChildren}
                <h4>
                    {title}
                </h4>
            </div>}
            {bottomChildren}
        </div>
    )
}
