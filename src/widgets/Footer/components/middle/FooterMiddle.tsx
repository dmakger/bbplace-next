import { Button } from '@/shared/ui/Button'
import cl from './_FooterMiddle.module.scss'
import { ButtonColor, ButtonSize, ButtonVariant } from '@/shared/ui/Button/model/button.model'
import { SUPPORT_SECONDARY_ICON } from '@/shared/ui/Icon/data/support.data.icon'
import { AT_SIGN_ICON } from '@/shared/ui/Icon/data/atSign.data'
import { INSTAGRAM_ICON } from '@/shared/ui/Icon/data/instagram.data'
import { LINKED_IN_ICON } from '@/shared/ui/Icon/data/linkedIn.data'
import { TELEGRAM_ICON } from '@/shared/ui/Icon/data/telegram.data'
import { VK_ICON } from '@/shared/ui/Icon/data/vk.data'
import { WHATS_APP_ICON } from '@/shared/ui/Icon/data/whatsApp.data'
import { cls } from '@/shared/lib/classes.lib'


export const FooterMiddle = () => {
    
    const buttons = [
        { title: 'Поддержка', beforeImage: SUPPORT_SECONDARY_ICON },
        { title: 'О компании' },
        { className: cl.roundedButton, beforeImage: AT_SIGN_ICON, beforeProps: { width: 18, height: 18 } }
    ];

    const socialButtons = [
        { className: cls(cl.button, cl.instagram), beforeImage: INSTAGRAM_ICON },
        { className: cls(cl.button, cl.linkedIn), beforeImage: LINKED_IN_ICON },
        { className: cls(cl.button, cl.telegram), beforeImage: TELEGRAM_ICON },
        { className: cls(cl.button, cl.vk), beforeImage: VK_ICON },
        { className: cls(cl.button, cl.whatsApp), beforeImage: WHATS_APP_ICON }
    ];

    return (
        <div className={cl.FooterMiddle}>
            <div className={cl.leftContainer}>
                {buttons.map((btn, index) => (
                    <Button
                        key={index}
                        variant={ButtonVariant.TONAL}
                        size={ButtonSize.Medium}
                        color={ButtonColor.Secondary}
                        {...btn}
                    />
                ))}
            </div>
            <div className={cl.rightContainer}>
                {socialButtons.map((btn, index) => (
                    <Button
                        key={index}
                        variant={ButtonVariant.DEFAULT}
                        beforeProps={{ width: 20, height: 20 }}
                        {...btn}
                    />
                ))}
            </div>
        </div>
    );
};