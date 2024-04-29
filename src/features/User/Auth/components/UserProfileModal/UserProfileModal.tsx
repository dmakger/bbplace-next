import { User } from '@/entities/User'
import cl from './UserProfileModal.module.scss'
import { useAppSelector } from '@/storage/hooks'
import { LK_MODAL_MENU_DATA } from '../../data/userAuth.data'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { cls } from '@/shared/lib/classes.lib'
import { MAIN_PAGES } from '@/config/pages-url.config'
import { RefObject } from 'react'


interface IUserProfileModal{
  isShowProfileModal: boolean,
  ref: RefObject<HTMLDivElement>
}

export const UserProfileModal = ({isShowProfileModal, ref}: IUserProfileModal) => {

  const {fullName} = useAppSelector(state => state.user)

  return (
    <section className={cls(cl.UserProfileModal, isShowProfileModal ? cl.visible : '')} ref={ref}>
        <div className={cl.topContainer}>
          <div className={cl.user}>
            <p className={cl.greetings}>Здравствуйте, <span>Соленные кобачки</span></p>
            <User />
          </div>
            <p className={cl.lk}>Личный кабинет</p>
        </div>
        <div className={cl.bottonContainer}>
            {LK_MODAL_MENU_DATA.map(it => (
              <Button variant={ButtonVariant.ALMOST_RECTANGULAR} href={it.link} classNameButton={cls(cl.menuButtons, it.link === MAIN_PAGES.HOME ? cl.logOutButton : '')}>
                {it.title}
              </Button>
            ))}
        </div>
    </section>
  )
}

export default UserProfileModal