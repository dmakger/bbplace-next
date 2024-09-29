"use client"

import { FC, useEffect, useRef, useState } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_NotifyItem.module.scss'
import { IListItem } from "@/shared/model/list.model";
import { INotify } from "../../model/notify.model";
import { useActionCreators } from "@/storage/hooks";
import { Button } from "@/shared/ui/Button";

interface NotifyItemProps extends IListItem<INotify> { }

export const NotifyItem: FC<NotifyItemProps> = ({
    item: notify,
    className,
}) => {

    //STATE
    const [moveSpeed, setMoveSpeed] = useState<number>(2)
    const [timer, setTimer] = useState<number>(0)

    //REF
    const notification = useRef<HTMLDivElement>(null)

    //RTK
    const actionCreators = useActionCreators()

    // EFFECT
    useEffect(() => {
        show()
    }, [])

    // HANDLE
    const show = () => {
        let current = 110
        let end = 0

        const interval = setInterval(() => {
            if (!notification.current)
                return

            current -= moveSpeed

            notification.current.style.transform = `translateX(${current}%)`
            notification.current.style.top = `20vh`

            if (current <= end) {
                clearInterval(interval)
                notification.current.style.transform = `translateX(0%)`

                const timeId = !notify.button ? window.setTimeout(hide, 2000) : 0;
                setTimer(timeId)
            }

        }, 1)
    }

    const hide = () => {

        if (timer !== 0) {
            clearTimeout(timer)
            setTimer(0)
        }

        let current = 0
        let end = 110

        const interval = setInterval(() => {
            if (!notification.current)
                return

            current += moveSpeed
            notification.current.style.transform = `translateX(${current}%)`
            if (current >= end) {
                clearTimeout(interval)
                notification.current.style.transform = `translateX(110%)`
                if (notify.id) {
                    actionCreators.deleteNotification(notify.id)
                }
            }

        }, 1)
    }

    const handleOnClickNotify = () => {
        setMoveSpeed(10)
        hide()
    }

    const handleOnClickButtonHide = () => {
        hide()
        notify.button?.onClick && notify.button.onClick();
    }

    return (
        <div ref={notification} onClick={notify.button ? ()=>{} : handleOnClickNotify} className={cls(cl.notify, className)}>
            {notify.button ?
                <Button {...notify.button} onClick={handleOnClickButtonHide}/>
                : <div className={cls(cl.content, cl[notify.status ?? ''])}>
                    <span className={cl.text}>{notify.text}</span>
                </div>}
        </div>
    );
}
