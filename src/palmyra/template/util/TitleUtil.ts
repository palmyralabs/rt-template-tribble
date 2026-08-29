import { ITitle } from "../Types"

type Keys = 'grid' | 'edit' | 'new' | 'view';

const getTitle = (o?: ITitle, key?: Keys): string | undefined => {
    if (!o) {
        return undefined;
    }
    if (typeof o == 'string') {
        return o;
    }
    if (key) {
        return o[key];
    }
    return o.grid || o.view || o.edit || o.new;
}

export { getTitle }
export type { Keys as ITitleKey }
