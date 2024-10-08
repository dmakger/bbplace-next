import { IWarningIcon } from "../model/icon.model";
import WarningIcon from '@/shared/assets/img/WarningIcon/WarningIcon.svg';
import WarningIconNegative from '@/shared/assets/img/WarningIcon/WarningIconNegative.svg';
import WarningIconPositive from '@/shared/assets/img/WarningIcon/WarningIconPositive.svg'


export const TOOLTIP_WARNING_ICON: IWarningIcon = {
    default: WarningIcon,
    active: WarningIconNegative,
    negative: WarningIconNegative,
    positive: WarningIconPositive,
}