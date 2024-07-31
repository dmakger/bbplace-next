import { ImageInputPrompt } from "../data/image.input.data"

export const getInputImagePrompt = (many: boolean) => {
    return many ? ImageInputPrompt.Many : ImageInputPrompt.One
}