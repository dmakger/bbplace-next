import { axiosClassic } from "@/api/interceptors"
import { ICategory } from "../model/category.metrics.model"

class CategoryAPI {
    private BASE_URL = '/metrics/api/Metrics'

    async all() {      
      const response = await axiosClassic.get<ICategory[]>(
        `${this.BASE_URL}/GetCategories/`
      )
      return response.data
    }
}

export const categoryAPI = new CategoryAPI()
