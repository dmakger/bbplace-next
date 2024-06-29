import cl from './_MultipleCreationInstructionSubblock.module.scss'
import { Subblock } from "@/shared/ui/Subblock"
import { InstructionSubblock } from "@/shared/ui/InstructionSubblock"
import { Button, ButtonVariant } from "@/shared/ui/Button"
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model"


export const MuptipleCreationInstructionSubblock = () => {

    const instructionText = {
        firstParagraph: '1. Сгенерируйте и скачайте шаблон.',
        secondParagraph: 'Для генерации добавьте одну или несколько категорий, выбирая раздел, подраздел и иногда подподраздел.',
        thirdParagraph: '2. Наполните шаблон товарами и загрузите получившуюся таблицу.',
        fourthParagraph: 'Новые товары будут находится в разделе «Черновики». Чтобы перевести товары в раздел «Активные» добавьте к ним фотографии.'
    };

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
        <Subblock
            title="Инструкция"
            wModal
            children={<InstructionSubblock {...instructionText} />}
            mobileButtonTitle='Инструкция'
            modalTitle="Инструкция"
            classNameBottomContainer={cl.bottomContainer}
            bottomModalChildren={
                <div className={cl.modalInstruction}>
                    <InstructionSubblock {...instructionText} />
                    {instructionButton}
                </div>
            }
            childrenButton={instructionButton}
        />
    )
}
