import { useActionCreators } from "@/storage/hooks"
import { INotifyBody } from "../model/notify.model"

/**
 * Хук для добавления уведомлений
 */
export const useNotify = () => {
    //RTK
    const actionCreators = useActionCreators()

    return {
        notify(body: INotifyBody){
            actionCreators.addNotification(body)
        }
    }

}