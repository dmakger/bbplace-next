'use client'

import cl from './_BottomBlockSupplier.module.scss'
import { VerifiedSupplier } from "../Verified/VerifiedSupplier";
import { ISupplier } from "../../model/supplier.model";
import { isVerified } from "../../lib/boolean.supplier.lib";
import { cls } from "@/shared/lib/classes.lib";
import { InfoItem } from "@/shared/ui/InfoItem";
import { EInfoItemColor } from "@/shared/ui/InfoItem/model/infoItem.model";
import { Rating } from "@/shared/ui/Rating";
import { getCurrentLKRoleName } from '@/shared/lib/roles.lib';
import { useAppSelector } from '@/storage/hooks';
import { ECurrentLK } from '@/entities/User/model/user.model';

interface IBottomBlockSupplier {
    supplier: ISupplier,
    hasVerifiedStatus?: boolean,
    hasCountry?: boolean,
    supplierRating?: number,
    numberOfReviews?: number,
    isForDescPage?: boolean,
    className?: string,
    classNameVerified?: string
}

export const BottomBlockSupplier = ({
    supplier,
    hasVerifiedStatus,
    hasCountry = false,
    supplierRating = 0,
    numberOfReviews = 0,
    isForDescPage,
    className,
    classNameVerified
}: IBottomBlockSupplier) => {

    //RTK
    const { currentLK } = useAppSelector(state => state.user)   

    //VARIABLE
    const verifiedSupplier = <VerifiedSupplier _isVerified={isVerified(supplier)} hasIcon={isForDescPage} className={classNameVerified} />
    
    
    return (
        <div className={cls(cl.blockContainer, className)}>
            <p className={cl.topInfo}>
                {supplier.shortDescription?.trim() !== '' ? supplier.shortDescription : getCurrentLKRoleName(currentLK as ECurrentLK)}
            </p>
            
            <div className={cl.restInfo}>
                    {/* <InfoItem body={<Rating rating={supplierRating}
                        numberOfReviews={numberOfReviews}
                        hasStar />}
                        color={EInfoItemColor.YELLOW} /> */}

                    {hasCountry && <InfoItem body={supplier.country} color={EInfoItemColor.DEFAULT} />}
                
                    {isVerified(supplier) && <InfoItem body={verifiedSupplier} color={EInfoItemColor.GREEN} />}

                </div>
        
        
        </div>
    )
}
