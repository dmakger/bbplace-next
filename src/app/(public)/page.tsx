import Input from "@/shared/ui/Input/Input";
import { EInputSizes, EInputVariants } from "@/shared/ui/Input/model/input.model";
import { WrapperRectangleInput } from "@/shared/ui/Wrapper/RectangleInput/ui/WrapperRectangleInput";

export default function MainPage() {

    return (
        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: '#fff'}}>
            <WrapperRectangleInput labelText="Наименование">
                <Input.Text variant={EInputVariants.RECTANGULAR} size={EInputSizes.DEFAULT}/>
            </WrapperRectangleInput>
        </div>
    )
}
