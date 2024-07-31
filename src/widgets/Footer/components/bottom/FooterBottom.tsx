import { Logo } from '@/shared/ui/Logo'
import cl from './_FooterBottom.module.scss'
import { ELogoVariants } from '@/shared/ui/Logo/model/logo.model'

export const FooterBottom = () => {
  return (
    <div className={cl.FooterBottom}>
      <p className={cl.copyright}>
        © 2024 ООО «БиБиПлейс» <tr />
        — интернет-сервис для оптового бизнеса
      </p>
      <Logo variant={ELogoVariants.CREDITS_LINK} title='the business market'/>
      <p className={cl.rightDesc}>
        Надежный мост к новым партнерствам
        и возможностям в онлайн коммерции
      </p>
    </div>
  )
}
