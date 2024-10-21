
import { FC } from "react";
import './Sidebar.css';
import { DynamicMenu } from "../../../src/main";
import { PalmyraTreeStore } from "@palmyralabs/palmyra-wire";

interface ISideMenuInput {
  sidebarWidth: boolean
}

interface SidebarInput {
  appTitle: string,
  width: string,
  mobileOpen?: boolean,
  setMobileOpen?: any,
  responsive?: boolean
}

const Sidebar = (props: SidebarInput) => {
  const treeStore = new PalmyraTreeStore("", "flatMenu.json", {});

  return <div className="sidebar">
    <DynamicMenu treeStore={treeStore} />
  </div>
};

export { Sidebar };

export type { SidebarInput };