import { FC, MutableRefObject } from 'react';
import { IOptions } from '../Types';
import { ISaveForm } from '@palmyralabs/rt-forms';
import { ErrorHandler } from '@palmyralabs/palmyra-wire';
interface IFormInput {
    options: IOptions;
    id: string;
    FORMLET: FC;
    onQueryFailure: ErrorHandler;
    handleKeyPress: (event: any) => void;
    setValid: (s: any) => void;
    formRef: MutableRefObject<ISaveForm>;
}
declare function EditForm(props: IFormInput): import("react/jsx-runtime").JSX.Element;
export { EditForm };
