import { cls } from "@/shared/lib/classes.lib";
import cl from './_HoverWindow.module.scss';
import { IImageSizes } from "@/shared/model/image.model";
import { ImageAPI } from "../../Image/API/ImageAPI";
import { EHoverBorderColor, EHoverWindowPosition } from "../model/hoverWindow.model";


interface IHoverWindow {
    className?: string;
    classNameContainer?: string;
    classNameTriangle?: string;
    position?: EHoverWindowPosition;
    borderColor?: EHoverBorderColor;
    show?: boolean,
    text: string;
    image?: string;
    imageSizes?: IImageSizes;
}

export const HoverWindow = ({
    className,
    classNameContainer,
    classNameTriangle,
    position = EHoverWindowPosition.UP,
    borderColor = EHoverBorderColor.DEFAULT,
    show,
    text,
    image,
    imageSizes = { width: 100, height: 100 }
}: IHoverWindow) => {

    const triangleStyles = {
        borderTopColor: position === 'up' ? borderColor : 'transparent',
        borderBottomColor: position === 'down' ? borderColor : 'transparent',
        borderLeftColor: position === 'left' ? borderColor : 'transparent',
        borderRightColor: position === 'right' ? borderColor : 'transparent'
    };

    return (
        <div className={cls(cl.HoverWindow, className, cl[position], show ? cl.show : '')}>
            <div className={cls(cl.windowContainer, classNameContainer)} style={{borderColor: `${borderColor}`}}>
                {image && <ImageAPI src={`${image}`} className={cl.image} width={imageSizes?.width} height={imageSizes?.height} />}
                <p className={cl.windowText}>
                    {text}
                </p>
            </div>
            <div className={cls(cl.triangle, classNameTriangle)} style={triangleStyles} />
        </div>
    );
};
