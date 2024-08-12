import { User } from '@/entities/User'
import cl from './UserProfileModal.module.scss'
import { useActionCreators, useAppSelector } from '@/storage/hooks'
import { LK_OLD_MODAL_MENU_DATA } from '../../data/userAuth.data'
import { Button, ButtonVariant } from '@/shared/ui/Button'
import { cls } from '@/shared/lib/classes.lib'
import { DASHBOARD_PAGES, MAIN_PAGES } from '@/config/pages-url.config'

interface IUserProfileModal {
  isShowProfileModal: boolean,
}

export const UserProfileModal = ({ isShowProfileModal }: IUserProfileModal) => {

  // RTK
  const user = useAppSelector(state => state.user)
  const actionCreators = useActionCreators();

  // HANDLE
  const logOut = () => {
    actionCreators.setNotAuth();
  };

  // HTML
  return (
    <section className={cls(cl.UserProfileModal, isShowProfileModal ? cl.visible : '')} >
      <div className={cl.topContainer}>
        <div className={cl.user}>
          <p className={cl.greetings}>Здравствуйте, <span>{user.fullName}</span></p>
          <User />
        </div>
        <Button variant={ButtonVariant.BACKGROUND_GRAY} title={"Личный кабинет"} href={DASHBOARD_PAGES.HOME.path} className={cl.lk} />
      </div>
      <div className={cl.bottomContainer}>
        {LK_OLD_MODAL_MENU_DATA.map(it => (
          <Button variant={ButtonVariant.ALMOST_RECTANGULAR}
                  title={it.title} href={it.link}
                  className={cls(cl.menuButtons, it.link === MAIN_PAGES.HOME.path ? cl.logOutButton : '')}
                  onClick={it.link === MAIN_PAGES.HOME.path ? logOut : () => {}} key={it.link} />
        ))}
      </div>
    </section>
  )
}

export default UserProfileModal