import { IWarningIcon } from "../model/model";
import WarningIcon from '@/shared/assets/img/Tooltip/TooltipWarning.svg';
import WarningIconNegative from '@/shared/assets/img/WarningIcon/WarningIconNegative.svg';
import WarningIconPositive from '@/shared/assets/img/WarningIcon/WarningIconPositive.svg'


export const TOOLTIP_WARNING_ICON: IWarningIcon = {
    default: WarningIcon,
    negative: WarningIconNegative,
    positive: WarningIconPositive,
}