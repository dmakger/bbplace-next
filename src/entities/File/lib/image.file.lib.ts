import { FileView } from "../data/view.file.data";

/**
 * Возвращает размер сообщения по его `FileView`
 */
export const getSizeImageByView = (view: FileView) => {
    if (view === FileView.Default)
        return 25
    return 20
}