import { cls } from "@/shared/lib/classes.lib"
import cl from './_RobokassaSuccessChildrenPage.module.scss'

interface IRobokassaSuccessChildrenPage{
    className?: string,

}

export const RobokassaSuccessChildrenPage = ({className}: IRobokassaSuccessChildrenPage) => {
    return (
        <div className={cls(cl.RobokassaSuccessChildrenPage, className)}>
            Success
        </div>
    )
}