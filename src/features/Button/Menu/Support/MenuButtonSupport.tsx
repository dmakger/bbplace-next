'use client'

import { FC } from "react"

import { ButtonGrayToBlack } from "@/shared/ui/Button/GrayToBlack/ButtonGrayToBlack";
import { useRouter } from "next/navigation";
import { MAIN_PAGES } from "@/config/pages-url.config";

interface MenuButtonSupportProps{
    className?: string,
}

export const MenuButtonSupport:FC<MenuButtonSupportProps> = ({className}) => {
    const router = useRouter();

    const handleOnClick = () => {
        router.push(MAIN_PAGES.SUPPORT);
    }

    return (
        <ButtonGrayToBlack title={'Поддержка'} onClick={handleOnClick} className={className} />
    )
}
