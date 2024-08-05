import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ControlPanel.module.scss'
import { ControlSmall } from "../Small/ControlSmall";
import { Axis } from "@/shared/model/button.model";

interface ControlPanelProps {
    current: number
    onClickPrev?: Function
    onClickNext?: Function
    className?: string,
}

export const ControlPanel:FC<ControlPanelProps> = ({current, onClickPrev, onClickNext, className}) => {
    return (
        <div className={cls(cl.block, className)}>
            <ControlSmall axis={Axis.Left} onClick={onClickPrev} />
            <span className={cl.content}>{current}</span>
            <ControlSmall axis={Axis.Right} onClick={onClickNext} />
        </div>
    )
}
