import { Outlet } from "react-router-dom";

import Topbar from "./Topbar";
import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import DynamicMenu from "../../../src/palmyra/template/menu/DynamicMenu"
import { Sidebar } from "./Sidebar";
import { Box } from "@mantine/core";
import { PalmyraTreeStore } from "@palmyralabs/palmyra-wire";

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
      <div style={{ display: 'flex' }}>
        <div>
          <Sidebar            
            appTitle={props.appTitle} width={sideWidth} mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen} responsive={responsive} />
        </div>
        <div style={{width:'calc(100% - 260px)'}}>
          <Topbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} display={display} />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <Box
        component="main"
      >

      </Box>
    </Box>
  );
};

export type { MainLayoutInput };
export { MainLayout };