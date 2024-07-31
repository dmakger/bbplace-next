import { Button } from '@/shared/ui/Button'
import cl from './_FooterMiddle.module.scss'
import { ButtonColor, ButtonSize, ButtonVariant } from '@/shared/ui/Button/model/button.model'


export const FooterMiddle = () => {
    return (
        <div className={cl.FooterMiddle}>
            <div className={cl.leftContainer}>
                <Button variant={ButtonVariant.TONAL} size={ButtonSize.Medium} color={ButtonColor.Secondary} title='Поддержка'/>
                <Button variant={ButtonVariant.TONAL} size={ButtonSize.Medium} color={ButtonColor.Secondary} title='О компании'/>
                <Button variant={ButtonVariant.TONAL} size={ButtonSize.Medium} color={ButtonColor.Secondary} title='@' className={cl.roundedButton}/>
            </div>
            <div className={cl.rightContainer}>

            </div>
        </div>
    )
}
