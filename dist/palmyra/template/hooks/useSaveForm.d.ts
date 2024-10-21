import { MutableRefObject } from 'react';
import { IFormInput } from '../Types';
import { ISaveForm } from '@palmyralabs/rt-forms';
declare const useSaveForm: (props: IFormInput, fRef?: MutableRefObject<ISaveForm>) => {
    doCancel: () => void;
    doSaveNew: () => void;
    doSaveClose: () => void;
    handleKeyPress: (event: any) => void;
    setValid: import('react').Dispatch<import('react').SetStateAction<boolean>>;
    isValid: boolean;
    formRef: MutableRefObject<ISaveForm>;
};
export { useSaveForm };
