import { IHeadingToText } from "../model/text.model";


export const getHeadingToText = (heading: IHeadingToText["heading"], body: any) => {
    if (!body)
        return undefined
    return {heading, text: typeof(body) !== 'object' ? body.toString() : body} as IHeadingToText
}