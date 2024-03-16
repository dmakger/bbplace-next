const START_IMAGE_URL = "https://bbplace.ru/fileservice/api/FilesS3/GetFile"

export const getImage = (image: string) => {
    if (image.startsWith('https://'))
        return image
    return `${START_IMAGE_URL}/${image}`
}