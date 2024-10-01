import { ECurrentLK } from "@/entities/User/model/user.model";

export interface IProfileMain{
    className?: string,
    currentLK: ECurrentLK,
    fullName: string,
    email: string,
    phoneNumber?: string
}