export const AuthENDPOINT = {
    SIGN_UP: `/auth/company/register`,
    LOGIN: `/auth/company/login`,
    VERIFY_EMAIL: `/auth/verify-email`,
    UPLOAD_USER_LOGO: (user_id: string) => `/auth/users/${user_id}/upload-logo`,


    GOOGLE_BUSINESS_CONNECT: `/google/business/connect`,
    GOOGLE_OAUTH_CALLBACK: `/google/business/callback`,
    GOOGLE_BUSINESS_STATUS: `/google/business/status`,
    GOOGLE_BUSINESS_LIST: `/google/business/list`,
    GOOGLE_BUSINESS_LOCATIONS: `/google/business/locations`,
  };