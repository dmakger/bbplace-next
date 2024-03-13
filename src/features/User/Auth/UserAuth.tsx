"use client"

import { useRef, useState } from 'react'
import cl from './_UserAuth.module.scss'
import WrapperClickOutside from '@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside'
import User from '@/entities/User/ui/User'

interface UserAuthProps {
    className?: string
}

export default function UserAuth({className}: UserAuthProps) {
    // STATE
    const [isShow, setIsShow] = useState(false) 

    // REF
    const userRef = useRef<HTMLDivElement>(null)

    // CLICK
    const toggleShow = () => {
        setIsShow(prevState => !prevState)
    }

    return (
        <WrapperClickOutside _ref={userRef} isShow={isShow} handle={toggleShow}>
            <User />
        </WrapperClickOutside>
    )
}
