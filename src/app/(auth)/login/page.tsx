import Input from "@/shared/ui/Input/Input";
import { EInputSizes, EInputVariants } from "@/shared/ui/Input/model/input.model";
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { WrapperNotAuthPages } from "@/shared/ui/Wrapper/NotAuthPages";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput";

export default function LoginPage(){
    return (
       <Wrapper1280>
        <WrapperNotAuthPages pageTitle="Вход или регистрация профиля">
            <WrapperRectangleInput 
            labelText="Электронная почта"
            isRequired
            isDescriptionTooltip
            descriptionTooltipText="Введите адрес электронной почты, на которую был или будет зарегистрирован профиль"
            >
                <Input.Text type="email" variant={EInputVariants.RECTANGULAR} size={EInputSizes.DEFAULT} placeholder="Введите email"/>
            </WrapperRectangleInput>
        </WrapperNotAuthPages>
       </Wrapper1280>
    )
}