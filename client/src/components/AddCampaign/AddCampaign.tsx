import { CAMPAIGN_TYPES } from "@app/constants";
import { CampaignType } from "@app/types/campaign-type.enum";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { WeekDay } from "@app/types/weekday.enum";
import classes from "./AddCampaign.module.css";
import InputError from "../UI/InputError/InputError";

const schema = z.object({
  title: z
    .string({ message: `Title is required` })
    .min(1, { message: `Title is required` }),
  tagline: z
    .string({ message: `Tagline is required` })
    .min(1, { message: `Title is required` }),
  campaignType: z.nativeEnum(CampaignType, {
    message: `Campaign type should be either ${Object.values(CampaignType).join(
      ", "
    )}`,
  }),
  startDate: z
    .string({ message: "startDate is required" })
    .date("Date format should be YYYY-mm-dd"),
  endDate: z
    .string({ message: "endDate is required" })
    .date("Date format should be YYYY-mm-dd"),
  nextActivationDate: z
    .string()
    .date("Date format should be YYYY-mm-dd")
    .optional()
    .or(z.literal("")),
});

type Schema = z.infer<typeof schema>;

const addCampaign = async (campaign: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL as string}/campaign`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaign),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to save campaign");
  }

  return res.json();
};

export default function AddCampaign() {
  const [weeklySchedule, setWeeklySchedule] = useState<
    Record<WeekDay, { startTime: string; endTime: string }>
  >({
    [WeekDay.Monday]: { startTime: "", endTime: "" },
    [WeekDay.Tuesday]: { startTime: "", endTime: "" },
    [WeekDay.Wednesday]: { startTime: "", endTime: "" },
    [WeekDay.Thursday]: { startTime: "", endTime: "" },
    [WeekDay.Friday]: { startTime: "", endTime: "" },
    [WeekDay.Saturday]: { startTime: "", endTime: "" },
    [WeekDay.Sunday]: { startTime: "", endTime: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Schema) => {
    const campaign = {
      ...data,
      nextActivationDate: data.nextActivationDate || undefined,
      timing: Object.keys(weeklySchedule)
        .filter(
          (week) =>
            weeklySchedule[week as WeekDay].startTime.trim() !== "" &&
            weeklySchedule[week as WeekDay].endTime.trim() !== ""
        )
        .map((week) => ({
          weekday: week,
          startTime: `${weeklySchedule[week as WeekDay].startTime}:00`,
          endTime: `${weeklySchedule[week as WeekDay].endTime}:00`,
        })),
    };

    // validate weekly timings

    await addCampaign(campaign);

    console.log(campaign);

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Campaign Type</label>
        <div>
          <select {...register("campaignType")}>
            {Object.values(CampaignType).map((t) => (
              <option key={t} value={t}>
                {CAMPAIGN_TYPES[t]}
              </option>
            ))}
          </select>
        </div>
        <InputError>{errors.campaignType?.message}</InputError>
      </div>

      <div className={classes.spacer}></div>

      <div className={classes.twoInputFieldsContainer}>
        <div>
          <label>Title</label>
          <div>
            <input {...register("title")} />
            <InputError>{errors.title?.message}</InputError>
          </div>
        </div>
        <div>
          <label>Tagline</label>
          <div>
            <input {...register("tagline")} />
            <InputError>{errors.tagline?.message}</InputError>
          </div>
        </div>
      </div>

      <div className={classes.spacer}></div>

      <div className={classes.twoInputFieldsContainer}>
        <div>
          <label>Start Date</label>
          <div>
            <input {...register("startDate")} />
          </div>
          <InputError>{errors.startDate?.message}</InputError>
        </div>
        <div>
          <label>End Date</label>
          <div>
            <input {...register("endDate")} />
          </div>
          <InputError>{errors.endDate?.message}</InputError>
        </div>
      </div>

      <div className={classes.spacer}></div>

      <div className={classes.weeklyScheduleHeader}>
        <label>
          Weekly Timing{" "}
          <span style={{ color: "red" }}>
            (Note: Enter time in HH:MM format)
          </span>
        </label>
      </div>

      <div className={classes.spacer}></div>

      <div>
        {Object.values(WeekDay).map((week) => {
          return (
            <div key={week}>
              <label>{week}</label>
              <input
                placeholder="Start Time"
                onChange={(e) => {
                  setWeeklySchedule((w) => {
                    return {
                      ...w,
                      [week]: {
                        ...w[week],
                        startTime: e.target.value,
                      },
                    };
                  });
                }}
              />
              <input
                placeholder="End Time"
                onChange={(e) => {
                  setWeeklySchedule((w) => {
                    return {
                      ...w,
                      [week]: {
                        ...w[week],
                        endTime: e.target.value,
                      },
                    };
                  });
                }}
              />
            </div>
          );
        })}
      </div>

      <div className={classes.spacer}></div>

      <div>
        <label>Next scheduled activation</label>
        <div>
          <input {...register("nextActivationDate", { required: false })} />
        </div>
        <InputError>{errors.nextActivationDate?.message}</InputError>
      </div>

      <div className={classes.spacer}></div>

      <div>
        <input type="submit" value={"Create Campaign"} />
      </div>
    </form>
  );
}
