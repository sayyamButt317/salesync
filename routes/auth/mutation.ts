import { setAuthTokenProvider } from "@/provider/auth-provide";
import { LoginMutationApi } from "./routes";
import { LoginRequestProps, LoginResponseProps } from "@/types/login.Type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import useAuthStore from "@/store/AuthStore/authStore"; 

export default function LoginMutation() {

    const router = useRouter();
    const { setIsAuthenticated, setUserId, setCompanyName,setTenant_slug,setTenant_id,setRole } = useAuthStore();
    return useMutation({
        mutationFn: (data: LoginRequestProps) => LoginMutationApi(data),
        onSuccess: (data: LoginResponseProps) => {
            setIsAuthenticated(true);
            setAuthTokenProvider(data.access_token, data.role);
            setRole(data.role);
            setUserId(data.user_id);
            setTenant_id(data.tenant_id)
            setCompanyName(data.tenant_name);
            setTenant_slug(data.tenant_slug);

            if (data.role === "admin") {
                router.replace('/client/create-agent');
                toast.success('Login successful to SaleSync', {
                    description: 'You are now logged in',
                });
            } if (data.role === "super-admin") {
                router.replace('/Admin/all-campaign');
                toast.success('Login successful to SaleSync Admin Panel ', {
                    description: 'You are now logged in',
                });
            }
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string, error: { message: string } }>;
            toast.error('Failed to login', {
                description:
                    axiosError.response?.data?.error?.message || 'An error occurred during login.',
            });
        },
    });
}