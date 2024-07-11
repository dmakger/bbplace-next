import { LOGO_ICON } from '../../Icon/data/logo.data.icon';
import { IImageSizes } from '@/shared/model/image.model';
import { Button, ButtonVariant } from '../../Button';

interface ILogo {
    className?: string,
    sizes?: IImageSizes
}

export const Logo = ({
    className,
    sizes = { width: 50, height: 50 }
}: ILogo) => {
    return (
        <Button href='/'
            variant={ButtonVariant.DEFAULT}
            className={className}
            beforeImage={LOGO_ICON}
            beforeProps={{ width: sizes.width, height: sizes.height }}
        />
    )
}
