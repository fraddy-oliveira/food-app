import { WeekDay } from "../domain/weekday.enum";

export interface CampaignTimingModel {
  id: string;
  campaign_id: string;
  week_day: WeekDay;
  start_time: string;
  end_time: string;
}
