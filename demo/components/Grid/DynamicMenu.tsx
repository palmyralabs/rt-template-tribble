import { PalmyraTreeStore } from "@palmyralabs/palmyra-wire";
import { AsyncTreeMenu } from "@palmyralabs/rt-forms";


const DynamicMenu = ({ sidebarWidth }) => {

    const treeStore = new PalmyraTreeStore("", "flatMenu.json", {});

    return (
        <div style={{ width: "100%" }}>
            <div>
                <AsyncTreeMenu store={treeStore} />
            </div>
        </div>
    )
}

export default DynamicMenu;
