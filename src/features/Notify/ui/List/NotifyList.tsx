"use client"

import { useAppSelector } from '@/storage/hooks';
import { NotifyItem } from '../Item/NotifyItem';
import { List } from '@/shared/ui/List/Default/List';
import cl from './_NotifyList.module.scss'

export const NotifyList = () => {

    //RTK
    const {notifications} = useAppSelector(state => state.notify)

    return (
        <div className={cl.notifications}>
            <div className={cl.fixedContainer}>
                <div className={cl.sticky}>
                    <div className={cl.container}>
                        <List component={NotifyItem} items={notifications} className={cl.list} />
                    </div>
                </div>
            </div>
        </div>
    );
};