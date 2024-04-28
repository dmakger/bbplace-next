"use client"
import { useRef, useState } from 'react'

import WrapperClickOutside from '@/shared/ui/Wrapper/ClickOutside/WrapperClickOutside'
import { UserAuth } from '../components/UserAuth/UserAuth'
import { UserNotAuth } from '../components/UserNotAuth/UserNotAuth'
import { useAppSelector } from '@/storage/hooks'

interface IHeaderUser {
    className?: string,
}

export const HeaderUser = ({className}: IHeaderUser) => {

    const {isAuth} = useAppSelector(state => state.user)    

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
            {isAuth ?
                <UserAuth   /> :
                <UserNotAuth isAuth={isAuth}/>}
        </WrapperClickOutside>
    )
}

