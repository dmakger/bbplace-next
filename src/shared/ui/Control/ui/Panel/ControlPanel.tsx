import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ControlPanel.module.scss'
import { ControlSmall } from "../Small/ControlSmall";
import { Axis } from "@/shared/model/button.model";
import { Button } from "@/shared/ui/Button";
import { IMAGE_FIRST__ICON } from "@/shared/ui/Icon/data/imageFirst.data.icon";

interface ControlPanelProps {
    current: number
    onClickMakeFirst?: Function
    onClickPrev?: Function
    onClickNext?: Function
    className?: string,
}

export const ControlPanel:FC<ControlPanelProps> = ({current, onClickMakeFirst, onClickPrev, onClickNext, className}) => {
    return (
        <div className={cls(cl.block, className)}>
            {/* <ControlSmall axis={Axis.Left} onClick={onClickPrev} /> */}
            <ControlSmall icon={IMAGE_FIRST__ICON} onClick={onClickMakeFirst} />
            <span className={cl.content}>{current}</span>
            {/* <ControlSmall axis={Axis.Right} onClick={onClickNext} /> */}
        </div>
    )
}
