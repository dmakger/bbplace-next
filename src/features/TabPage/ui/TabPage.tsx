import { cls } from "@/shared/lib/classes.lib"
import cl from './_TabPage.module.scss'
import { TabPageInstructionSubblock } from "../components/TabPageInstructionSubblock/TabPageInstructionSubblock"
import { TabPageForm } from "../components/TabPageForm/TabPageForm"
import { ETabPageVariant } from "../model/tabPage.model"

interface ITabPage {
    className?: string,
    isInstructionButton?: boolean,
    instructionText: string[]
    variant: ETabPageVariant
}

export const TabPage = ({ 
    className,
    instructionText,
    isInstructionButton = false,
    variant
}: ITabPage) => {
    return (
        <div className={cls(cl.TabPage, className)}>
            <div className={cl.instructionContainer}>
                <TabPageInstructionSubblock instructionText={instructionText} 
                 isInstructionButton={isInstructionButton}/>
            </div>
            <div className={cl.formContainer}>
                <TabPageForm variant={variant}/>
            </div>
        </div>
    )
}
