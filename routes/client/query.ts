import { useQuery } from "@tanstack/react-query";
import { CompanyBookingByIdApi, ConversationByThreadId, ConversationList } from "./routes";


export const useConversationList = () => {
    return useQuery({
        queryKey: ['conversationList'],
        queryFn: ConversationList,
    });
}

export const useConversationByThreadId = (thread_id: string) => {
    return useQuery({
        queryKey: ['conversationByThreadId', thread_id],
        queryFn: () => ConversationByThreadId(thread_id),
        enabled: Boolean(thread_id),
    });
}

export const useCompanyBookingByIdQuery = (company_id: string) => {
    return useQuery({
        queryKey: ['companyBookingById', company_id],
        queryFn: () => CompanyBookingByIdApi(company_id),
        enabled: Boolean(company_id),
    });
}