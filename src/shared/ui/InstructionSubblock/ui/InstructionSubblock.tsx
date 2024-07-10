import { cls } from "@/shared/lib/classes.lib"
import cl from './_InstructionSubblock.module.scss'

interface IInstructionSubblock {
    className?: string
    firstParagraph?: string,
    secondParagraph?: string,
    thirdParagraph?: string,
    fourthParagraph?: string
}

export const InstructionSubblock = ({
    className,
    firstParagraph,
    secondParagraph,
    thirdParagraph,
    fourthParagraph
}: IInstructionSubblock) => {
    return (
        <div className={cls(cl.InstructionSubblock, className)}>
            <p>
                {firstParagraph}
            </p>
            <p>
               {secondParagraph}
            </p>
            <p>
                {thirdParagraph}
            </p>
            <p>
                {fourthParagraph}
            </p>
        </div>
    )
}
