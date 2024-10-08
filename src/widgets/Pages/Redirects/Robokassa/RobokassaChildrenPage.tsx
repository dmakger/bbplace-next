'use client'

import { cls } from "@/shared/lib/classes.lib"
import cl from './_RobokassaChildrenPage.module.scss'
import { useEffect, useState } from "react"
import { Loader } from "@/shared/ui/Loader"

interface IRobokassaChildrenPage {
    className?: string,
}

export const RobokassaChildrenPage = ({ className }: IRobokassaChildrenPage) => {

    //STATE
    const [timeLeft, setTimeLeft] = useState<number>(10);

    //EFFECT
    useEffect(() => {
        if (timeLeft > 0) {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }
    }, [timeLeft])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
    };
    return (
        <div className={cls(cl.RobokassaChildrenPage, className)}>
            {timeLeft > 0 && <div className={cl.timer}>
                <h2>Таймер</h2>
                <h3>{formatTime(timeLeft)}</h3>
            </div>}

            {timeLeft > 0 && <Loader />}
            {timeLeft ? <p>Пожалуйста, оставайтесь на этой странице до конца обработки оплаты!</p> : 
            <p>В течение 24 часов вы получите доступ. Если нет, обратитесь в поддержку!</p>}

        </div>
    )
}
