
import cl from './_ProductMultipleCreationPage.module.scss'
import { MuptipleCreationInstructionSubblock } from '../components/MuptipleCreationInstructionSubblock/MultipleCreationInstructionSubblock'

interface IProductMultipleCreationPage {}

export const ProductMultipleCreationPage = ({

}: IProductMultipleCreationPage) => {
  return (
    <div className={cl.ProductMultipleCreationPage}>
      <div className={cl.instructionContainer}>
        <MuptipleCreationInstructionSubblock/>
      </div>
      <div className={cl.formContainer}>

      </div>
    </div>
  )
}
