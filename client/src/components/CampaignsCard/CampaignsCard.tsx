"use client";

import { Campaign } from "@app/types/campaign";
import classes from "./CampaignsCard.module.css";
import { useState } from "react";
import { CAMPAIGN_TYPES } from "@app/constants";

interface Props extends Campaign {}

export default function CampaignsCard({
  title,
  tagline,
  startDate,
  endDate,
  campaignType,
  nextScheduledActivationDate,
  timings,
}: Props) {
  const [] = useState(0);

  const formatTime = (time: string) => time.split(":").slice(0, 2).join(":");

  return (
    <div className={classes.container}>
      <div>Title: {title}</div>
      <div>Tagline: {tagline}</div>
      <div>Campaign Type: {CAMPAIGN_TYPES[campaignType]}</div>
      <div>Start Date: {new Date(startDate).toLocaleDateString()}</div>
      <div>End Date: {new Date(endDate).toLocaleDateString()}</div>
      {nextScheduledActivationDate && (
        <div>
          Next scheduled activation:{" "}
          {new Date(nextScheduledActivationDate).toLocaleDateString()}
        </div>
      )}
      {timings.length && <div>Weekly Schedule</div>}
      {timings.map((t) => (
        <div key={t.weekday + t.startTime + t.endTime}>
          {t.weekday}: From {formatTime(t.startTime)} to {formatTime(t.endTime)}
        </div>
      ))}
    </div>
  );
}
