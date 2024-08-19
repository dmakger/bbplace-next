'use client'

import cl from './_TopBar.module.scss'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { useState } from 'react'
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'
import { ButtonChevron } from '@/shared/ui/Button/data/Chevron/ButtonChevron'
import { usePathname, useRouter } from 'next/navigation'
import { MAIN_PAGES } from '@/config/pages-url.config'
import { useAppSelector } from '@/storage/hooks'

interface TopBarProps {
    isAuto?: boolean
}

export const TopBar = ({isAuto=true}: TopBarProps) => {
    // RTK
    const { isAuth: isUserAuth } = useAppSelector(state => state.user);

    //STATE
    const [is768, setIs768] = useState<boolean>(false)
    
    //ROUTER
    const router = useRouter()
    const pathname = usePathname();

    //FUNCTION
    const goToRegistration = () => router.push(MAIN_PAGES.REGISTRATION.path);

    if (isAuto && (pathname !== MAIN_PAGES.HOME.path || isUserAuth)) {
        return <></>
    }

    return (
        <>
            <Wrapper1280 classNameContent={cl.content}>
                <div className={cl.topBar}>
                    <ButtonChevron
                        className={cl.topBarButton}
                        title={!is768 ? 'Стать частью BBPlace и вывести бизнес на новый уровень' : 'Стать частью BBPlace'}
                        onClick={goToRegistration}
                    />
                </div>
            </Wrapper1280>
            <HandleSize width={768} set={setIs768} />
        </>
    )
}
