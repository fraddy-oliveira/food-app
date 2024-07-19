import type { Request, Response, NextFunction } from "express";
import { CampaignType } from "../domain/campaign-type.enum";
import { WeekDay } from "../domain/weekday.enum";
import { z, ZodError } from "zod";

const createCampaignValidationSchema = z.object({
  title: z.string({ message: `Title is required` }),
  tagline: z.string({ message: `Tagline is required` }),
  campaignType: z.nativeEnum(CampaignType, {
    message: `Campaign type should be either ${Object.values(CampaignType).join(
      ", "
    )}`,
  }),
  startDate: z
    .string({ message: "startDate is required" })
    .date("invalid. Date format should be YYYY-mm-dd"),
  endDate: z
    .string({ message: "endDate is required" })
    .date("invalid. Date format should be YYYY-mm-dd"),
  nextActivationDate: z
    .string()
    .date("invalid. Date format should be YYYY-mm-dd")
    .optional(),
  timing: z.array(
    z.object({
      weekday: z.nativeEnum(WeekDay, {
        message: `weekday should be either ${Object.values(WeekDay).join(
          ", "
        )}`,
      }),
      startTime: z
        .string()
        .time({ message: "Schedule time format should be HH:MM:SS" }),
      endTime: z.string().time(),
    })
  ),
});

export default function createCampaignMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    createCampaignValidationSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue: any) => ({
        message: `${issue.path.join(".")} is ${issue.message}`,
      }));
      res.status(400).json({ error: "Invalid data", details: errorMessages });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
