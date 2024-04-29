"use client"
import { useRef, useState } from 'react'

import { UserAuth } from '../components/UserAuth/UserAuth'
import { UserNotAuth } from '../components/UserNotAuth/UserNotAuth'
import { useAppSelector } from '@/storage/hooks'

interface IHeaderUser {
    className?: string,
}

export const HeaderUser = ({ className }: IHeaderUser) => {

    const { isAuth, id } = useAppSelector(state => state.user)

    return (
        <>
            {isAuth ?
                <UserAuth userId={id} /> :
                <UserNotAuth isAuth={isAuth} />}
        </>
    )
}

