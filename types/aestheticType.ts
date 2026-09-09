export interface AgenticMessageTypeRequest {
  message: string;
  phone_number: string;
  thread_id: string;
}

export type AestheticTypeRequest = AgenticMessageTypeRequest & {
  agent_type: "aesthetic";
};

export type GoogleReviewTypeRequest = AgenticMessageTypeRequest & {
  agent_type: "google_review";
};

export type RealestateTypeRequest = AgenticMessageTypeRequest & {
  agent_type: "realestate";
};
