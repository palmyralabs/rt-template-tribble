
import { AsyncTreeMenu } from "@palmyralabs/rt-forms";

import './DynamicMenu.css'

const DynamicMenu = ({ treeStore }) => {

    return (
        <div style={{ width: "100%" }}>
            <div>
                <AsyncTreeMenu store={treeStore} />
            </div>
        </div>
    )
}

export default DynamicMenu;
