import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface AuthStore {
  isAuthenticated: boolean;
  user_id: string;
  company_name: string;
  company_user_id: string;
  role:string
  tenant_id:string
  tenant_slug:string


  setUserId: (user_id: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setCompanyName: (company_name: string) => void;
  setCompanyUserId: (company_user_id: string) => void;
  setRole: (role: string) => void;
  setTenant_id:(tenant_id:string) => void;
  setTenant_slug:(tenant_slug:string) => void;


  // access_token: string;
  // setAccessToken: (access_token: string) => void;
  // refresh_token: string;
  // setRefreshToken: (refresh_token: string) => void;
  clearAuth: () => void;
  getField: (field: keyof AuthStore) => AuthStore[keyof AuthStore];
  setField: (field: keyof AuthStore, value: AuthStore[keyof AuthStore]) => void;
}

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        user_id: '',
        company_name: '',
        company_user_id: '',
        role:'',
        tenant_id:'',
        tenant_slug:'',


        setUserId: (user_id: string) => set({ user_id }),
        setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
        setCompanyName: (company_name: string) => set({ company_name }),
        setCompanyUserId: (company_user_id: string) => set({ company_user_id }),
        setRole: (role:string) => set({role}),
        setTenant_id:(tenant_id:string) => set({tenant_id}),
        setTenant_slug:(tenant_slug:string) => set({tenant_slug}),

        // refresh_token: "",
        // setRefreshToken: (refresh_token: string) => set({ refresh_token }),
        getField: (field: keyof AuthStore) => get()[field],
        setField: (field: keyof AuthStore, value: AuthStore[keyof AuthStore]) =>
          set({ [field]: value }),
        clearAuth: () =>
          set({
            isAuthenticated: false,
            user_id: '',
            company_name: '',
            company_user_id: '',
            role:'',
            tenant_id:'',
            tenant_slug:'',    
          }),
      }),

      {
        name: 'AuthStorage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'AuthStore' },
  ),
);

export default useAuthStore;
