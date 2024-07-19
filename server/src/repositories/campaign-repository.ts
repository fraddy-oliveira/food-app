import { v4 as uuidv4 } from "uuid";
import { db as dbData } from "../data/db";
import { Campaign } from "../domain/entities/campaign";
import { CampaignModel, CampaignStatus } from "../models/campaign-model";
import { CampaignTimingModel } from "../models/campaign-timing-model";
import AppError from "../utils/AppError";

export default class CampaignRepository {
  private readonly dbClient = dbData;

  async createCampaign(campaign: Campaign): Promise<{ id: string }> {
    const campaignId = uuidv4();

    this.dbClient.campaigns.push({
      id: campaignId,
      title: campaign.title,
      tagline: campaign.tagline,
      status: CampaignStatus.Scheduled,
      campaign_type: campaign.campaignType,
      start_date: campaign.startDate,
      end_date: campaign.endDate,
      next_scheduled_activation_date: campaign.nextScheduledActivationDate,
      created_date: new Date(),
      updated_date: null,
      deleted_date: null,
    });

    for (const time of campaign.timings) {
      this.dbClient.campaigns_timing.push({
        id: uuidv4(),
        campaign_id: campaignId,
        week_day: time.weekday,
        start_time: time.startTime,
        end_time: time.endTime,
      });
    }

    return { id: campaignId };
  }

  async listCampaign(): Promise<Campaign[]> {
    const campaigns = [...this.dbClient.campaigns];

    return campaigns.map((c) => ({
      id: c.id,
      title: c.title,
      tagline: c.tagline,
      campaignType: c.campaign_type,
      startDate: c.start_date,
      endDate: c.end_date,
      nextScheduledActivationDate: c.next_scheduled_activation_date,
      timings: this.dbClient.campaigns_timing
        .filter((t) => t.campaign_id === c.id)
        .map((t) => ({
          weekday: t.week_day,
          startTime: t.start_time,
          endTime: t.end_time,
        })),
    }));
  }

  async updateCampaign(
    campaignId: string,
    campaign: Partial<Campaign>
  ): Promise<void> {
    let campaignIndex = this.dbClient.campaigns.findIndex(
      (c) => c.id === campaignId
    );

    if (campaignIndex === -1) {
      throw new AppError("Campaign not found", 404);
    }

    const updateModel: Partial<CampaignModel> = {};

    if (campaign.title) {
      updateModel.title = campaign.title;
    }

    if (campaign.tagline) {
      updateModel.tagline = campaign.tagline;
    }

    if (campaign.startDate) {
      updateModel.start_date = campaign.startDate;
    }

    if (campaign.endDate) {
      updateModel.end_date = campaign.endDate;
    }

    if (campaign.campaignType) {
      updateModel.campaign_type = campaign.campaignType;
    }

    if (campaign.nextScheduledActivationDate) {
      updateModel.next_scheduled_activation_date =
        campaign.nextScheduledActivationDate;
    }

    updateModel.updated_date = new Date();

    this.dbClient.campaigns[campaignIndex] = {
      ...this.dbClient.campaigns[campaignIndex],
      ...updateModel,
    };

    if (campaign.timings) {
      this.dbClient.campaigns_timing = this.dbClient.campaigns_timing.filter(
        (t) => t.campaign_id !== campaignId
      );

      for (const time of campaign.timings) {
        this.dbClient.campaigns_timing.push({
          id: uuidv4(),
          campaign_id: campaignId,
          week_day: time.weekday,
          start_time: time.startTime,
          end_time: time.endTime,
        });
      }
    }
  }
}
