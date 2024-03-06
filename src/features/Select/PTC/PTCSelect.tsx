import { ALL_PTC_ITEM_DATA, PTC_LIST_DATA } from "@/shared/data/ptc.data";
import Input from "@/shared/ui/Input/Input";    

export default function PTCSelect() {
    return (
        <Input.Select defaultOption={ALL_PTC_ITEM_DATA} options={PTC_LIST_DATA} />
    )
}
