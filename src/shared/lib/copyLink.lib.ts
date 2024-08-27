import { ENotifyStatus } from "@/features/Notify/data/notify.data";
/**
 * При нажатии копирует в буфер обмена переданную аргументом ссылку || 'info@bbplace.ru'с заданным текстом в аргументе text или дефолтным 
 * @param notify
 * @param link
 * @param text
 * @param textError
 * @returns 
 */

export const handleCopyLink = (notify: Function, link?: string, text?: string, textError?: string) => {
    const linkToCopy = link || 'info@bbplace.ru';
    const textDefault = text || `Ссылка скопирована ${linkToCopy}`
    const textErrorDefault = textError || `Ошибка при копировании ссылки: ${linkToCopy}`;

    navigator.clipboard.writeText(linkToCopy)
        .then(() => {
            notify({text:`${textDefault}`, status: ENotifyStatus.Success })
        })
        .catch(() => {
            notify({text:`${textErrorDefault}`, status: ENotifyStatus.Error })
        });
};