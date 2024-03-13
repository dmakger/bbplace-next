import { axiosClassic } from "@/api/interceptors"
import { IArgsRequest } from "@/api/model/request.model.api"
import { getURL } from "@/api/request"

class ProductAPI {
    private BASE_URL = '/item/api/Items'

    async all(args?: IArgsRequest) {      
      console.log(getURL(`${this.BASE_URL}/GetItems/Filter/`, args));
      
      const response = await axiosClassic.get<any[]>(
        getURL(`${this.BASE_URL}/GetItems/Filter/`, args)
      )
      return response.data
    }
}

export const productAPI = new ProductAPI()