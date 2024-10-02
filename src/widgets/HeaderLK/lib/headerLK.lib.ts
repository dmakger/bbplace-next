import { IUserOptionalProps } from "@/entities/Auth/model/auth.model";
import { saveCurrentLKTokenStorage } from "@/entities/User/lib/user-token.lib";
import { ECurrentLK } from "@/entities/User/model/user.model";
import { IImage } from "@/shared/model/image.model";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

/**
 * Функция для переключения ролей в ЛК
 * @param setAuthOptional - actionCreator из RTK
 * @param currentLK - текущий currentLK
 * @param photoId - текущее photoId
 * @param prevPath - prevPath (необязательно)
 * @param pathname - текущий pathname (необязательно)

 */
export const handleSwitchLK = (setAuthOptional: ActionCreatorWithPayload<IUserOptionalProps, "user/setAuthOptional">, currentLK: ECurrentLK | undefined, photoId: IImage | undefined, prevPath?: string, pathname?: string) => {
    const actualCurrentLK = currentLK === ECurrentLK.BUYER ? ECurrentLK.SUPPLIER : ECurrentLK.BUYER;

    setAuthOptional({
        prevPath: pathname ?? prevPath,
        photoId,
        currentLK: actualCurrentLK
    });
    saveCurrentLKTokenStorage(actualCurrentLK);
}