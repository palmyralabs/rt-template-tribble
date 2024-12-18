import { IconProvider } from '@palmyralabs/rt-forms';
import { TreeQueryStore } from '@palmyralabs/palmyra-wire';
interface IOptions {
    treeStore: TreeQueryStore<any, any>;
    iconProvider?: IconProvider;
}
declare const DynamicMenu: (props: IOptions) => import("react/jsx-runtime").JSX.Element;
export default DynamicMenu;
