import { PRODUCT_PTC_ITEM_DATA, PTC_LIST_DATA } from "@/shared/data/ptc.data";
import Input from "@/shared/ui/Input/Input";
import cl from './_PTCSelect.module.scss'
import { cls } from "@/shared/lib/classes.data";

interface PTCSelectProps {
    classNameTitle?: string
    classNameOptions?: string
    className?: string
}

export default function PTCSelect({classNameTitle, classNameOptions, className}: PTCSelectProps) {
    return (
        <Input.Select defaultOption={PRODUCT_PTC_ITEM_DATA} options={PTC_LIST_DATA} 
                      classNameTitle={cls(cl.select, classNameTitle)} 
                      classNameOptions={classNameOptions} 
                      className={className} />
    )
}