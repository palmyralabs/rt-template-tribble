import { FC, RefObject } from 'react';
import { IOptions } from '../Types';
import { ISaveForm } from '@palmyralabs/rt-forms';
interface IFormInput {
    options: IOptions;
    initialData?: any;
    FORMLET: FC;
    handleKeyPress: (event: any) => void;
    setValid: (s: any) => void;
    formRef: RefObject<ISaveForm>;
    customDataSection?: any;
}
declare function NewForm(props: IFormInput): import("react/jsx-runtime").JSX.Element;
export { NewForm };
