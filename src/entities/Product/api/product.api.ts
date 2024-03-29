import { axiosClassic } from "@/api/interceptors"
import { IArgsRequest } from "@/api/model/request.model.api"
import { getURL } from "@/api/request"
import { IProductAPI } from "../model/product.model";
import { PRODUCT_ARGS_REQUEST } from "../data/product.data";

class ProductAPI {
    private BASE_URL = '/item/api/Items'

    getArgs(args?: IArgsRequest) {
      return args ?? PRODUCT_ARGS_REQUEST
    }

    async all(args?: IArgsRequest) {            
      const response = await axiosClassic.get<IProductAPI[]>(
        getURL(`${this.BASE_URL}/GetItems/Filter/`, this.getArgs(args))
      )
      return response.data
    }
}

export const productAPI = new ProductAPI()