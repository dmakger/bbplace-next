import { SWITCH_SELECTOR_PRODUCT_OPTIONS } from "@/entities/Product/data/product.data";
import Input from "@/shared/ui/Input/Input";
import { EInputSizes, EInputVariants } from "@/shared/ui/Input/model/input.model";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput/ui/WrapperRectangleInput";

export default function MainPage() {

    return (
        <div style={{display: 'flex', justifyContent: 'center', gap: '15px', backgroundColor: '#fff'}}>
            <WrapperRectangleInput labelText="Наименование">
                <Input.Text variant={EInputVariants.RECTANGULAR} size={EInputSizes.DEFAULT} placeholder="ddd"/>
            </WrapperRectangleInput>
            <WrapperRectangleInput labelText="Наименование">
                <Input.TextAndSelect variant={EInputVariants.RECTANGULAR} size={EInputSizes.DEFAULT}  defaultOption={SWITCH_SELECTOR_PRODUCT_OPTIONS[0]} listOptions={SWITCH_SELECTOR_PRODUCT_OPTIONS}/>
            </WrapperRectangleInput>
        </div>
    )
}
