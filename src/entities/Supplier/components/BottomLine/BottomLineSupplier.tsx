import cl from './_BottomLineSupplier.module.scss'
import { VerifiedSupplier } from "../Verified/VerifiedSupplier";
import { ISupplier } from "../../model/supplier.model";
import { isVerified } from "../../lib/boolean.supplier.lib";
import { cls } from "@/shared/lib/classes.lib";
import { InfoItem } from "@/shared/ui/InfoItem";
import { EInfoItemColor } from "@/shared/ui/InfoItem/model/infoItem.model";
import { Rating } from "@/shared/ui/Rating";

interface IBottomLineSupplier {
    supplier: ISupplier,
    hasVerifiedStatus?: boolean,
    hasCountry?: boolean,
    supplierRating?: number,
    numberOfReviews?: number,
    isForDescPage?: boolean,
    className?: string,
    classNameVerified?: string
}

export const BottomLineSupplier = ({
    supplier,
    hasVerifiedStatus,
    hasCountry = false,
    supplierRating = 0,
    numberOfReviews = 0,
    isForDescPage,
    className,
    classNameVerified
}: IBottomLineSupplier) => {

    const verifiedSupplier = <VerifiedSupplier _isVerified={isVerified(supplier)} hasIcon={isForDescPage} className={classNameVerified}/>

    return (
        <div className={cls(cl.lineContainer, className)}>
            {isForDescPage ? (
                <>
                    <InfoItem body={<Rating rating={supplierRating}
                        numberOfReviews={numberOfReviews}
                        hasStar />}
                        color={EInfoItemColor.YELLOW} />
                    {isVerified(supplier) && <InfoItem body={verifiedSupplier} color={EInfoItemColor.GREEN} />}
                </>
            ) : (
                <>
                    {hasCountry && supplier.country &&
                        <span>{supplier.country}</span>
                    }

                    {hasVerifiedStatus && verifiedSupplier}

                    {/* {
                        supplierRating > 0 &&
                        <span className={cl.rating}>{supplierRating}</span>
                    } */}
                </>
            )}
        </div>
    )
}
