"use client";

import { useState } from "react";
import Header from "../Header/Header";
import SideDrawer from "../Header/SideDrawer/SideDrawer";

type Props = React.PropsWithChildren<{}>;

export default function Layout({ children }: Props) {
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  const handlerCloseSideDrawer = () => setOpenSideDrawer(false);

  const handlerToggleSideDrawer = () => setOpenSideDrawer((d) => !d);

  return (
    <>
      <Header handlerToggleSideDrawer={handlerToggleSideDrawer} />
      <SideDrawer show={openSideDrawer} closeHandler={handlerCloseSideDrawer} />
      {children}
    </>
  );
}
