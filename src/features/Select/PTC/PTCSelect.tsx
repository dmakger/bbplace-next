import { PRODUCT_PTC_ITEM_DATA, PTC_LIST_DATA } from "@/shared/data/ptc.data";
import Input from "@/shared/ui/Input/Input";
import cl from './_PTCSelect.module.scss'
import { cls } from "@/shared/lib/classes.lib";

interface PTCSelectProps {
    classNameTitle?: string
    classNameOptions?: string
    className?: string,
    classNameButton?: string
}

export default function PTCSelect({classNameTitle, classNameOptions, className, classNameButton}: PTCSelectProps) {
    return (
        <div className={cl.selectContainer}>
            <Input.Select defaultOption={PRODUCT_PTC_ITEM_DATA} options={PTC_LIST_DATA}
                classNameTitle={cls(cl.select, classNameTitle)}
                classNameOptions={classNameOptions}
                className={className}
                classNameButton={classNameButton} />
        </div>    
    )
}
