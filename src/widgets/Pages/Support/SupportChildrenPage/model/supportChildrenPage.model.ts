import { ISupportRequestMessage } from "@/entities/Support/model/support.model";

export interface ISupportChildrenPageInitialErrors extends ISupportRequestMessage{}

export interface ISupportChildrenPageFormValues{
    [key: string]: string | [] | undefined;
    name: string
    companyName: string
    contact: string
    theme: string
    message: string
    Files?: []
}