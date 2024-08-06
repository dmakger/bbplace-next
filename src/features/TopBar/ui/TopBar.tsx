'use client'

import { Button, ButtonVariant } from '@/shared/ui/Button'
import cl from './_TopBar.module.scss'
import { HandleSize } from '@/shared/ui/Handle/Size/HandleSize'
import { useState } from 'react'
import { ButtonSize } from '@/shared/ui/Button/model/button.model'
import Wrapper1280 from '@/shared/ui/Wrapper/1280/Wrapper1280'

export const TopBar = () => {
    //STATE
    const [is768, setIs768] = useState<boolean>(false)

    return (
        <>
            <Wrapper1280 classNameContent={cl.content}>
                <div className={cl.topBar}>
                    <Button
                        title={!is768 ? 'Стать частью BBPlace и вывести бизнес на новый уровень' : 'Стать частью BBPlace'}
                        variant={ButtonVariant.TONAL}
                        size={ButtonSize.Medium}
                    />
                </div>

            </Wrapper1280>

            <HandleSize width={768} set={setIs768} />
        </>

    )
}
