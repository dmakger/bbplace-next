"use client"

import { ReactNode, RefObject, useEffect } from 'react';

interface WrapperClickOutsideProps {
    _ref: RefObject<HTMLDivElement>
    isShow: boolean
    handle: Function
    children: ReactNode
    className?: string
}

export default function WrapperClickOutside({_ref, isShow, handle, children, className}: WrapperClickOutsideProps) {

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (_ref.current && !_ref.current.contains(event.target as Node) && isShow) {
                handle()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShow]);
    
    return (
        <div ref={_ref} className={className}>
            {children}
        </div>
    )
}
