import React from "react";
import Image from "next/image";
import logoImage from "@app/assets/images/burger-logo.png";
import classes from "./Brand.module.css";

type Props = React.PropsWithChildren<{}>;

export default function Brand({}: Props) {
  return <div className={classes.BrandLogo}>Food App</div>;
}
