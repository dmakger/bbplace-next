import { ImageInputPrompt } from "../data/image.input.data"

export const getInputImagePrompt = (many: boolean, loading?: boolean) => {
    if (loading)
        return ImageInputPrompt.Loading
    return many ? ImageInputPrompt.Many : ImageInputPrompt.One
}