import { FC } from "react"

import { cls } from '@/shared/lib/classes.lib';
import { IListItem } from "@/shared/model/list.model";
import { ImageMaximizeSlide } from "@/widgets/Slider/Image/Maximize/Item/ImageMaximizeSlide";
import { Button, ButtonVariant } from "@/shared/ui/Button";
import { ButtonColor, ButtonSize } from "@/shared/ui/Button/model/button.model";
import { TRASH_NEGATIVE_TO_WHITE_ICON } from "@/shared/ui/Icon/data/trash.data.icon";


interface ImageControlSliderItemProps extends IListItem<string> {
    onClickDelete?: Function
}

export const ImageControlSliderItem:FC<ImageControlSliderItemProps> = ({
    className,
    item,

    onClickDelete,
    ...rest
}) => {
    return (
        <div className={cls(className)}>
            {onClickDelete && (
                <Button variant={ButtonVariant.CONTENT} color={ButtonColor.Negative} size={ButtonSize.Medium}
                        beforeImage={TRASH_NEGATIVE_TO_WHITE_ICON} 
                        onClick={onClickDelete}/>
            )}
            <ImageMaximizeSlide item={item} hasMaximize={false} {...rest} />
        </div>
    )
}
