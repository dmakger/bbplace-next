import { FC } from "react"
import { ImageProgressive } from "@/shared/ui/Image/Progressive/ImageProgressive";

interface TestChildrenPageProps{
    className?: string,
}

export const TestChildrenPage:FC<TestChildrenPageProps> = ({className}) => {
    const startImageURL = "https://bbplace.ru/fileservice/api/FilesS3/GetFile/";
    const imageKey = "040ec9c7-97ad-49e6-ba0a-8764fe5afcc9.JPG";
    // const imageUrl = "https://bbplace.ru/fileservice/api/FilesS3/GetFile/040ec9c7-97ad-49e6-ba0a-8764fe5afcc9.JPG";
    const imageUrl = "https://hb.bizmrg.com/image_store/040ec9c7-97ad-49e6-ba0a-8764fe5afcc9.JPG";
    // const imageUrl = "https://hb.bizmrg.com/image_store/ae4e2223-d0ba-4752-9f2a-f378f1275f19.jpg";

    return (
        // 2.2 MB
        // <ImageAPI src={imageKey} 
        //               variantDefault={ImageAPIVariants.Product}
        //               fill={true} />

        // 
        <ImageProgressive src={imageUrl} />
    )
}
