import { cls } from "@/shared/lib/classes.lib"
import cl from './_UserAuth.module.scss'
import { User } from "@/entities/User"
import { removeFromStorage } from "@/entities/Auth/lib/auth-token.lib"

interface IUserAuth{
    className?: string,

}

export const UserAuth = ({className}: IUserAuth) => {

    const logout = () => {
        removeFromStorage()
        window.location.reload();
    };
    

    return (
        <div className={cls(cl.UserAuth, className)} onClick={logout}>
            <User   />
        </div>
    )
}
