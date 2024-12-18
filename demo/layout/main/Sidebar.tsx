
import { FC } from "react";
import './Sidebar.css';
import { DynamicMenu } from "../../../src/main";
import { PalmyraTreeStore } from "@palmyralabs/palmyra-wire";
import { IconProvider } from '@palmyralabs/rt-forms';
import { SimpleIconProvider } from "../../components/SimpleIconProvider";

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
    <div className="sidebar-header">
      Sidebar Header
    </div>
    <DynamicMenu treeStore={treeStore} iconProvider={SimpleIconProvider} />
  </div>
};

export { Sidebar };

export type { SidebarInput };