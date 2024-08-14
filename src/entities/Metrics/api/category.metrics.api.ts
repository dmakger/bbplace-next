import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ICategoriesWithSubcategories, ICategory } from "../model/category.metrics.model"
import { options } from "@/api/interceptors";
import { IOption } from "@/shared/model/option.model";
import { categoryListToOptionList } from "../lib/option.category.metrics.lib";

export const CategoryAPI = createApi({
	reducerPath: 'categoryAPI',
  	baseQuery: fetchBaseQuery({
		baseUrl: options.baseURL + 'metrics/api/Metrics'
	}),
	endpoints: (build) => ({
		getCategories: build.query<ICategory[], void>({
			query: () => ({
				url: `/GetCategories/`,
				method: 'GET',
			})
		}),
		getCategoriesById: build.query<ICategory[], number | undefined>({
			query: (id) => ({
				url: id === undefined ? `/GetCategories/ByParentId/` : `/GetCategories/ByParentId/${id}`,
				method: 'GET',
				responseHandler: async (res) => {
                    const data = await res.json() as ICategory[]
                    return [...data].filter(it => it.id !== 0)
									.sort((a, b) => a.name.localeCompare(b.name))
                }
			})
		}),
		getCategoriesWithSubcategories: build.query<ICategoriesWithSubcategories[] | IOption[], {toOption: boolean}>({
            query: (props) => ({
                url: '/GetCategoriesWithSubcategories',
                responseHandler: async (res) => {
                    const data = await res.json().then(r => {
						const _r = (r as ICategoriesWithSubcategories[]).filter(it => it.name !== 'Нет категории')
						if (!props.toOption) return _r
						return categoryListToOptionList(_r)
					})
                    return [...data].sort((a, b) => a.name.localeCompare(b.name))
                }
            })
        }),
		getCategory: build.mutation<ICategory[], number>({
			query: (categoryId) => ({
				url: `/GetCategory/${categoryId}`,
				method: 'GET',
			})
		}),
		getCategoryById: build.query<ICategory, number>({
			query: (id) => ({
				url: `/GetCategory/${id}`,
				method: 'GET',
			}),
		}),
	})
})
