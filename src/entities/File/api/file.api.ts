import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { options } from "@/api/interceptors";
import { IFile, IFileProps } from "../model/file.model";
import { binaryToURL } from "../lib/file.lib";

export const FileAPI = createApi({
	reducerPath: 'fileAPI',
  	baseQuery: fetchBaseQuery({
		baseUrl: options.baseURL + 'fileservice/api/FilesS3'
	}),
	endpoints: (build) => ({
		getFile: build.mutation<File, IFileProps>({
            query: ({fileId, toFile=false}) => ({
                url: `/GetFile/${fileId}`,
                method: 'GET',
                responseHandler: async (response) => {
                    const data = await response.arrayBuffer()
                    const blob = new Blob([data])
                    const file = new File([blob], 'image')
                    if (!toFile) return file
                    return {
                        name: file.name,
                        url: binaryToURL(data, file.name.split('.')[1])
                    } as IFile
                },
            })
        }),
	})
})
