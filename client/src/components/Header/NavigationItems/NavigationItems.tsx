import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

type Props = React.PropsWithChildren<{
  isAuthenticated: boolean;
}>;

export default function NavigationItems(props: Props) {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Home</NavigationItem>
      <NavigationItem link="/campaigns">Campaigns</NavigationItem>
    </ul>
  );
}
