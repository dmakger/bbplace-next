import { SWITCH_SELECTOR_PRODUCT_OPTIONS } from "@/entities/Product/data/product.data";
import Input from "@/shared/ui/Input/Input";
import { EInputTextTypeVariants } from "@/shared/ui/Input/Text/model/text.input.model";
import { EInputVariants } from "@/shared/ui/Input/model/input.model";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput/ui/WrapperRectangleInput";

export default function MainPage() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '15px', backgroundColor: '#fff', height: '100%' }}>
            <WrapperRectangleInput
                labelText="Наименование"
                warningTooltipText='Обязательно для заполнения'
                descriptionTooltipText='tooltip'
                isRequired
            >
                <Input.Text variant={EInputVariants.RECTANGULAR} placeholder="ddd" />
                <Input.Select variant={EInputVariants.RECTANGULAR} options={SWITCH_SELECTOR_PRODUCT_OPTIONS}
                placeholder="dsadasd" arrowSizes={{width: 16, height: 16}}/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Категории"
                descriptionTooltipText='Выберите наиболее подходящую нишу вашего товара из нашего списка категорий'>
                <Input.TextAndSelect variant={EInputVariants.RECTANGULAR} placeholder="dsad" listOptions={SWITCH_SELECTOR_PRODUCT_OPTIONS} arrowSizes={{width: 16, height: 16}}/>
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Описание"
                warningTooltipText='Выберите наиболее подходящую нишу вашего товара из нашего списка категорий'
                isRequired >
                <Input.Text inputTypeVariant={EInputTextTypeVariants.TEXTAREA} 
                placeholder="dasdasdas"
                
                variant={EInputVariants.RECTANGULAR}
                />
            </WrapperRectangleInput>
            <WrapperRectangleInput
                labelText="Описание"
                warningTooltipText='Выберите наиболее подходящую нишу вашего товара из нашего списка категорий'
                isRequired>
                <Input.Text
                placeholder="dasdasdas"
                
                variant={EInputVariants.RECTANGULAR}
               />
            </WrapperRectangleInput>
        </div>
    )
}
