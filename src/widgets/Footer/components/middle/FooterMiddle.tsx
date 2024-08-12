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
import { INSTAGRAM_LINK, LINKED_IN_LINK, TELEGRAM_LINK, VK_LINK, WHATS_APP_LINK } from '@/shared/data/sideLinks.data'
import { handleCopyLink } from '@/shared/lib/copyLink.lib'


interface IFooterMiddle {
    className?: string
}


export const FooterMiddle = ({
    className
}: IFooterMiddle) => {


    const leftButtons = [
        { title: 'Поддержка', beforeImage: SUPPORT_SECONDARY_ICON, beforeProps: { width: 18, height: 18 }, className: cl.button },
        { title: 'О компании', className: cl.button },
        { className: cls(cl.button, cl.roundedButton), beforeImage: AT_SIGN_ICON, beforeProps: { width: 18, height: 18 }, onClick: () => handleCopyLink() }
    ];

    const socialButtons = [
        { className: cls(cl.button, cl.socialButton, cl.instagram), beforeImage: INSTAGRAM_ICON, link: INSTAGRAM_LINK },
        { className: cls(cl.button, cl.socialButton, cl.linkedIn), beforeImage: LINKED_IN_ICON, link: LINKED_IN_LINK },
        { className: cls(cl.button, cl.socialButton, cl.telegram), beforeImage: TELEGRAM_ICON, link: TELEGRAM_LINK },
        { className: cls(cl.button, cl.socialButton, cl.vk), beforeImage: VK_ICON, link: VK_LINK },
        { className: cls(cl.button, cl.socialButton, cl.whatsApp), beforeImage: WHATS_APP_ICON, link: WHATS_APP_LINK }
    ];

    return (
        <div className={cls(cl.FooterMiddle, className)}>
            <div className={cl.leftContainer}>
                {leftButtons.map((btn, index) => (
                    <Button
                        key={index}
                        variant={ButtonVariant.TONAL}
                        size={ButtonSize.Medium}
                        color={ButtonColor.Secondary}
                        onClick={btn.onClick}
                        {...btn}
                    />
                ))}
            </div>
            <div className={cl.rightContainer}>
                {socialButtons.map((btn, index) => (
                    <Button
                        key={index}
                        href={btn.link}
                        linkTarget='blank'
                        variant={ButtonVariant.DEFAULT}
                        beforeProps={{ width: 20, height: 20 }}
                        {...btn}
                    />
                ))}
            </div>
        </div>
    );
};