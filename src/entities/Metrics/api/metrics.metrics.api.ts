import { axiosClassic } from "@/api/interceptors"
import { IMetrics } from "../model/metric.metrics.model"

class MetricsAPI {
    private BASE_URL = '/metrics/api/Metrics'

    async all() {      
      const response = await axiosClassic.get<IMetrics[]>(
        `${this.BASE_URL}/GetMetrics/`
      )
      return response.data
    }
}

export const metricsAPI = new MetricsAPI()
