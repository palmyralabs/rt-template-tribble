import { Outlet } from "react-router-dom";

import Topbar from "./Topbar";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import DynamicMenu from "../../components/Grid/DynamicMenu"
import { Sidebar } from "./Sidebar";
import { Box } from "@mantine/core";

interface MainLayoutInput {
  sideBarWidth?: string,
  appTitle: string
}

const MainLayout = (props: MainLayoutInput) => {
  var sideWidth = props.sideBarWidth;
  if (!sideWidth) {
    sideWidth = '260px';
  }

  const { width } = useWindowSize();
  const [mobileMode, setMobileMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const responsive = width < 900;

  useEffect(() => {
    setMobileMode(responsive);
  }, [responsive, setMobileOpen])

  const display = mobileMode ? "block" : "none";
  return (
    <Box >      
      <Sidebar
        SideMenu={DynamicMenu}
        appTitle={props.appTitle} width={sideWidth} mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen} responsive={responsive} />
      <Box
        component="main"
      >
        {/* <Toolbar /> */}
        <Topbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} display={display} />
        <div style={{ marginTop: "64px" }}>
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

export type { MainLayoutInput };
export { MainLayout };