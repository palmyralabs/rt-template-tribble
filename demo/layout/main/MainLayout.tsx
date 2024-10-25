import { Outlet } from "react-router-dom";

import Topbar from "./Topbar";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { Sidebar } from "./Sidebar";
import { Box, ScrollArea } from "@mantine/core";

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
    <Box style={{ height: '100vh', display: 'flex' }}>
      <Box
        style={{
          width: sideWidth,
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          display: "flex"
        }}
      >
        <div className="sidebar-container">
          <Sidebar
            appTitle={props.appTitle} width={sideWidth} mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen} responsive={responsive} />
        </div>
      </Box>
      <Box
        style={{
          marginLeft: sideWidth,
          width: `calc(100% - ${sideWidth})`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: sideWidth,
            right: 0
          }}
        >
          <Topbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} display={display} />
        </Box>
        <ScrollArea
          style={{
            marginTop: "50px",
            height: "calc(100vh - 60px)",
          }}
        >
          <Outlet />
        </ScrollArea>
      </Box>
    </Box>
  );
};

export type { MainLayoutInput };
export { MainLayout };