import { CampaignType } from "../domain/campaign-type.enum";
import { WeekDay } from "../domain/weekday.enum";
import { CampaignModel, CampaignStatus } from "../models/campaign-model";
import { CampaignTimingModel } from "../models/campaign-timing-model";

type DB = {
  campaigns: CampaignModel[];
  campaigns_timing: CampaignTimingModel[];
};

export const db: DB = {
  campaigns: [
    {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      title: "Order more",
      tagline: "Order and get more",
      campaign_type: CampaignType.COST_PER_ORDER,
      start_date: new Date("2024-07-20"),
      end_date: new Date("2024-07-24"),
      created_date: new Date("2024-07-18"),
      status: CampaignStatus.Scheduled,
      deleted_date: null,
      updated_date: null,
      next_scheduled_activation_date: null,
    },
  ],
  campaigns_timing: [
    {
      id: "da760c05-2e94-4dac-892c-b7d9ee0e9a91",
      campaign_id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      week_day: WeekDay.Monday,
      start_time: "12:00:00",
      end_time: "14:00:00",
    },
    {
      id: "5e5a1f40-5f31-44eb-8dee-b8fdf524cf4d",
      campaign_id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      week_day: WeekDay.Monday,
      start_time: "20:00:00",
      end_time: "22:00:00",
    },
    {
      id: "7073853c-032b-4c5e-b85e-3104cdddb14b",
      campaign_id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      week_day: WeekDay.Saturday,
      start_time: "15:00:00",
      end_time: "17:00:00",
    },
  ],
};
