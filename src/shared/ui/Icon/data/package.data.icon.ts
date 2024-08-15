import { IIcon } from "../model/icon.model";
import PackageDefaultIcon from '@/shared/assets/img/Package/PackageDefaultIcon.svg'
import PackageSecondaryHoveredIcon from '@/shared/assets/img/Package/PackageSecondaryHoveredIcon.svg'
import PackageSecondaryPressedIcon from '@/shared/assets/img/Package/PackageSecondaryPressedIcon.svg'


export const PACKAGE_ICON: IIcon = {
    default: PackageDefaultIcon,
    defaultHovered: PackageSecondaryHoveredIcon,
    defaultPressed: PackageSecondaryPressedIcon
}