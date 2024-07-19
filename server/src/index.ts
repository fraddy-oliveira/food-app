import type { Request, Response, NextFunction } from "express";
import express from "express";
import CampaignService from "./services/campaign-service";
import createCampaignMiddleware from "./middlewares/create-campaign-middleware";
import AppError from "./utils/AppError";

const app = express();

app.use(express.json());

const port = process.env.PORT || 5001;

const campaignService = new CampaignService();

app.get("/campaign", async (req, res) => {
  try {
    res.json(await campaignService.listCampaign());
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error while fetching campaigns",
      },
    });
  }
});

app.post("/campaign", createCampaignMiddleware, async (req, res) => {
  try {
    res.status(201).json(
      await campaignService.createCampaign({
        ...req.body,
        nextScheduledActivationDate: req.body.nextActivationDate,
      })
    );
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error while creating campaign",
      },
    });
  }
});

app.patch("/campaign/:campaignId", async (req: Request, res: Response) => {
  try {
    if (!req.params?.campaignId) {
      return res.json({ error: { message: "Campaign Id is required" } });
    }

    res.status(204).json(
      await campaignService.updateCampaign(req.params.campaignId, {
        ...req.body,
        nextScheduledActivationDate: req.body?.nextActivationDate,
      })
    );
  } catch (e) {
    const error = e as AppError;

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        error: {
          message: error.message,
        },
      });
    }

    res.status(500).json({
      error: {
        message: "Error while updating campaign",
      },
    });
  }
});

app.get("/health", (req, res) => {
  res.status(200);
  res.send("ok");
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use((_err: Error, _req: Request, res: Response, next: NextFunction) => {
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
