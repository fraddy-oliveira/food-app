import { CampaignType } from "../domain/campaign-type.enum";
import { WeekDay } from "../domain/weekday.enum";

export type TimingDto = {
  weekday: WeekDay;
  startTime: string;
  endTime: string;
}[];

export default interface UpdateCampaignDto {
  title?: string;
  tagline?: string;
  campaignType?: CampaignType;
  startDate?: Date;
  endDate?: Date;
  nextScheduledActivationDate?: Date;
  timing?: TimingDto;
}
