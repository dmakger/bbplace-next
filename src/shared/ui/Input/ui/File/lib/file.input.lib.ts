import { FileInputPrompt } from "../data/file.input.data"

export const getInputFilePrompt = (many: boolean) => {
    return many ? FileInputPrompt.Many : FileInputPrompt.One
}