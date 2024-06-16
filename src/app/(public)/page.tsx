import { SWITCH_SELECTOR_PRODUCT_OPTIONS } from "@/entities/Product/data/product.data";
import Input from "@/shared/ui/Input/Input";
import { EInputSizes, EInputVariants } from "@/shared/ui/Input/model/input.model";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput/ui/WrapperRectangleInput";

export default function MainPage() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '15px', backgroundColor: '#fff' }}>
            <WrapperRectangleInput
                labelText="Наименование"
                warningTooltipText='Обязательно для заполнения'
                descriptionTooltipText='tooltip'
                isRequired
            >
                <Input.Text variant={EInputVariants.RECTANGULAR} size={EInputSizes.DEFAULT} placeholder="ddd" />
                <Input.Select variant={EInputVariants.RECTANGULAR} size={EInputSizes.DEFAULT} options={SWITCH_SELECTOR_PRODUCT_OPTIONS}
                placeholder="dsadasd"/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Категории"
                descriptionTooltipText='Выберите наиболее подходящую нишу вашего товара из нашего списка категорий'>
                <Input.TextAndSelect variant={EInputVariants.RECTANGULAR} size={EInputSizes.DEFAULT} placeholder="dsad" listOptions={SWITCH_SELECTOR_PRODUCT_OPTIONS} />
            </WrapperRectangleInput>
        </div>
    )
}
