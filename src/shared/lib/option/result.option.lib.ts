import { IOption, IOptionWOId } from "../../model/option.model";
import { IResult } from "../../model/result.model";



export const getFilteredOption = (data: IOptionWOId[]) => {
    const success: IOptionWOId[] = []
    const errors: IOptionWOId[] = []

    for (let opt of data) {
        if (opt.value || (opt.options && opt.options.length > 0) || opt.option) {
            success.push(opt)
        } else {
            errors.push(opt)
        }
    }
    return {success, errors} as IResult<IOptionWOId>
}
