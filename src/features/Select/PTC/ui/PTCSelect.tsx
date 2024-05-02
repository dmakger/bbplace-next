'use client'
import { PRODUCT_PTC_ITEM_DATA, PTC_LIST_DATA } from "@/shared/data/ptc.data";
import Input from "@/shared/ui/Input/Input";
import cl from './_PTCSelect.module.scss'
import { cls } from "@/shared/lib/classes.lib";
import { useCallback, useEffect, useState } from "react";
import { useActionCreators, useAppSelector } from "@/storage/hooks";
import { useRouter } from "next/navigation";
import { IOption } from "@/shared/model/option.model";
import { EPTC } from "@/widgets/NavBarPTC/model/ptc.model";

interface PTCSelectProps {
    classNameTitle?: string
    classNameOptions?: string
    className?: string,
    classNameButton?: string
}

export const PTCSelect = ({
    classNameTitle,
    classNameOptions,
    className,
    classNameButton = ''
}: PTCSelectProps) => {

    //STATE
    const [activeOption, setActiveOption] = useState<IOption | undefined>(PRODUCT_PTC_ITEM_DATA)

    //API
    const {view} = useAppSelector(state => state.ptc)

    //EFFECT
    useEffect(() => {
        setActiveOption(PTC_LIST_DATA.find(it => it.value === view))
    }, [view])

    //RTK
    const actionCreators = useActionCreators()

    //ROUTER
    const router = useRouter()

    //ON CHANGE
    const getActivePTC = useCallback((item: IOption) => {
        setActiveOption(PTC_LIST_DATA.find(it => it.value === item.value))
        if(activeOption && typeof(item.value) === 'string'){
            const activePTC = item.value as EPTC;
            actionCreators.setViewPTC(activePTC);
            router.push(`${activePTC}`);
        }
    }, [view])

    return (
        <div className={cl.selectContainer} >
            <Input.Select defaultOption={activeOption} options={PTC_LIST_DATA}
                classNameTitle={cls(cl.select, classNameTitle)}
                classNameOptions={classNameOptions}
                className={className}
                classNameButton={classNameButton}
                onClickOption={getActivePTC} />
        </div>    
    )
}
