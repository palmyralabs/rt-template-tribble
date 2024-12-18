
import { AsyncTreeMenu, IconProvider, SimpleIconProvider } from "@palmyralabs/rt-forms";
import './DynamicMenu.css'
import { TreeQueryStore } from "@palmyralabs/palmyra-wire";

interface IOptions {
    treeStore: TreeQueryStore<any, any>
    iconProvider?: IconProvider
}

const DynamicMenu = (props: IOptions) => {
    const { treeStore, iconProvider } = props;
    const IconProvider = iconProvider || SimpleIconProvider;

    return (
        <div style={{ width: "100%" }}>
            <div>
                <AsyncTreeMenu store={treeStore} iconProvider={IconProvider} />
            </div>
        </div>
    )
}

export default DynamicMenu;
