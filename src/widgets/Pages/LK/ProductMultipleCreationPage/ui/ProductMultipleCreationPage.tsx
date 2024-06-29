'use client'

import cl from './_ProductMultipleCreationPage.module.scss'
import { MuptipleCreationInstructionSubblock } from '../components/InstructionSubblock/MultipleCreationInstructionSubblock'
import { MultipleCreationForm } from '../components/Form/MultipleCreationForm'

interface IProductMultipleCreationPage { }

export const ProductMultipleCreationPage = ({

}: IProductMultipleCreationPage) => {
  return (
    <div className={cl.ProductMultipleCreationPage}>
      <div className={cl.instructionContainer}>
        <MuptipleCreationInstructionSubblock />
      </div>
      <div className={cl.formContainer}>
        <MultipleCreationForm />
      </div>
    </div>
  )
}
