import { Campaign } from "../domain/entities/campaign";
import CreateCampaignDto from "../dto/create-campaign.dto";
import CampaignRepository from "../repositories/campaign-repository";

export default class CampaignService {
  private campaignRepo: CampaignRepository = new CampaignRepository();

  async createCampaign(
    createCampaignDto: CreateCampaignDto
  ): Promise<{ id: string }> {
    const campaign: Campaign = {
      title: createCampaignDto.title,
      tagline: createCampaignDto.tagline,
      startDate: createCampaignDto.startDate,
      endDate: createCampaignDto.endDate,
      campaignType: createCampaignDto.campaignType,
      nextScheduledActivationDate:
        createCampaignDto.nextScheduledActivationDate || null,
      timings: createCampaignDto.timing,
    };

    return this.campaignRepo.createCampaign(campaign);
  }

  async listCampaign(): Promise<Campaign[]> {
    return this.campaignRepo.listCampaign();
  }

  async updateCampaign(
    campaignId: string,
    campaign: Partial<Campaign>
  ): Promise<void> {
    return this.campaignRepo.updateCampaign(campaignId, campaign);
  }
}
