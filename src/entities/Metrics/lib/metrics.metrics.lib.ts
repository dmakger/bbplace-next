import { EParameters, PARAMETERS_TO_DATA } from "../data/metrics.metrics.data"
import { IMetric } from "../model/metric.metrics.model"
import { IWholesale } from "../model/wholesale.metrics.model";

export const getDiapason = (wholesales: IWholesale[]) => {
    const result: Record<EParameters, number>[] = []
    wholesales.map(wholesale => {

    })

}
// export const getParameterByName = (name: string): EParameters | undefined => {
export const getParameterByName = (name: string) => {
    for (const param in PARAMETERS_TO_DATA) {
        // if (Object.keys(PARAMETERS_TO_DATA[]).includes(name)) {
        //     return parseInt(param) as EParameters;
        // }
    }
}
