import { CampaignType } from "../domain/campaign-type.enum";

export enum CampaignStatus {
  Draft = "Draft", // The campaign is still in the planning stages and not yet ready to be launched.
  Scheduled = "Scheduled", // The campaign has been planned and is set to start at a future date.
  Active = "Active", // The campaign is currently running and ongoing.
  Paused = "Paused", // The campaign has been temporarily halted but may resume later.
  Completed = "Completed", // The campaign has finished and all planned activities have been executed.
  Cancelled = "Cancelled", // The campaign has been terminated before its intended completion.
  Archived = "Archived", // The campaign data and details are stored for historical purposes but are no longer active or relevant.
}

export interface CampaignModel {
  id: string;
  title: string;
  tagline: string;
  status: CampaignStatus;
  campaign_type: CampaignType;
  start_date: Date;
  end_date: Date;
  next_scheduled_activation_date: Date | null;
  created_date: Date;
  updated_date: Date | null;
  deleted_date: Date | null;
}
