import { User } from '@/entities/User'
import cl from './UserProfileModal.module.scss'
import { useActionCreators, useAppSelector } from '@/storage/hooks'
import { LK_MODAL_MENU_DATA } from '../../data/userAuth.data'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { cls } from '@/shared/lib/classes.lib'
import { DASHBOARD_PAGES, MAIN_PAGES } from '@/config/pages-url.config'

interface IUserProfileModal {
  isShowProfileModal: boolean,
}

export const UserProfileModal = ({ isShowProfileModal }: IUserProfileModal) => {

  const { fullName } = useAppSelector(state => state.user)

  const actionCreators = useActionCreators();

  const logOut = () => {
    actionCreators.setNotAuth();
  };

  return (
    <section className={cls(cl.UserProfileModal, isShowProfileModal ? cl.visible : '')} >
      <div className={cl.topContainer}>
        <div className={cl.user}>
          <p className={cl.greetings}>Здравствуйте, <span>{fullName}</span></p>
          <User />
        </div>
        <Button variant={ButtonVariant.BACKGROUND_GRAY}
          href={DASHBOARD_PAGES.HOME}
          classNameButton={cl.lk}>
          Личный кабинет
        </Button>
      </div>
      <div className={cl.bottomContainer}>
        {LK_MODAL_MENU_DATA.map(it => (
          <Button variant={ButtonVariant.ALMOST_RECTANGULAR}
            key={it.link}
            classNameButton={cls(cl.menuButtons, it.link === MAIN_PAGES.HOME ? cl.logOutButton : '')}
            href={it.link}
            onClick={it.link === MAIN_PAGES.HOME ? logOut : () => { }}>
            {it.title}
          </Button>
        ))}
      </div>
    </section>
  )
}

export default UserProfileModal