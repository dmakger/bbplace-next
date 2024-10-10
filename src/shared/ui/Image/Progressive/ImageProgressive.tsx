import { FC } from "react"
import Image from 'next/image'

import { cls } from '@/shared/lib/classes.lib';
import cl from './_ImageProgressive.module.scss'
// import https from 'https';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { imageUrl } = req.query;

//   try {
//     // Создаем агент, который отключает проверку SSL
//     const agent = new https.Agent({
//       rejectUnauthorized: false, // Отключение проверки сертификатов (только для отладки!)
//     });

//     // Запрос к стороннему ресурсу с использованием прокси
//     const response = await fetch(imageUrl as string, { agent });
//     const arrayBuffer = await response.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
//     res.send(buffer);
//   } catch (error) {
//     res.status(500).send('Error fetching image');
//   }
// }


interface ImageProgressiveProps {
    src: string
    className?: string,
}

export const ImageProgressive:FC<ImageProgressiveProps> = ({
    src, className
}) => {
    return (
        <Image 
            src={src} 
            // src={`/api/proxy-image?imageUrl=${encodeURIComponent(src)}`}  
            alt={""}
            width={276} height={276} 
            // unoptimized={true} 
            className={cls(cl.image, className)}  />
    )
}
