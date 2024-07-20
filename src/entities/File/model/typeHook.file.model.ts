import { FileAPI } from "../api/file.api";

export type TUploadFile = ReturnType<typeof FileAPI.useUploadFileMutation>[0]