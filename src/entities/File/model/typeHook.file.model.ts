import { FileAPI } from "../api/file.api";

export type TUploadFile = ReturnType<typeof FileAPI.useUploadFileMutation>[0]
export type TGetFile = ReturnType<typeof FileAPI.useGetFileMutation>[0]