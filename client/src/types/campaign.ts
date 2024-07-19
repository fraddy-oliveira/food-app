import { CampaignType } from "./campaign-type.enum";
import { WeekDay } from "./weekday.enum";

export interface Campaign {
  id?: string;
  title: string;
  tagline: string;
  campaignType: CampaignType;
  startDate: Date;
  endDate: Date;
  nextScheduledActivationDate: Date | null;
  timings: {
    weekday: WeekDay;
    startTime: string;
    endTime: string;
  }[];
}
