import { ENotifyStatus } from "@/features/Notify/data/notify.data";
/**
 * При нажатии копирует в буфер обмена переданную аргументом ссылку || 'info@bbplace.ru'
 * @param link?
 * @returns 
 */

export const handleCopyLink = (notify: Function, link?: string) => {
    const linkToCopy = link || 'info@bbplace.ru';

    navigator.clipboard.writeText(linkToCopy)
        .then(() => {
            notify({text:`Ссылка скопирована в буфер обмена: ${linkToCopy}`, status: ENotifyStatus.Success })
        })
        .catch(() => {
            notify({text:`Ошибка при копировании ссылки: ${linkToCopy}`, status: ENotifyStatus.Error })
        });
};