import { ITender } from "@/entities/Tender/model/tender.model";

export const tenderToTableLK = (tenders: ITender[]) => {
    return tenders.map(tender => {
        return {
            name: tender.name,
            category: tender.category,
            files: tender.attachments.length,
        }
    })
}