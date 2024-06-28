
import { Subblock } from '@/shared/ui/Subblock'
import cl from './_ProductMultipleCreationPage.module.scss'
import { MultipleCreateInstruction } from '../components/MuiltipleCreateInstruction/MultipleCreateInstruction'
import { Button } from '@/shared/ui/Button'
import { ButtonColor, ButtonSize, ButtonVariant } from '@/shared/ui/Button/model/button.model'
interface IProductMultipleCreationPage{

}

export const ProductMultipleCreationPage = ({

}: IProductMultipleCreationPage) => {
  return (
    <div className={cl.ProductMultipleCreationPage}>
        <div className={cl.instructionContainer}>
            <Subblock title="Инструкция"
                    wModal
                    children={<MultipleCreateInstruction/>}
                    mobileButtonTitle='Инструкция'
                    modalTitle="Инструкция"
                    bottomModalChildren={<MultipleCreateInstruction/>} 
                    childrenButton={<Button title='Подробнее' variant={ButtonVariant.BORDER} size={ButtonSize.Medium} color={ButtonColor.Secondary}/>}/>
        </div>
        <div className={cl.formContainer}>

        </div>
    </div>
  )
}
