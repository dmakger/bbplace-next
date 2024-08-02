import { Logo } from '@/shared/ui/Logo'
import cl from './_FooterBottom.module.scss'
import { ELogoVariants } from '@/shared/ui/Logo/model/logo.model'
import { cls } from '@/shared/lib/classes.lib'

interface IFooterBottom {
  className?: string
}


export const FooterBottom = ({
  className
}: IFooterBottom) => {
  return (
    <div className={cls(cl.FooterBottom, className)}>
      <small className={cl.copyright}>
        <span className={cl.copyrightName}> &copy; 2024 ООО «БиБиПлейс» </span>
        <span className={cl.copyrightDesc}>— интернет-сервис для оптового бизнеса</span>
      </small>
      <Logo variant={ELogoVariants.CREDITS_LINK} title='the business market' className={cl.logo} />
      <p className={cl.rightDesc}>
        Надежный мост к новым партнерствам
        и возможностям в онлайн коммерции
      </p>
    </div>
  )
}
