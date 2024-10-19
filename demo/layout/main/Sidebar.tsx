
import { FC } from "react";
import './Sidebar.css';

interface ISideMenuInput {
  sidebarWidth: boolean
}

interface SidebarInput {
  appTitle: string,
  width: string,
  mobileOpen?: boolean,
  setMobileOpen?: any,
  responsive?: boolean,
  SideMenu: FC<ISideMenuInput>
}

const Sidebar = (props: SidebarInput) => {
  return <div>side bar</div>
};


export { Sidebar };

export type { SidebarInput };