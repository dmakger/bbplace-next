import { cls } from "@/shared/lib/classes.lib"
import cl from './_RobokassaFailChildrenPage.module.scss'

interface IRobokassaFailChildrenPage{
    className?: string,

}

export const RobokassaFailChildrenPage = ({className}: IRobokassaFailChildrenPage) => {
    return (
        <div className={cls(cl.RobokassaFailChildrenPage, className)}>
            Fail
        </div>
    )
}
