'use client'

import { ReactNode } from 'react'
import cl from './_WrapperRole.module.scss'
import { useAppSelector } from '@/storage/hooks'
import { ModalAction } from '@/shared/ui/Modal/ui/Action/ModalAction'
import { EModalView } from '@/shared/data/modal.data'
import { useRouter } from 'next/navigation'
import { ECurrentLK } from '@/entities/User/model/user.model'

interface IWrapperRole {
    children: ReactNode
}

export const WrapperRole = ({
    children
}: IWrapperRole) => {

    //RTK
    const { currentLK } = useAppSelector(state => state.user)

    //ROUTER
    const router = useRouter()

    //HANDLE
    const handleOnCloseModal = () => router.back();
    
    return (
        <>
            {currentLK === ECurrentLK.SELLER ? <>{children}</>
                : <>
                    <div className={cl.fill}>
                        <h2 className={cl.title}>Этот блок доступен только для Продавцов</h2>
                    </div>
                    <ModalAction
                        title={"Смените роль на Продавца в личном кабинете"}
                        isOpen={true} view={EModalView.BOTTOM}
                        hasBackground={true}

                        hasClose={true}
                        onClickOverlay={handleOnCloseModal}
                    />
                </>
            }
        </>
    )
}
