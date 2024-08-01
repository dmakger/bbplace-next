/**
 * При нажатии копирует в буфер обмена переданную аргументом ссылку || 'info@bbplace.ru'
 * @param link?
 * @returns 
 */

export const handleCopyLink = (link?: string) => {
    const linkToCopy = link || 'info@bbplace.ru';

    navigator.clipboard.writeText(linkToCopy)
        .then(() => {
            console.log('Ссылка скопирована в буфер обмена:', linkToCopy);
        })
        .catch((error) => {
            console.error('Ошибка при копировании ссылки:', error);
        });
};