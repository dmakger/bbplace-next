import { cls } from "@/shared/lib/classes.lib"
import cl from './_InstructionSubblock.module.scss'

interface IInstructionSubblock {
    className?: string
    instructionText: string[]
}

export const InstructionSubblock = ({
    className,
    instructionText

}: IInstructionSubblock) => {
    return (
        <div className={cls(cl.InstructionSubblock, className)}>
            {instructionText.map(it => (
                <p key={it}>{it}</p>
            ))}
        </div>
    )
}
