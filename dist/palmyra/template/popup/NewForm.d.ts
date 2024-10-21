import { FC, MutableRefObject } from 'react';
import { IOptions } from '../Types';
import { ISaveForm } from '@palmyralabs/rt-forms';
interface IFormInput {
    options: IOptions;
    initialData?: any;
    FORMLET: FC;
    handleKeyPress: (event: any) => void;
    setValid: (s: any) => void;
    formRef: MutableRefObject<ISaveForm>;
}
declare function NewForm(props: IFormInput): import("react/jsx-runtime").JSX.Element;
export { NewForm };
