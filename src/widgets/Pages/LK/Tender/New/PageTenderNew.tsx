import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import cl from './_PageTenderNew.module.scss'
import Wrapper1280 from "@/shared/ui/Wrapper/1280/Wrapper1280";
import { Subblock } from "@/shared/ui/Subblock";
import SubblockChild from "@/shared/ui/Subblock/components/Child/SubblockChild";
import { FormTenderPurchaseNew } from "@/features/Form/Tender/New/Purchase/FormTenderPurchaseNew";
import { FormTenderAutoNew } from "@/features/Form/Tender/New/Auto/FormTenderAutoNew";
import { ETenderType } from "@/entities/Tender/model/tender.model";

interface PageTenderNewProps{
    type: ETenderType
    className?: string,
    classNameForm?: string,
}

export const PageTenderNew:FC<PageTenderNewProps> = ({type, className, classNameForm}) => {
    const adviceText = [
        'Вы можете сменить тип размещения, например, с покупки на продажу, в любой момент.',
        'Значения уже заполненных схожих полей сохранятся.',
    ];

    return (
        <div className={cls(cl.block, className)}>
            <Subblock
                title="Совет"
                wModal={true}
                mobileButtonTitle='Совет'
                modalTitle="Совет"
                children={(
                    <SubblockChild.Text textList={adviceText} />
                )}
                className={cl.subblock}
            />
            <FormTenderAutoNew type={type} className={classNameForm} />
        </div>
    )
}
