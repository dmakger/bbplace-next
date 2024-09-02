'use client'

import { ReactNode, useEffect, useState } from "react";

interface IWrapperMount {
    children: ReactNode
}

export const WrapperMount = ({
    children
}: IWrapperMount) => {

    //STATE
    const [isMounted, setIsMounted] = useState<boolean>(false);

    //EFFECT
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Пока компонент не смонтирован, не рендерим ничего
    }

    return (
        <>
            {children}
        </>
    )
}
