import { PRODUCT_PTC_ITEM_DATA, PTC_LIST_DATA } from "@/shared/data/ptc.data";
import Input from "@/shared/ui/Input/Input";
import cl from './_PTCSelect.module.scss'

export default function PTCSelect() {
    return (
        <Input.Select defaultOption={PRODUCT_PTC_ITEM_DATA} options={PTC_LIST_DATA} classNameTitle={cl.select} />
    )
}
