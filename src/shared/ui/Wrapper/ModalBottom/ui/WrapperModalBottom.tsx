
import { BottomProductSettingsModal } from '@/features/Modal/BottomProductSettings'
import cl from './_WrapperModalBottom.module.scss'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { XMARK_HOVERED_ICON, XMARK_ICON } from '@/shared/ui/Icon/data/xmark.data.icon'

interface IWrapperModalBottom {
    productId?: number,
    isOpen: boolean,
    setIsOpen: Function
}

export const WrapperModalBottom = ({
    productId,
    isOpen,
    setIsOpen
}: IWrapperModalBottom) => {
    return (
        <div className={cl.modalBelowWrapper}>
            <Button variant={ButtonVariant.DEFAULT}
                beforeImage={XMARK_HOVERED_ICON}
                beforeProps={{width: 27, height: 27}}
                className={cl.xmarkButton}
                onClick={() => setIsOpen(false)} />
            <BottomProductSettingsModal productId={productId ?? 0}
                isOpen={isOpen}
                setIsOpen={setIsOpen} />
        </div>
    )
}
