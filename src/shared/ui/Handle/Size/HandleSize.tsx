"use client"

import { Dispatch, FC, SetStateAction, useEffect } from "react"

interface HandleSizeProps {
    width: number;
    set: Dispatch<SetStateAction<boolean>>;
}

export const HandleSize: FC<HandleSizeProps> = ({ width, set }) => {
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);
        
        const handleResize = (e: MediaQueryListEvent) => {
            set(e.matches);
        };

        // Устанавливаем начальное значение
        set(mediaQuery.matches);

        mediaQuery.addEventListener('change', handleResize);

        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, [width, set]);

    return null;
}
