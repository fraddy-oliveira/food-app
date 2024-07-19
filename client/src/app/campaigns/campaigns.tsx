"use client";

import { useEffect, useState } from "react";
import { Campaign } from "@app/types/campaign";
import CampaignsCard from "@app/components/CampaignsCard/CampaignsCard";
import classes from "./campaigns.module.css";

type Props = React.PropsWithChildren<{}>;

const getCampaigns = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL as string}/campaign`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default function Campaigns({}: Props) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    getCampaigns().then((c) => setCampaigns(c));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.pageHeader}>
        <h2>List of Campaigns</h2>
        <button>Add campaign</button>
      </div>
      <div className={classes.campaignsCardList}>
        {campaigns.map((c) => (
          <CampaignsCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
