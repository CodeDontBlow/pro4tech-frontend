import { api } from "../api";
import { ISupportGroupCreateRequest, ISupportGroupResponse } from "./support-group.interface";

export async function getAll(
    page = 1,
    limit = 10,
):Promise<ISupportGroupResponse> {
    const response = await api.get("/support-groups", {
        params: {
            page,
            limit
        }
    });
    return response.data;
}

export async function create(data: ISupportGroupCreateRequest) {
    const response = await api.post("/support-groups", data);
    return response.data;
}

export async function remove(id: string) {
    const response = await api.delete(`/support-groups/${id}`); 
    return response.data;
}
