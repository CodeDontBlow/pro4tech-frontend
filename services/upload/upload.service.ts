import { api } from "../api";

export type UploadedAttachment = {
  url: string;
  key: string;
  originalName: string;
  mimeType: string;
  size: number;
};

export async function uploadChatAttachments(
  ticketId: string,
  files: File[],
): Promise<UploadedAttachment[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await api.post(`/chat/${ticketId}/attachments`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.attachments ?? [];
}

export async function uploadUserAvatar(userId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/user/${userId}/avatar`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}

export async function uploadCompanyLogo(companyId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/company/${companyId}/logo`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}
