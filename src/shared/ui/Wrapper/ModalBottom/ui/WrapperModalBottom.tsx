import { Button, ButtonVariant } from '@/shared/ui/Button'
import cl from './_WrapperModalBottom.module.scss'
import { ButtonColor, ButtonSize } from '@/shared/ui/Button/model/model'

interface IWrapperModalBottom{
    title?: string
}

export const WrapperModalBottom = ({
    title
}: IWrapperModalBottom) => {
    return (
        <div className={cl.modalBelowWrapper}>
            <Button variant={ButtonVariant.DEFAULT}
                title="close"
                className={cl.xmarkButton} />
            {title && <h4>{title}</h4>}
            <div className={cl.buttonsContainer}>
                <Button title='Удалить'
                    variant={ButtonVariant.TONAL}
                    color={ButtonColor.Primary}
                    size={ButtonSize.Medium} />

                <Button title='Редактировать'
                    variant={ButtonVariant.TONAL}
                    color={ButtonColor.Secondary}
                    size={ButtonSize.Medium} />
            </div>
        </div>
    )
}
