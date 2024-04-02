import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"

interface HandleSizeProps{
    width: number
    set: Dispatch<SetStateAction<boolean>>
}

export const HandleSize:FC<HandleSizeProps> = ({width, set}) => {
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);
        set(mediaQuery.matches);

        const handleResize = (e: MediaQueryListEvent) => {
            set(e.matches);
        };

        mediaQuery.addListener(handleResize);

        return () => {
            mediaQuery.removeListener(handleResize);
        };
    }, [width, set]);

    return null;
}
