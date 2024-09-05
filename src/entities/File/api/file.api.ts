import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { options } from "@/api/interceptors";
import { IFile, IFileProps } from "../model/file.model";
import { binaryToURL, getFormatFile } from "../lib/file.lib";
import { IResponseFile } from "../model/props.file.model";

export const FileAPI = createApi({
	reducerPath: 'fileAPI',
  	baseQuery: fetchBaseQuery({
		baseUrl: options.baseURL + 'fileservice/api/FilesS3'
	}),
	endpoints: (build) => ({
		getFile: build.mutation<File | IFile, IFileProps>({
            query: ({fileId, toFile=false, name}) => ({
                url: `/GetFile/${fileId}`,
                method: 'GET',
                responseHandler: async (response) => {
                    const data = await response.arrayBuffer()
                    const blob = new Blob([data])
                    const file = new File([blob], name ?? 'image')
                    if (!toFile) return file
                    const format = getFormatFile(fileId)
                    return {
                        name: file.name,
                        url: binaryToURL(data, format),
                        format: format,
                        file,
                    } as IFile
                },
            })
        }),

        uploadFile: build.mutation<IResponseFile, FormData>({
            query: (file) => ({
                url: '/UploadFile',
                method: 'POST',
                body: file,
                formData: true
            })
        }),
	})
})
