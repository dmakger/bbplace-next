import { cls } from "@/shared/lib/classes.lib"
import cl from './_TabPageInstructionSubblock.module.scss'
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { Subblock } from "@/shared/ui/Subblock"
import { InstructionSubblock } from "@/shared/ui/InstructionSubblock"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"

interface ITabPageInstructionSubblock {
    className?: string,
    isInstructionButton?: boolean,
    instructionText: string[]
}

export const TabPageInstructionSubblock = ({
    className,
    isInstructionButton = false,
    instructionText
}: ITabPageInstructionSubblock) => {

    const instructionButton = (
        <Button
            title='Подробнее'
            variant={ButtonVariant.BORDER}
            size={ButtonSize.Medium}
            color={ButtonColor.Secondary}
            className={cl.button}
        />
    );

    return (
        <div className={cls(cl.TabPageInstructionSubblock, className)}>
            <Subblock
                title="Инструкция"
                wModal
                children={<InstructionSubblock instructionText={instructionText} />}
                mobileButtonTitle='Инструкция'
                modalTitle="Инструкция"
                classNameBottomContainer={cl.bottomContainer}
                bottomModalChildren={
                    <div className={cl.modalInstruction}>
                        <InstructionSubblock instructionText={instructionText} />
                        {isInstructionButton ? instructionButton : null}
                    </div>
                }
                childrenButton={isInstructionButton ? instructionButton : null}
            />
        </div>
    )
}
