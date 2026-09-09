export const UserEndpoint = {

CONVERSATIONS: "/company/conversations",
CONVERSATIONS_BY_THREAD_ID: (thread_id: string) => `/company/conversations/${thread_id}`,

	
DELETE_CONVERSATION: (thread_id: string) => `/company/conversations/${thread_id}`,
DELETEMESSAGES_BY_MESSAGE_ID: (message_id: string) => `/company/messages/${message_id}`,

COMPANY_BOOKING_BY_ID:(company_id: string) => `/company/bookings/${company_id}`,

WS_MESSAGES_NOTIFICATIONS: "/ws/messages",

AGENT:{
SKINCLINIC_AGENT: `/agents/aesthetic-agent`,
GOOGLEREVIEW_AGENT: `/agents/google-review-agent`,
REALESTATE_AGENT: `/agents/realestate-agent`,
},
}