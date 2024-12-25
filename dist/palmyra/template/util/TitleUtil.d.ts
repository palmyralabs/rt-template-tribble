import { ITitle } from '../Types';
type Keys = 'grid' | 'edit' | 'new' | 'view';
declare const getTitle: (o: ITitle, key?: Keys) => string;
export { getTitle };
