"use client";

import { useEffect, useState } from "react";
import { Campaign } from "@app/types/campaign";
import CampaignsCard from "@app/components/CampaignsCard/CampaignsCard";
import classes from "./campaigns.module.css";
import AddCampaign from "@app/components/AddCampaign/AddCampaign";

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
  const [showAddCampaignForm, setShowAddCampaignForm] = useState(false);

  useEffect(() => {
    getCampaigns().then((c) => setCampaigns(c));
  }, []);

  const handlerShowAddCampaign = () => setShowAddCampaignForm(true);

  const listCampaign = (
    <>
      <div className={classes.pageHeader}>
        <h2>List of Campaigns</h2>
        <button onClick={handlerShowAddCampaign}>Add campaign</button>
      </div>
      <div className={classes.campaignsCardList}>
        {campaigns.map((c) => (
          <CampaignsCard key={c.id} {...c} />
        ))}
      </div>
    </>
  );

  const addCampaign = (
    <>
      <div className={classes.pageHeader}>
        <h2>Add Campaign</h2>
      </div>
      <div>
        <AddCampaign />
      </div>
    </>
  );

  return (
    <div className={classes.container}>
      {showAddCampaignForm ? addCampaign : listCampaign}
    </div>
  );
}
