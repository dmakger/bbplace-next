import { FC } from "react"
import { ImageProgressive } from "@/shared/ui/Image/Progressive/ImageProgressive";

interface TestChildrenPageProps{
    className?: string,
}

export const TestChildrenPage:FC<TestChildrenPageProps> = ({className}) => {
    const imageUrl = "https://hb.bizmrg.com/image_store/ae4e2223-d0ba-4752-9f2a-f378f1275f19.jpg";

    return (
        // 2.2 MB
        // <ImageAPI src={imageKey} 
        //               variantDefault={ImageAPIVariants.Product}
        //               fill={true} />

        // 
        <>
            <ImageProgressive src={imageUrl} />
            <img src={imageUrl} />
        </>
    )
}
